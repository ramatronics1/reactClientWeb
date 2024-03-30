import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import styles from './Navbar.module.css'

const Navbar = ({ size, setShow, setDish,id,setIsLoggedIn,isLoggedIn }) => {
  
  const history = useNavigate();

  const checkLocalStorage = () => {
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    let isLoggedIn = false;
    if (isLoggedInString === 'true') {
      isLoggedIn = !isLoggedIn;
    }
    setIsLoggedIn(isLoggedIn);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false.toString());
    setIsLoggedIn(false);
    setDish([]);
    history('/');
  };
const handlePrevOrders=()=>{
history('/PreviousOrders')
}
  useEffect(() => {
    checkLocalStorage();
  });

  return (
    <nav className={styles.nav}>
      {/* <div> */}
        <div className={styles.headDiv}>
          <span className={styles.headText} onClick={() => setShow(true)}>My Shopping</span>
          <div className={styles.cartDiv} onClick={() => setShow((prevShow) => !prevShow)}> 
              🛒
              {size !== 0 && <span className={styles.cartCount}>{size}</span>}         </div>
        </div>
     
        <div>
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
          {isLoggedIn && <button onClick={()=>handlePrevOrders()}> Previous Orders</button>}
        </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;