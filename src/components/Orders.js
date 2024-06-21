import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
         const response = await axios.get('http://127.0.0.1:8050/getorders');
        setOrders(response.data);
        console.log(response.data);
      }
      catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
    fetchOrders();
  }, []);
  const navigate = useNavigate();

  const handleAddOrder = () => {
    navigate('/add-order');
  };
  const handlevieworder = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className="p-5 flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button
          className="bg-[#eb34a8] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddOrder}
        >
          Add Order
        </button>
      </div>
      <div className="w-full max-w-2xl overflow-x-auto  left-[10vw]">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Distributor Name</th>
              <th className="py-2 px-4 border">Phone Number</th>
              
              <th className="py-2 px-4 border">ADDRESS</th>
              <th className="py-2 px-4 border">Bill</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="py-2 px-4 border">{order.order_id}</td>
                <td className="py-2 px-4 border">{order.created_at}</td>
                <td className="py-2 px-4 border capitalize">{order.distributorName}</td>
                <td className="py-2 px-4 border">{order.phoneNumber}</td>
                <td className="py-2 px-4 border capitalize">{order.address}</td>
                <td className="py-2 px-4 border ">
                <button
          className="bg-[#eb34a8] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handlevieworder(order.order_id)}
        >
          View
        </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
