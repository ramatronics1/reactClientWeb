import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EditDishScreen = () => {
  const location = useLocation();
  const loc = location.state.id;
  const IP = process.env.REACT_APP_API_URL
 
  const [name, setName] = useState(loc.name);
  const [description, setDescription] = useState(loc.description);
  const [price, setPrice] = useState(loc.price);
  const [category, setCategory] = useState(loc.category);
  const [ingredients, setIngredients] = useState(loc.ingredients);
  const [isVegetarian, setIsVegetarian] = useState(loc.isVegetarian);
  const [image, setImage] = useState(loc.imageUrl.url); 

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('ingredients', ingredients);
      formData.append('isVegetarian', isVegetarian.toString());
      formData.append('image', image); 
    

      loc.imageUrl.forEach((image, index) => {
        const checkBox = document.getElementById(`delete-image-${index}`);
        if (checkBox && checkBox.checked) {
          
          formData.append('deleteImages', image.filename);
        }
      });
     
      
      const response = await axios.put(`http://${IP}:5000/updateDishes/${loc._id}`, formData);
  


      
    } catch (error) {
      console.error('Error updating dish:', error);
    
    }
  };

 
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div>
      <h1>Edit Dish</h1>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} defaultValue={loc.name} />
      <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} defaultValue={loc.description} />
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} defaultValue={loc.price} />
      
      <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} defaultValue={loc.category} />
      <input type="file" onChange={handleImageChange} /> File input
      <input type="text" placeholder="Ingredients" onChange={(e) => setIngredients(e.target.value)} defaultValue={loc.ingredients} />
      <input
        type="text"
        placeholder="Is Vegetarian"
        onChange={(e) => setIsVegetarian(e.target.value)}
        value={loc.isVegetarian}
      />
      {loc.imageUrl.map((image, imageIndex) => (
        <div key={imageIndex}>
          <img
            src={image.url}
            alt={`Dish image ${imageIndex + 1}`}
            style={{ width: '10%', height: 'auto', marginBottom: 8 }}
          />
        <input type='checkbox' id={`delete-image-${imageIndex}`} value={image.filename}/>
          <label htmlFor={`delete-image-${imageIndex}`}>Delete</label>
        </div>
      ))}
      <button onClick={handleUpdate}>Update Dish</button>
    </div>
  );
};

export default EditDishScreen;
