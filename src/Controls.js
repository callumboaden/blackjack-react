import React from "react";
import "./Controls.css";

function Controls(props) {
  const { deal, hit, split, isPlaying } = props;
  return (
    <div className="Controls">
      <h4>Controls</h4>

      {!isPlaying ? (
        <>
          <button className="Controls-deal" onClick={deal}>
            Deal
          </button>
        </>
      ) : (
        <>
          <button className="Controls-hit" onClick={hit}>
            Hit
          </button>
          <button className="Controls-stand">Stand</button>
          <button className="Controls-double">Double</button>
          <button className="Controls-split" onClick={split}>Split</button>
        </>
      )}
    </div>
  );
}

export default Controls;
