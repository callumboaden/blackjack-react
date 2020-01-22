import React from 'react'
import Hand from './Hand';
import './Dealer.css';

function Dealer(props) {
    const { hands } = props;
    
    return (
        <div className="Dealer">
            <h2>Dealer</h2>
            { hands.map((hand, i) => (
                <Hand key={i} {...hand} />
            ))}
        </div>
    )
}

export default Dealer;