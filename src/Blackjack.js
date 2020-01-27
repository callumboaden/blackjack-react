import React, { Component } from "react";
import Player from "./Player";
import Dealer from "./Dealer";
import Controls from "./Controls";
import Panel from "./Panel";
import createDeck from "./Deck";
import "./Blackjack.css";

class Blackjack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: createDeck(),
      dealerHands: [],
      playerHands: [],
      bank: 1000,
      initialBet: 0,
      currentHand: 0,
      isPlaying: false
    };

    this.dealerTurn = this.dealerTurn.bind(this);
    this.getNextCard = this.getNextCard.bind(this);
    this.generateHand = this.generateHand.bind(this);
    this.calculateHandWeight = this.calculateHandWeight.bind(this);
    this.deal = this.deal.bind(this);
    this.hit = this.hit.bind(this);
    this.split = this.split.bind(this);
    this.addBet = this.addBet.bind(this);
    this.stand = this.stand.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
  }
  componentDidMount() {
    this.addBet(50);
    this.deal();
  }

  checkWinner() {
    let bet = 0;
    const dealerScore = this.state.dealerHands[0].weight;
    const updatedHands = this.state.playerHands.map(hand => {
      if (hand.weight < 21) {

        if (hand.weight === 21) {
          bet += hand.bet + ((hand.bet * 2) * 1.5);

          return {...hand, result: 'blackjack'}
          // hand.result = "blackjack";
        }
        
        if (hand.weight > dealerScore) {
          bet += hand.bet + (hand.bet * 2);

          return {...hand, result: 'win'}
          // hand.result = "win";
        }

        if (hand.weight === dealerScore) {
          bet += hand.bet;

          return {...hand, result: "push"}
        }

        if (dealerScore > 21) {
          bet += hand.bet * 2;

          return {...hand, result: 'win'}
        }
      } else {

        return {...hand, result: 'loss'}
        // hand.result = "loss";
      }

      return hand;

    });

    console.log(bet);

    this.setState({ playerHands: updatedHands, bank: this.state.bank + bet, isPlaying: false });
  }
  dealerTurn() {
    const hand = this.state.dealerHands[0];

    // if dealer hand < 16
    while (hand.weight < 16) {
      hand.cards.push(this.getNextCard());

      this.calculateHandWeight(hand);
      this.setState({ dealerHands: [hand] });
    }

    this.checkWinner();

    return;
  }
  split() {
    const newHand = {};
    const currentHand = this.getCurrentHand();

    newHand.cards = [currentHand.cards.pop(), this.getNextCard()];

    newHand.bet = this.state.initialBet;

    currentHand.cards.push(this.getNextCard());

    this.calculateHandWeight(currentHand);
    this.calculateHandWeight(newHand);

    this.setState({
      playerHands: [...this.state.playerHands, newHand],
      bank: this.state.bank - newHand.bet
    });
  }
  deal() {
    if (this.state.initialBet) {
      // const playerHand = this.generateHand();

      // TESTING
      const playerHand = {
        cards: [
          { suit: "hearts", value: "J", weight: 10, string: "JH" },
          { suit: "spades", value: "J", weight: 10, string: "JS" }
        ]
      };

      this.calculateHandWeight(playerHand);

      playerHand.bet = this.state.initialBet;

      this.setState({
        dealerHands: [this.generateHand()],
        playerHands: [playerHand],
        isPlaying: true
      });
    }
  }
  addBet(amount) {
    this.setState({
      initialBet: this.state.initialBet + amount,
      bank: this.state.bank - amount
    });
  }
  stand() {
    this.setState({ currentHand: this.state.currentHand + 1 });

    if (this.state.currentHand === this.state.playerHands.length - 1) {
      this.dealerTurn();
    }
  }
  hit() {
    const hand = this.getCurrentHand();

    if (hand.weight <= 21) {
      hand.cards.push(this.getNextCard());

      this.calculateHandWeight(hand);
      this.setState({ playerHands: [...this.state.playerHands] });
    }

    if (this.getCurrentHand().weight > 21) {
      this.setState({ currentHand: this.state.currentHand + 1 });
    }

    if (this.state.currentHand === this.state.playerHands.length - 1) {
      this.dealerTurn();
    }
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

  render() {
    const {
      playerHands,
      dealerHands,
      bank,
      initialBet,
      isPlaying,
      currentHand
    } = this.state;

    console.log(this.state);
    return (
      <div className="container">
        <div className="main">
          <Panel
            bank={bank}
            addBet={this.addBet}
            bet={initialBet}
            isPlaying={isPlaying}
          />
          <Player hands={playerHands} currentHand={currentHand} />
          <Dealer hands={dealerHands} />
        </div>
        <Controls
          hit={this.hit}
          deal={this.deal}
          isPlaying={isPlaying}
          split={this.split}
          stand={this.stand}
        />
      </div>
    );
  }
}

export default Blackjack;
