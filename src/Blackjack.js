import React, { Component } from 'react';

class Blackjack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deck: [],
            playerHands: [],
            playerBank: 1000,
            dealerHands: []
        }
    }
    render() { 
        return ( 
            <div>
                <h1>Blackjack</h1>
            </div>
         );
    }
}
 
export default Blackjack;