import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHotelCards = ({ hotel, index }) => {
  const navigate = useNavigate();

  const handleClick = (hotelId) => {
    navigate(`/Admin/hotel/${hotelId}`);
  };

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
  return (
    <div style={cardStyle} >
      <div id={`carouselExampleAutoplaying${index}`} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
        {hotel.imageUrl.map((image, imageIndex) => (
          <div key={hotel._id} style={imageContainerStyle} className={`carousel-item ${imageIndex === 0 ? 'active' : ''}`} data-bs-interval="5000">
          <img
            key={`${hotel._id}-image-${imageIndex}`}
            src={image.url}
            alt={`Img Desc: ${imageIndex + 1}`}
            style={imageStyle}
            />
          </div>
        ))}
        </div>
        {hotel.imageUrl.length > 1 && (<>
          <button style={{height: '30px', width: '50px', top: '50%', transform: 'translateY(-50%)'}} className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleAutoplaying${index}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button style={{height: '30px', width: '50px', top: '50%', transform: 'translateY(-50%)'}} className="carousel-control-next" type="button" data-bs-target={`#carouselExampleAutoplaying${index}`} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>)}
      </div>
      <h3 style={titleStyle}>{hotel.name}</h3>
      <p style={descriptionStyle}>{hotel.description}</p>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={tableDataStyle}><b>Phone:</b></td>
            <td style={tableDataStyle}>{hotel.phone}</td>
          </tr>
          <tr>
            <td style={tableDataStyle}><b>Email:</b></td>
            <td style={tableDataStyle}>{hotel.email}</td>
          </tr>
        </tbody>
      </table>
      <button style={{width: 'fit-content', padding: '3px 6px', margin: '10px'}} onClick={() => handleClick(hotel._id)}>View Hotel &rarr;</button>
    </div>
  );
};

export default AdminHotelCards;
