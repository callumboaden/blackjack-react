import React from "react";
import Hand from "./Hand";
import "./Player.css";

function Player(props) {
  const { hands, currentHand } = props;
  return (
    <div className="Player">
      <h2>Player</h2>
      <div className="hands-list">
        {hands.map((hand, i) => (
          <Hand key={i} {...hand} id={i} currentHand={currentHand} />
        ))}
      </div>
    </div>
  );
}

export default Player;
