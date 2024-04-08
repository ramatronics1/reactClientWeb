import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './UploadScreen.module.css';

const UploadScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [image, setImage] = useState(null);
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const IP = process.env.REACT_APP_API_URL
  const handleUpload = async () => {
    try {
      if (!name || !description || !price || !category || !ingredients || !image) {
        alert('Error: Please fill in all the fields and provide an image.');
        return;
      }
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('ingredients', ingredients);
      formData.append('isVegetarian', isVegetarian.toString());
      formData.append('image', image);
  
      const response = await axios.post(`http://${IP}:5000/addNewdish/${hotelId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.data.success) {
        navigate(`/DisplayDishes/${hotelId}`);
      }
    } catch (error) {
      console.error(error);
      // Handle error, for example, show an error message.
      alert('Error: Failed to upload dish. Please try again.');
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(image)
  };

  return (
    <div className={styles.form} style={{ display: 'flex', flexDirection: 'column', padding: '10px'}}>
  <h1 style={{color: 'var(--brown)'}}>Upload New Dish</h1>
  <input className="form" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
  <input className="form" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
  <input className="form" placeholder="Price" onChange={(e) => setPrice(e.target.value)} value={price} type="number" />
  <input className="form" placeholder="Category" onChange={(e) => setCategory(e.target.value)} value={category} />
  <input className="form" type="file" accept="image/*" multiple onChange={handleImageChange} />
  <input className="form" placeholder="Ingredients" onChange={(e) => setIngredients(e.target.value)} value={ingredients} />
  <div>
    <span>Is Vegetarian:</span>
    <select value={isVegetarian.toString()} onChange={(e) => setIsVegetarian(e.target.value === 'true')}>
      <option value="false">No</option>
      <option value="true">Yes</option>
    </select>
  </div>
  <button className="form" onClick={handleUpload}>
    Upload Dish
  </button>
</div>
  );
};

export default UploadScreen;
