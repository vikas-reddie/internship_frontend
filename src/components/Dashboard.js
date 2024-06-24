import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const initialMonthlyIncome = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0
};
const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

const Dashboard = () => {
  const token = useSelector(state => state.auth.token);
  const [data, setData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [orders, setOrders] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(initialMonthlyIncome);
  const [price, setPrice] = useState({});
  const navigate = useNavigate();

  const calculateIncome = useCallback((order) => {
    const items = [
      { description: '1 Liter', quantity: parseInt(order.quantity1ltr) || 0, price: price.price1ltr || 0 },
      { description: '200 ml', quantity: parseInt(order.quantity200ml) || 0, price: price.price200ml || 0 },
      { description: '20 Liter', quantity: parseInt(order.quantity20ltr) || 0, price: price.price20ltr || 0 },
      { description: '2 Liter', quantity: parseInt(order.quantity2ltr) || 0, price: price.price2ltr || 0 },
      { description: '500 ml', quantity: parseInt(order.quantity500ml) || 0, price: price.price500ml || 0 },
      { description: '5 Liter', quantity: parseInt(order.quantity5ltr) || 0, price: price.price5ltr || 0 }
    ];

    let subtotal = 0;
    items.forEach(item => {
      subtotal += item.quantity * item.price;
    });
    const tax = subtotal * 0.06;
    const total = subtotal + tax;
    return total;
  }, [price]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceResponse = await axios.get('https://internship-backend-2-ou29.onrender.com/getprice');
        setPrice(priceResponse.data);
      } catch (error) {
        console.error('Error fetching price:', error);
      }

      try {
        const userResponse = await axios.get('https://internship-backend-2-ou29.onrender.com/getuser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(userResponse.data);
      } catch (error) {
        console.log(error);
      }

      try {
        const ordersResponse = await axios.get('https://internship-backend-2-ou29.onrender.com/getorders');
        const fetchedOrders = ordersResponse.data;
        setTotalOrders(fetchedOrders.length);

        const monthlyIncomeMap = { ...initialMonthlyIncome };
        fetchedOrders.forEach(order => {
          const month = new Date(order.created_at.split('-').reverse().join('-')).toLocaleString('default', { month: 'long' });
          const income = calculateIncome(order);
          monthlyIncomeMap[month] += income;
        });

        setMonthlyIncome(monthlyIncomeMap);

        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        const specificDate = `${day}-${month}-${year}`;

        const filteredOrders = fetchedOrders.filter(order => order.created_at === specificDate);
        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [token, calculateIncome]);

  const handleViewOrder = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleViewAll = () => {
    navigate('/orders');
  };

  const filteredIncome = monthlyIncome[selectedMonth] || 0;

  const chartData = {
    labels: Object.keys(initialMonthlyIncome),
    datasets: [{
      label: 'Monthly Income',
      data: Object.values(monthlyIncome),
      borderColor: 'rgba(235, 52, 168, 0.4)',
      backgroundColor: 'rgba(235, 52, 168, 1)',
      fill: true,
    }]
  };

  return (
    <div className="flex flex-col items-center md:ml-56 lg:ml-80 p-6 min-h-screen bg-gray-100 space-y-4">
      <div className="w-full p-6">
        {data ? (
          <h2 className="text-2xl font-bold">Welcome, {data.name}</h2>
        ) : (
          <h2 className="text-2xl font-bold">Loading...</h2>
        )}
        <p className="mt-4 text-xl">Dashboard Summary</p>
      </div>

      <div className="w-full flex flex-wrap md:flex-nowrap justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-xl mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-xl mb-2">Total Income</h3>
          <p className="text-3xl font-bold">₹{Object.values(monthlyIncome).reduce((sum, income) => sum + income, 0).toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-xl mb-2">Select Month</h3>
          <select value={selectedMonth} onChange={handleMonthChange} className="w-full p-2 border rounded">
            {Object.keys(initialMonthlyIncome).map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <p className="mt-4">Income for {selectedMonth}: ₹{filteredIncome.toFixed(2)}</p>
        </div>
      </div>

      <div className="w-full flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-xl mb-4">Monthly Income Graph</h3>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex-1">
          <h3 className="text-xl mb-4">Today's Orders</h3>
          {orders.length === 0 && (
            <div className="flex justify-center items-center w-full">
              <p className="text-2xl text-center">No Orders Found</p>
            </div>
          )}
          <ul className="space-y-2">
            {orders.slice(0, 5).map(order => (
              <li key={order.id} className="p-4 border rounded-lg shadow-sm flex justify-between">
                <span className='capitalize'>{order.distributorName}</span>
                <span className='bg-[#eb34a8] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' onClick={() => handleViewOrder(order.order_id)}>View</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            <button className="bg-[#eb34a8] text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleViewAll}>
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
