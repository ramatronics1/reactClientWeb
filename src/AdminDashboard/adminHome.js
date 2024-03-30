import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./EachHotel.module.css";

const AdminHome = () => {
  const { hotelId } = useParams();

  return (
    <div>
      <h1 style={{margin: '2rem'}}>Welcome to the Home Page</h1>
      <Link className={styles.Login} style={{margin: '10px'}} to={{ pathname: `/EntryPage/${hotelId}` }}>Display dishes?</Link>
      <Link className={styles.Signup} style={{margin: '10px'}} to={{ pathname: `/hotel/${hotelId}/UploadScreen` }}>
        Upload dishes?
      </Link>
    </div>
  );
};

export default AdminHome;
