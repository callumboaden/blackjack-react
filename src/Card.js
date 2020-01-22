import React from 'react'
import './Card.css';

function Card(props) {
    const { suit, value } = props;
    return (
        <div className="Card">
            <p>{value} of {suit}</p>
        </div>
    )
}

export default Card;