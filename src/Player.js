import React from 'react'
import Hand from './Hand';

function Player(props) {
    const { hands } = props;
    console.log(hands)
    return (
        <div>
            <h2>Player</h2>
            { hands.map((hand, i) => (
                <Hand key {...hand} />
            ))}
        </div>
    )
}

export default Player;