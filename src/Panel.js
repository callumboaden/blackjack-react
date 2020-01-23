import React from "react";
import "./Panel.css";

function Panel(props) {
  const { bank, addBet, bet, isPlaying } = props;
  return (
    <div className="Panel">
      <h1>Blackjack</h1>
      <p>Bank: {bank}</p>
      {!isPlaying && (
        <>
          <p>Bet: {bet} </p>
          <button onClick={() => addBet(50)}>50</button>
        </>
      )}
    </div>
  );
}

export default Panel;
