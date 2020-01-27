import React from 'react';
import "./Card.css";

const reqSvgs = require.context ('./svg', true, /\.svg$/ )

const svgs = reqSvgs
  .keys ()
  .reduce ( ( images, path ) => {
    images[path] = reqSvgs ( path )
    return images
  }, {} );

function Card(props) {
  const { suit, value, string } = props;
  const image = svgs[`./${string}.svg`];
   
  return (
    <div className="Card">
      <div className="Card-image">
        <img src={image} />
        <p>
        {value} of {suit}
      </p>
      </div>


    </div>
  );
}

export default Card;
