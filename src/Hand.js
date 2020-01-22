import React from 'react'
import Card from './Card';

function Hand(props) {
    const { cards, weight } = props;
    return (
        <div>
            <h3>Hand</h3>
            { cards.map(card => (
                <Card key={card.string} {...card} />
            ))}
            
            <p>Weight: {weight}</p>
            
        </div>
    )
}

export default Hand;