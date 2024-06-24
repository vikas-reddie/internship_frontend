import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
    const [distributorName, setDistributorName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const [quantity500ml, setQuantity500ml] = useState('');
    const [quantity200ml, setQuantity200ml] = useState('');
    const [quantity1ltr, setQuantity1ltr] = useState('');
    const [quantity2ltr, setQuantity2ltr] = useState('');
    const [quantity5ltr, setQuantity5ltr] = useState('');
    const [quantity20ltr, setQuantity20ltr] = useState('');
    const [price,setPrice] = useState({})
    useEffect(() => {
        const fetchOrderDetails = async () => {
          try{
            const response = await axios.get(`https://internship-backend-2-ou29.onrender.com/getprice`);
            setPrice(response.data);
          } catch (error) {
            console.error('Error fetching price:', error);
          }
        };
        fetchOrderDetails();
      });

    const productPrices = {
        '500ml': price.price500ml,
        '200ml': price.price200ml,
        '1ltr': price.price1ltr,
        '2ltr': price.price2ltr,
        '5ltr': price.price5ltr,
        '20ltr': price.price20ltr,
    };

    const calculateTotal = () => {
        return (
            (parseInt(quantity500ml) || 0) * productPrices['500ml'] +
            (parseInt(quantity200ml) || 0) * productPrices['200ml'] +
            (parseInt(quantity1ltr) || 0) * productPrices['1ltr'] +
            (parseInt(quantity2ltr) || 0) * productPrices['2ltr'] +
            (parseInt(quantity5ltr) || 0) * productPrices['5ltr'] +
            (parseInt(quantity20ltr) || 0) * productPrices['20ltr']
        );
    };

    // const generatePDF = () => {
    //     const doc = new jsPDF();

        
        
    //     doc.setFontSize(12);
    //     doc.text('Dhiraj Agro', 25, 15);
    //     doc.text('Chennai', 25, 20);

        
    //     doc.setFontSize(20);
    //     doc.text('INVOICE', 150, 15, { align: 'right' });
    //     doc.setFontSize(12);
    //     doc.text('Date: 01/05/2023', 150, 25, { align: 'right' });
    //     doc.text('Invoice #: INV12345', 150, 30, { align: 'right' });

        
    //     doc.setFontSize(16);
    //     doc.text('Bill To:', 10, 50);
    //     doc.setFontSize(12);
    //     doc.text(distributorName, 10, 60);
    //     doc.text(address, 10, 65);
    //     doc.text(phoneNumber, 10, 70);

       
    //     doc.autoTable({
    //         startY: 80,
    //         head: [['Description', 'Quantity', 'Price', 'Total']],
    //         body: [
    //             ['100ml', quantity500ml, `$${productPrices['500ml']}`, `$${(parseInt(quantity500ml) || 0) * productPrices['500ml']}`],
    //             ['200ml', quantity200ml, `$${productPrices['200ml']}`, `$${(parseInt(quantity200ml) || 0) * productPrices['200ml']}`],
    //             ['1ltr', quantity1ltr, `$${productPrices['1ltr']}`, `$${(parseInt(quantity1ltr) || 0) * productPrices['1ltr']}`],
    //             ['2ltr', quantity2ltr, `$${productPrices['2ltr']}`, `$${(parseInt(quantity2ltr) || 0) * productPrices['2ltr']}`],
    //             ['5ltr', quantity5ltr, `$${productPrices['5ltr']}`, `$${(parseInt(quantity5ltr) || 0) * productPrices['5ltr']}`],
    //             ['20ltr', quantity20ltr, `$${productPrices['20ltr']}`, `$${(parseInt(quantity20ltr) || 0) * productPrices['20ltr']}`],
    //         ],
    //     });

        
    //     let finalY = doc.lastAutoTable.finalY + 10;
    //     doc.text('Subtotal:', 150, finalY);
    //     doc.text(`$${calculateTotal()}`, 200, finalY, { align: 'right' });

    //     finalY += 10;
    //     doc.text('Tax:', 150, finalY);
    //     doc.text(`$${(calculateTotal() * 0.06).toFixed(2)}`, 200, finalY, { align: 'right' });

    //     finalY += 10;
    //     doc.text('Total:', 150, finalY);
    //     doc.text(`$${(calculateTotal() * 1.06).toFixed(2)}`, 200, finalY, { align: 'right' });

        
    //     finalY += 20;
    //     doc.setFontSize(12);
    //     doc.text('Payment is due within 30 days. Late payments are subject to fees.', 10, finalY);
    //     finalY += 10;
    //     doc.text('Please make checks payable to Your Company Name and mail to:', 10, finalY);
    //     finalY += 10;
    //     doc.text('123 Main St., Anytown, USA 12345', 10, finalY);

    //     doc.save('invoice.pdf');
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://internship-backend-2-ou29.onrender.com/addorder', {
            distributorName,
            phoneNumber,
            address,
            quantity500ml,
            quantity200ml,
            quantity1ltr,
            quantity2ltr,
            quantity5ltr,
            quantity20ltr
          });
      
          if (response.status === 200) {
            const { message, order_id } = response.data;
            alert(`${message}! Your Order ID is: ${order_id}`);
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
                <h2 className="text-4xl mb-4 text-center text-[#eb34a8] border-b-2 pb-2">Add Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-2">Distributor Name</label>
                            <input
                                required
                                type="text"
                                value={distributorName}
                                onChange={(e) => setDistributorName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Phone Number</label>
                            <input
                                required
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Address</label>
                            <input
                                required   
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">500ml Quantity</label>
                            <input
                                
                                type="number"
                                value={quantity500ml}
                                onChange={(e) => setQuantity500ml(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">200ml Quantity</label>
                            <input
                                type="number"
                                value={quantity200ml}
                                onChange={(e) => setQuantity200ml(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">1ltr Quantity</label>
                            <input
                                type="number"
                                value={quantity1ltr}
                                onChange={(e) => setQuantity1ltr(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">2ltr Quantity</label>
                            <input
                                type="number"
                                value={quantity2ltr}
                                onChange={(e) => setQuantity2ltr(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">5ltr Quantity</label>
                            <input
                                type="number"
                                value={quantity5ltr}
                                onChange={(e) => setQuantity5ltr(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">20ltr Quantity</label>
                            <input
                                type="number"
                                value={quantity20ltr}
                                onChange={(e) => setQuantity20ltr(e.target.value)}
                                min="0"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-4 space-x-4">
                        <button type="submit" className="px-4 py-2 bg-[#eb34a8] text-white rounded hover:bg-[#d32f7a]">
                            Submit Order
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="text-xl">Total Price: &#8377; {calculateTotal()}</h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Order;
