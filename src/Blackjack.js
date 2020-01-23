import React, { Component } from "react";
import Player from "./Player";
import Dealer from "./Dealer";
import Controls from "./Controls";

class Blackjack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: this.createDeck(),
      dealerHands: [],
      playerHands: [],
      playerBank: 1000,
      currentHand: 0
    };

    this.getNextCard = this.getNextCard.bind(this);
    this.generateHand = this.generateHand.bind(this);
    this.calculateHandWeight = this.calculateHandWeight.bind(this);
    this.createDeck = this.createDeck.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.deal = this.deal.bind(this);
    this.hit = this.hit.bind(this);
  }
  componentDidMount() {
    this.deal();
  }

  deal() {
    this.setState({
      dealerHands: [this.generateHand()],
      playerHands: [this.generateHand()]
    });
  }
  hit() {
    const hand = this.state.playerHands[this.state.currentHand];

    if (hand.weight <= 21) {
      hand.cards.push(this.getNextCard());

      this.calculateHandWeight(hand);
      this.setState({ playerHands: [hand] });
    }
  }
  generateHand() {
    const hand = {
      cards: [this.getNextCard(), this.getNextCard()]
    };

    this.calculateHandWeight(hand);
    return hand;
  }
  calculateHandWeight(hand) {
    const { cards } = hand;
    hand.weight = 0;

    cards.forEach(card => {
      hand.weight += card.weight;
    });
  }
  getNextCard() {
    return this.state.deck.shift();
  }
  createDeck() {
    let deck = [];
    let card = {};
    const suits = ["hearts", "diamonds", "spades", "clubs"];
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K"
    ];

    suits.forEach(suit => {
      values.forEach(value => {
        card = {
          suit: suit,
          value: value
        };

        // set card weight
        if (card.value === "A") {
          card.weight = 11;
        } else if (
          card.value === "J" ||
          card.value === "Q" ||
          card.value === "K"
        ) {
          card.weight = 10;
        } else {
          card.weight = parseInt(card.value, 10);
        }

        card.string = `${value}${suit.slice(0, 1).toUpperCase()}`;

        deck.push(card);
      });
    });

    return this.shuffle(deck);
  }
  shuffle(deck) {
    deck.forEach((card, i) => {
      let swapIndex = Math.floor(Math.random() * deck.length);
      let randomCard = deck[swapIndex];
      deck[i] = randomCard;
      deck[swapIndex] = card;
    });

    return deck;
  }

  render() {
    const { playerHands, dealerHands } = this.state;
    return (
      <div>
        <h1>Blackjack</h1>
        <Player hands={playerHands} />
        <Dealer hands={dealerHands} />
        <Controls hit={this.hit} />
      </div>
    );
  }
}

export default Blackjack;
