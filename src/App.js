import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';

import EachHotel from './AdminDashboard/EachHotel';
import AdminHome from './AdminDashboard/adminHome';
import AdminLogin from './AdminDashboard/AdminLoginPage';
import UploadScreen from './AdminDashboard/UploadScreen';
import EditDishScreen from './AdminDashboard/EditDishScreen';
import DisplayDishes from './AdminDashboard/DisplayDishes';
import PreviousOrders from './ClientDashBoard/PreviousOrders';
import LoginPage from './ClientDashBoard/LoginPage';
import Navbar from './ClientDashBoard/Navbar';


import AdminSignup from './AdminDashboard/AdminSignup';
import HotelRegister from './AdminDashboard/HotelRegister';

import AdminHotelDisplay from './AdminDashboard/AdminHotelDisplay';

function App() {
  const [dish, setDish] = useState([]);
  const [show, setShow] = useState(true);
  const [warn, setWarn] = useState(false);
  const [id,setId]=useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
 
  

  const handleClick = (item) => {
    let isPresent = false;
    dish.forEach((product) => {
      if (item._id === product._id) {
        isPresent = true;
      }
    });
    if (isPresent) {
      setWarn(true);
      setTimeout(() => {
        setWarn(false);
      }, 2000);
    }else{
      setDish([...dish, item]);
    }

  };
  
  const handleChange = (item, d) => {
    let ind = -1;
    dish.forEach((data, index) => {
      if (data._id === item._id) {
        ind = index;
      }
    });
    const tempArr = dish;
    tempArr[ind].quantity += d;
  
    if (tempArr[ind].amount === 0) {
      tempArr.splice(ind, 1);
    }
    setDish([...tempArr]);
  };
  
  return (
    <div className="App">
   
     <Navbar size={dish.length} setShow={setShow} setDish={setDish} id={id} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>

      <Routes>
        {/* Done */}
        <Route path="/" element={<LoginPage setId={setId} setIsLoggedIn={setIsLoggedIn} setDish={setDish}/>} />
        {/* Done */}
       
      
        <Route path="/PreviousOrders" element={<PreviousOrders id={id}/>}/>
        {/* Done */}
        <Route path="/adminLogin" element={<AdminLogin />} />
        {/* Done */}
        <Route path="/Admin/hotel/:id" element={<EachHotel warn={warn}  dish={dish} setDish={setDish} handleChange={handleChange} show={show} />} />
        
        {/* Done */}
        <Route path="/HotelDisplay" element={<AdminHotelDisplay warn={warn}  dish={dish} setDish={setDish} handleChange={handleChange} show={show} />} />
        {/* Done */}
        <Route path="/Admin/HotelRegister" element={<HotelRegister />} />
        
        {/* Done */}
        <Route path="/hotel/:hotelId" element={<AdminHome warn={warn}  dish={dish} setDish={setDish} handleChange={handleChange} show={show}/>} />
        {/* Done */}
        <Route path="/hotel/:hotelId/UploadScreen" element={<UploadScreen/>} />
        {/* Not accessible */}
        <Route path="/EditDishScreen" element={<EditDishScreen />} />
        {/* Done */}
        <Route path="/hotelRegister" element={<HotelRegister/>}/>
        {/* Not accessible */}
        <Route path="/DisplayDishes/:hotelId" element={<DisplayDishes setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} dish={dish} warn={warn} setDish={setDish} handleChange={handleChange} show={show} handleClick={handleClick}/>} />
        {/* Done */}
        <Route path="/adminSignup/:hotelId" element={<AdminSignup />} />
        {/* Done */}
        <Route path="/adminLogin/:hotelId" element={<AdminLogin />} />
               
            </Routes>
    </div>
  );
}

export default App;
