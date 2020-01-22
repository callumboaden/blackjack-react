import React from "react";
import Card from "./Card";
import "./Hand.css";

function Hand(props) {
  const { cards, weight } = props;
  return (
    <div className="Hand">
      <h3>Hand</h3>
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
