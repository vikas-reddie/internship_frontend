import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8050/getorder/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const items = [
    { description: '1 Liter', quantity: orderDetails.quantity1ltr, price: 20.00 },
    { description: '200 ml', quantity: orderDetails.quantity200ml, price: 5.00 },
    { description: '20 Liter', quantity: orderDetails.quantity20ltr, price: 50.00 },
    { description: '2 Liter', quantity: orderDetails.quantity2ltr, price: 30.00 },
    { description: '500 ml', quantity: orderDetails.quantity500ml, price: 10.00 },
    { description: '5 Liter', quantity: orderDetails.quantity5ltr, price: 40.00 }
  ].filter(item => item.quantity > 0);  

  const calculateTotal = () => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal += item.quantity * item.price;
    });
    const tax = subtotal * 0.06; 
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const totals = calculateTotal();

  const generateUPIQR = (total) => {
    // const upiID = '8328286828@ybl'; 
    return `upi://pay?pa=8328286804@ybl&pn=Vikas&am=${total.toFixed(2)}&cu=INR`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div ref={componentRef} className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img className="h-10 w-10 mr-0" src="https://img.freepik.com/premium-vector/da-logo-icon_786241-185.jpg" alt="Logo" />
            <div className="text-gray-700 font-semibold text-lg">Dhiraj Agro</div>
          </div>
          <div className="text-gray-700">
            <div className="font-bold text-xl mb-2">INVOICE</div>
            <div className="text-sm">Date: {orderDetails.created_at}</div>
            <div className="text-sm">Invoice #: {orderDetails.order_id}</div>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 pb-8 mb-0">
          <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2 text-transform: uppercase">{orderDetails.distributorName}</div>
          <div className="text-gray-700 mb-2 text-transform: uppercase">{orderDetails.address}</div>
          <div className="text-gray-700">{orderDetails.phoneNumber}</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left mb-5">
            <thead>
              <tr>
                <th className="text-gray-700 font-bold uppercase py-2">Description</th>
                <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                <th className="text-gray-700 font-bold uppercase py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="py-4 text-gray-700">{item.description}</td>
                  <td className="py-4 text-gray-700">{item.quantity}</td>
                  <td className="py-4 text-gray-700">₹{item.price.toFixed(2)}</td>
                  <td className="py-4 text-gray-700">₹{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mb-0">
          <div>
            <QRCode value={generateUPIQR(totals.total)} />
            <p>Please Make payment using Above QR Code</p>
          </div>
          <div>
            <div className="flex justify-end mb-8">
              <div className="text-gray-700 mr-2">Subtotal:</div>
              <div className="text-gray-700">₹{totals.subtotal.toFixed(2)}</div>
            </div>
            <div className="flex justify-end mb-8">
              <div className="text-gray-700 mr-2">Tax (6%):</div>
              <div className="text-gray-700">₹{totals.tax.toFixed(2)}</div>
            </div>
            <div className="flex justify-end mb-8">
              <div className="text-gray-700 mr-2">Total:</div>
              <div className="text-gray-700 font-bold text-xl">₹{totals.total.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-300 pt-8 mb-0 ">
          <div className="text-gray-700 mb-2 flex justify-center">Dhiraj Agro</div>
          <div className="text-gray-700 flex justify-center">123 Main St., Chennai, India 517547.</div>
        </div>
      </div>
      <div className="flex justify-center mt-8 mb-8">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Print as PDF
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
