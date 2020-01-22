import React from 'react'

function Card(props) {
    const { suit, value } = props;
    console.log(props)
    return (
        <div>
            <p>{value} of {suit}</p>
        </div>
    )
}

export default Card;