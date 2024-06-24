import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';

const Profile = () => {
    const token = useSelector(state => state.auth.token);
    const [isEditing, setIsEditing] = useState(false);
    const [data,setData] = useState(null)
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://internship-backend-2-ou29.onrender.com/getuser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [token]);

   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.post('https://internship-backend-2-ou29.onrender.com/update-profile', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                alert('Profile updated successfully');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
        setIsEditing(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen scroll-x-auto">
            <div className="w-full max-w-3xl p-5 border rounded shadow-md bg-[#FDF0D5]">
                <h2 className="text-4xl mb-4 text-center text-[#eb34a8] border-b-2 pb-2">Profile</h2>
                <div className="grid grid-cols-1 gap-4">
                    {data && Object.keys(data).map((key) => (
                        <div key={key} className="flex flex-col">
                            <label className="font-bold capitalize">{key}:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name={key}
                                    value={data[key] || ''}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded"
                                />
                            ) : (
                                <span>{data[key]}</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                    {isEditing ? (
                        <button
                            onClick={handleSaveClick}
                            className="px-4 py-2 bg-[#eb34a8] text-white rounded"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={handleEditClick}
                            className="px-4 py-2 bg-[#eb34a8] text-white rounded"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
