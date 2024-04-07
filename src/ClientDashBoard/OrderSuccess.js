import React from 'react';
import { useParams } from 'react-router-dom'; 

const OrderSuccess = () => {
  const { orderId } = useParams(); // Extract orderId from useParams
  console.log(orderId);

  return (
    <div style={{ backgroundColor: 'green', color: 'white', padding: '20px' }}>
      {orderId ? (
        <div>
          Your order with Order ID {orderId} has been successfully placed. Please anticipate an email when your order is prepared. You can collect and pay for your order in the store upon receiving the email.
        </div>
      ) : (
        <div>
          Your order may not have been placed properly. You will receive a mail if it is placed, otherwise, please try ordering again.
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
