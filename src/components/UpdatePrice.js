import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePrice = () => {
    const navigate = useNavigate();

    const [price500ml, setPrice500ml] = useState('');
    const [price200ml, setPrice200ml] = useState('');
    const [price1ltr, setPrice1ltr] = useState('');
    const [price2ltr, setPrice2ltr] = useState('');
    const [price5ltr, setPrice5ltr] = useState('');
    const [price20ltr, setPrice20ltr] = useState('');

    useEffect(() => {
        const fetchPriceDetails = async () => {
            try {
                const response = await axios.get(`https://internship-backend-2-ou29.onrender.com/getprice`);
                const data = response.data;
                setPrice500ml(data.price500ml || '');
                setPrice200ml(data.price200ml || '');
                setPrice1ltr(data.price1ltr || '');
                setPrice2ltr(data.price2ltr || '');
                setPrice5ltr(data.price5ltr || '');
                setPrice20ltr(data.price20ltr || '');
            } catch (error) {
                console.error('Error fetching price:', error);
            }
        };
        fetchPriceDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://internship-backend-2-ou29.onrender.com/updateprice', {
                price500ml,
                price200ml,
                price1ltr,
                price2ltr,
                price5ltr,
                price20ltr
            });

            if (response.status === 200) {
                const { message } = response.data;
                alert(`${message}! `);
                navigate('/orders');
            } else {
                alert('Order submission failed! Please try again.');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('An error occurred. Please check your network or contact support.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen scroll-x-auto">
            <div className="w-full max-w-3xl p-5 border rounded shadow-md bg-[#FDF0D5]">
                <h2 className="text-4xl mb-4 text-center text-[#eb34a8] border-b-2 pb-2">Update Price</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-2">500ml Price</label>
                            <input
                                type="text"
                                value={price500ml}
                                onChange={(e) => setPrice500ml(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">200ml Price</label>
                            <input
                                type="text"
                                value={price200ml}
                                onChange={(e) => setPrice200ml(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">1ltr Price</label>
                            <input
                                type="text"
                                value={price1ltr}
                                onChange={(e) => setPrice1ltr(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">2ltr Price</label>
                            <input
                                type="text"
                                value={price2ltr}
                                onChange={(e) => setPrice2ltr(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">5ltr Price</label>
                            <input
                                type="text"
                                value={price5ltr}
                                onChange={(e) => setPrice5ltr(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">20ltr Price</label>
                            <input
                                type="text"
                                value={price20ltr}
                                onChange={(e) => setPrice20ltr(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-4 space-x-4">
                        <button type="submit" className="px-4 py-2 bg-[#eb34a8] text-white rounded hover:bg-[#d32f7a]">
                        Update Price
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePrice;
