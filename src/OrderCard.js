import React from 'react';

function OrderCard({order}) {
    return (
        <div className="order-cards">
            <p>Order Number: {order.order_number}</p>
            <p>Purchase Date: {order.purchase_date}</p>
            <p>Price: ${order.guitar.price}</p>
            <img src={order.guitar.image_url} alt={order.guitar.name}/>
            <p>{order.guitar.name}</p>
        </div>
    )
}

export default OrderCard;