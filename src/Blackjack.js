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
      currentHand: 0,
      isPlaying: false
    };

    this.dealerTurn = this.dealerTurn.bind(this);
    this.getNextCard = this.getNextCard.bind(this);
    this.generateHand = this.generateHand.bind(this);
    this.calculateHandWeight = this.calculateHandWeight.bind(this);
    this.createDeck = this.createDeck.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.deal = this.deal.bind(this);
    this.hit = this.hit.bind(this);
    this.split = this.split.bind(this);
    this.addBet = this.addBet.bind(this);
    this.stand = this.stand.bind(this);
  }
  componentDidMount() {
    this.addBet(50);
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
  split() {
    const newHand = {};
    const currentHand = this.getCurrentHand();

    newHand.cards = [
      currentHand.cards.pop(),
      this.getNextCard()
    ];

    currentHand.cards.push(this.getNextCard());

    // calc weight for each hand
    this.calculateHandWeight(currentHand);
    this.calculateHandWeight(newHand);

    this.setState({ playerHands: [...this.state.playerHands, newHand] });
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
    this.setState({ initialBet: this.state.initialBet + amount });
  }
  stand() {
    this.setState({ currentHand: this.state.currentHand + 1});

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
      this.setState({ currentHand: this.state.currentHand + 1})
      // this.dealerTurn();
    }

    if (this.state.currentHand === this.state.playerHands.length - 1) {
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
    const {
      playerHands,
      dealerHands,
      bank,
      initialBet,
      isPlaying,
      currentHand
    } = this.state;
    return (
      <div>
        <Panel
          bank={bank}
          addBet={this.addBet}
          bet={initialBet}
          isPlaying={isPlaying}
        />
        <Player hands={playerHands} currentHand={currentHand} />
        <Dealer hands={dealerHands} />
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
