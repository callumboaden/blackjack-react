import React, {Component} from 'react';
import images from "./images";

import "./Card.css";
const reqSvgs = require.context ('./svg', true, /\.svg$/ )

const svgs = reqSvgs
  .keys ()
  .reduce ( ( images, path ) => {
    images[path] = reqSvgs ( path )
    return images
  }, {} );

const image = svgs['./9S.svg'];

console.log(image)

function Card(props) {
  const { suit, value, string } = props;
  const image = svgs[`./${string}.svg`];
   
  return (
    <div className="Card">
      <div className="Card-image">
        <img src={image} width="100" />
      </div>

      <p>
        {value} of {suit}
      </p>
    </div>
  );
}

export default Card;
