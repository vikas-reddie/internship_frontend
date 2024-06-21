
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navItems = [
    { id: 1, text: 'Profile', path: '/profile' },
    {id:2,text:'Orders',path:'orders'},
  ];

  const isHomePage = location.pathname === '/';

  return (
    <div className='bg-[#FDF0D5] flex justify-between items-center h-20 max-w-full mx-auto px-4 text-[#eb34a8] '>

     
      {!nav ? (
        <h1 className='w-full text-3xl font-bold text-[#eb34a8]'>Dhiraj Agro</h1>
      ) : (
        <h1 className=''>a</h1>
      )}

      
      {!isHomePage && (
        <ul className='fixed left-0 top-0 w-[19%] h-full bg-[#FDF0D5]  sn:hidden sp:hidden se:hidden'>
          <h1 className='w-full text-3xl font-bold text-[#eb34a8] m-4'>Dhiraj Agro</h1>
          {navItems.map(item => (
            <li key={item.id} className='p-4 border-b rounded-xl hover:bg-[#eb34a8]  hover:text-black cursor-pointer'>
              <Link to={item.path} onClick={handleNav}>{item.text}</Link>
            </li>
          ))}
          {token && (
            <li className='p-4 border-b rounded-xl hover:bg-[#eb34a8]  hover:text-black cursor-pointer'>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      )}

    
      {!isHomePage && (
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      )}

      
      {!isHomePage && (
        <ul className={nav ? 'fixed left-0 top-0 w-[35%] md:w-[20%] h-full bg-[#FDF0D5] ease-in-out duration-500' : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] laptop:hidden'}>
          <h1 className='w-full  text-3xl font-bold text-[#eb34a8] m-4'>Dhiraj Agro</h1>
          {navItems.map(item => (
            <li key={item.id} className='p-4 border-b rounded-xl hover:bg-[#eb34a8] duration-300 hover:text-black cursor-pointer'>
              <Link to={item.path} onClick={handleNav}>{item.text}</Link>
            </li>
          ))}
          {token && (
            <li className='p-4 border-b rounded-xl hover:bg-[#eb34a8] duration-300 hover:text-black cursor-pointer'>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
