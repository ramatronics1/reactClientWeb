import React, { useState } from 'react';
import axios from 'axios';
import styles from './UploadScreen.module.css';

const HotelRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    geometry: {
      coordinates: [null, null], // Initial values set to null
      type: 'Point'
    },
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] || null });
    } else if (name === 'latitude' || name === 'longitude') {
      const newValue = parseFloat(value);
      const newCoordinates = [...formData.geometry.coordinates];
      newCoordinates[name === 'latitude' ? 1 : 0] = isNaN(newValue) ? null : newValue; // Set to null if parsed value is NaN
      setFormData({
        ...formData,
        geometry: {
          ...formData.geometry,
          coordinates: newCoordinates
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('latitude', formData.geometry.coordinates[1]);
      formDataToSend.append('longitude', formData.geometry.coordinates[0]);
      formDataToSend.append('image', formData.image);

      await axios.post('http://localhost:5000/hotelRegister', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const { name, description, phone, email, geometry, image } = formData;

  return (
    <>
      <h1 style={{ color: 'var(--brown)', textAlign: 'start', padding: '10px' }}>Register your hotel!</h1>
      <div className={styles.form} style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
        <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="description" value={description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="phone" value={phone} onChange={handleChange} placeholder="Phone" />
        <input type="text" name="email" value={email} onChange={handleChange} placeholder="Email" />
        <input type="number" name="latitude" value={geometry.coordinates[1] || ''} onChange={handleChange} placeholder="Latitude" />
        <input type="number" name="longitude" value={geometry.coordinates[0] || ''} onChange={handleChange} placeholder="Longitude" />
        <input type="file" accept="image/*" onChange={handleChange} name="image" multiple />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default HotelRegister;
