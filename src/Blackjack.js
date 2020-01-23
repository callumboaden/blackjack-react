import React, { Component } from "react";
import Player from "./Player";
import Dealer from "./Dealer";
import Controls from "./Controls";
import Panel from "./Panel";

class Blackjack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: this.createDeck(),
      dealerHands: [],
      playerHands: [],
      bank: 1000,
      initialBet: 0,
      currentHand: 0
    };

    this.dealerTurn = this.dealerTurn.bind(this);
    this.getNextCard = this.getNextCard.bind(this);
    this.generateHand = this.generateHand.bind(this);
    this.calculateHandWeight = this.calculateHandWeight.bind(this);
    this.createDeck = this.createDeck.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.deal = this.deal.bind(this);
    this.hit = this.hit.bind(this);
    this.addBet = this.addBet.bind(this);
  }
  componentDidMount() {
    this.deal();
  }

  dealerTurn() {
    const hand = this.state.dealerHands[0];

    // if dealer hand < 16
    while (hand.weight < 16) {
      hand.cards.push(this.getNextCard());

      this.calculateHandWeight(hand);
      this.setState({ dealerHands: [hand] });
    }

    return;

    // if

    // getNextCard until weight >= 16
    // else end game/round, then check score
  }
  deal() {
    this.setState({
      dealerHands: [this.generateHand()],
      playerHands: [this.generateHand()]
    });
  }
  addBet(amount) {
    this.setState({ initialBet: this.state.initialBet + amount});
    console.log(amount)
  }
  hit() {
    const hand = this.getCurrentHand();

    if (hand.weight <= 21) {
      hand.cards.push(this.getNextCard());

      this.calculateHandWeight(hand);
      this.setState({ playerHands: [hand] });
    }

    if (this.getCurrentHand().weight > 21) {
      this.dealerTurn();
    }

    // current hand > 21
    // TODO: && current hand > hands length
  }
  getCurrentHand() {
    return this.state.playerHands[this.state.currentHand];
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
    const { playerHands, dealerHands, bank, initialBet } = this.state;
    return (
      <div>
        <Panel bank={bank} addBet={this.addBet} bet={initialBet} />
        <Player hands={playerHands} />
        <Dealer hands={dealerHands} />
        <Controls hit={this.hit}  />
      </div>
    );
  }
}

export default Blackjack;
