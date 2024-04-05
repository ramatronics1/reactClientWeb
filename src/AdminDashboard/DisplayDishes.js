import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import styles from './DisplayDishes.module.css';
import AddtoCart from '../ClientDashBoard/addtoCart';

const DisplayDishes = ({show,dish,setDish,handleChange,handleClick,setIsLoggedIn,isLoggedIn,warn }) => {
 
  const [dishes, setDishes] = useState([]);
  const history=useNavigate();
  const {hotelId}=useParams();
  console.log(hotelId)

  const cardStyle = {
    border: '2px solid var(--brown)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingBottom: '10px'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    color: 'var(--brown)',
    textAlign: 'start',
    paddingLeft: '10px',
    margin: '0'
  };

  const descriptionStyle = {
    textAlign: 'start',
    paddingLeft: '10px',
  };

  const tableStyle = {
    textAlign: 'start',
    width: 'min-content',
  };


  const tableDataStyle = {
    paddingLeft: '10px',
  };

  const imageContainerStyle = {
    width: '100%',
  };

  const imageStyle = {
    width: '100%',
    aspectRatio: '16/9',
    objectFit: 'cover',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/displayDishes/${hotelId}`);
        setDishes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (dish) => {
    history('/EditDishScreen',{ state: { id: dish } })
   
    console.log('Edit:', dish);
  };

  const handleDelete = async (dishId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteDishes/${dishId}`);
      console.log(response.data); 
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
      
    } catch (error) {
      console.error('Error deleting dish:', error);
    
    }
  };
  const checkLocalStorage = () => {
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    let isLoggedIn = false;
    if (isLoggedInString === 'true') {
      isLoggedIn = !isLoggedIn;
    }
    setIsLoggedIn(isLoggedIn);
  };
  useEffect(() => {
    checkLocalStorage();
  });


  return (
    
    <>
      {
    warn&&<div style={{'height':'50px', 'background': 'var(--light-brown)'}}> <h3 style={{'color': 'red'}}>Item already present in cart</h3></div>
}
      {show ? (
        <AddtoCart dish={dish} setDish={setDish} handleChange={handleChange}  handleClick={handleClick} />
      ) : (
        <div className={styles.outerDiv}>
          <h1>Display Dishes</h1>
          <div className={styles.cardDiv}>
            {dishes.length > 0 ? (
              dishes.map((dish, index) => (
                <div style={cardStyle} key={index}>
                  <div id={`carouselExampleAutoplayingdish${index}`} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {dish.imageUrl.map((image, imageIndex) => (
                        <div key={imageIndex} style={imageContainerStyle} className={`carousel-item ${imageIndex === 0 ? 'active' : ''}`} data-bs-interval="5000">
                          <img
                            key={`${imageIndex}`}
                            src={image.url}
                            alt={`Img Desc: ${imageIndex + 1}`}
                            style={imageStyle}
                          />
                        </div>
                      ))}
                    </div>
                    {dish.imageUrl.length > 1 && (
                      <>
                        <button style={{ height: '30px', width: '50px', top: '50%', transform: 'translateY(-50%)' }} className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleAutoplayingdish${index}`} data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button style={{ height: '30px', width: '50px', top: '50%', transform: 'translateY(-50%)' }} className="carousel-control-next" type="button" data-bs-target={`#carouselExampleAutoplayingdish${index}`} data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </>
                    )}
                  </div>
  
                  <h3 style={titleStyle}>{dish.name}</h3>
                  <p style={descriptionStyle}>{dish.description}</p>
  
                  <table style={tableStyle}>
                    <tbody>
                      <tr>
                        <td style={tableDataStyle}>Price:</td>
                        <td style={tableDataStyle}>{dish.price}</td>
                      </tr>
                      <tr>
                        <td style={tableDataStyle}>Category:</td>
                        <td style={tableDataStyle}>{dish.category}</td>
                      </tr>
                      <tr>
                        <td style={tableDataStyle}>Ingredients:</td>
                        <td style={tableDataStyle}>{dish.ingredients}</td>
                      </tr>
                      <tr>
                        <td style={tableDataStyle}>Is Vegetarian:</td>
                        <td style={tableDataStyle}>{dish.isVegetarian ? 'Yes 🟢' : 'No 🔴'}</td>
                      </tr>
                    </tbody>
                  </table>
  
                  {!isLoggedIn && (
  <>
    <button style={{ ...styles.button, width: 'fit-content', padding: '3px 6px', margin: '10px' }} onClick={() => handleEdit(dish)}>
      Edit
    </button>

    <button style={{ ...styles.button, width: 'fit-content', padding: '3px 6px', margin: '10px' }} onClick={() => handleDelete(dish._id)}>
      Delete
    </button>
  </>
)}
 {isLoggedIn && <button style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', outline: 'none', border: '1px solid var(--brown)', backgroundColor: 'var(--brown)', color: 'var(--light-brown)', fontWeight: '500', transition: 'all 0.3s ease' }} onClick={() => handleClick(dish)}>Add to Cart</button>}
    

                </div>
                
              ))
            ) : (
              <p style={styles.loadingText}>Loading dish data...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};  

export default DisplayDishes;
