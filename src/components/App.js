import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';
import GameDeck from './GameDeck';
import OperatingArea from './OperatingArea';
import CardsActions from '../actions/CardsActions';
import CardStore from '../stores/CardStore';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
      scoreEnable: false
    };

    this.startGame = this.startGame.bind(this);
    this._onChange = this._onChange.bind(this);
    this.dealerScoreVisible = this.dealerScoreVisible.bind(this);
    this.clearDeck = this.clearDeck.bind(this);
  }

  componentWillMount() {
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      cards: CardStore.getAll()
    })
  }

  startGame(beginningCards) {
    CardsActions.createNewGame(beginningCards);
  }

  dealerScoreVisible(){
    this.setState({ scoreEnable: true });
  }

  clearDeck(){
    this.setState({ scoreEnable: false });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container">
          <h1 className="text-center">Blackjack</h1>
          <div className="row">
            <div className="col-md-11">
              <GameDeck cards={this.state.cards} scoreEnable={this.state.scoreEnable}/>
            </div>
            <div className="col-md-1">
              <OperatingArea startGame={this.startGame} cards={this.state.cards} dealerScoreVisible={this.dealerScoreVisible} clearDeck={this.clearDeck}/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
};
