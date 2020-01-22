import React, { Component } from 'react';
import Deck from './Deck';

class Blackjack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deck: new Deck(),
            playerHands: [],
            playerBank: 1000,
            dealerHands: []
        }
    }
    render() { 
        console.log(this.state)
        return ( 
            <div>
                <h1>Blackjack</h1>
            </div>
         );
    }
}
 
export default Blackjack;