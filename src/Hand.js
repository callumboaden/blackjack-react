import React from "react";
import Card from "./Card";
import "./Hand.css";

function Hand(props) {
  const { cards, weight, id, currentHand } = props;
  const activeHand = currentHand === id ? 'active' : '';

  return (
    <div className={`Hand ${activeHand}`}>
      { weight > 21 && <h4>Bust!</h4>}
      <div className="Hand-cards">
        {cards.map(card => (
          <Card key={card.string} {...card} />
        ))}
      </div>

      <p>Weight: {weight}</p>
    </div>
  );
}

export default Hand;
