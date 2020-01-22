import React from "react";
import Hand from "./Hand";
import './Player.css';

function Player(props) {
  const { hands } = props;

  return (
    <div className="Player">
      <h2>Player</h2>
      <div className="hands-list">
        {hands.map((hand, i) => (
          <Hand key={i} {...hand} />
        ))}
      </div>
    </div>
  );
}

export default Player;
