import React from 'react'
import styles from './PrevCards.module.css'

const PrevCards = ({order}) => {
  return (
    <div className={styles.mainDiv}>
      <div key={order._id}>
            <div>
              <strong>Order ID:</strong> {order._id}
            </div>
            <div>
              <strong>Total Amount:</strong> {order.totalAmount}
            </div>
            <div>
              <strong>Status:</strong> {order.status}
            </div>
            <div>
              <h5 style={{'textDecoration': 'underline'}}>Ordered Items:</h5>
              <div className={styles.dishesDiv}>
                {order.eachOrder.map((item) => (
                  <div className={styles.dishDiv} key={item._id}>
                    <div>
                      <>Dish Name:</> {item.dishId.name}
                    </div>
                    <div>
                      <>Quantity:</> {item.quantity}
                    </div>
                    {item.specialInstructions && <div>
                      <>Special Instructions:</> {item.specialInstructions}
                    </div>}
                  
                  </div>
                ))}
              </div>
            </div>
          </div>
    </div>
  )
}

export default PrevCards
