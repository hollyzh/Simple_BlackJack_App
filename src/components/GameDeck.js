import React, { Component } from 'react';

export default class GameDeck extends Component {

  scoreHand(cards){
    let { scoreEnable } = this.props;
    if (!scoreEnable) {
      document.getElementById('dealerScore').style.visibility = "hidden";
    } else {
      document.getElementById('dealerScore').style.visibility = "visible";
    }

    let aces = 0;
    let score = cards.reduce((sum, card) => {
      if ( card[0] === 1 ) {
        aces++;
        return sum + 11;
      } else {
        return sum + card[0];
      }
    }, 0);

    while ( score > 21 && aces ) {
      score -= 10;
      aces--;
    }
    return score;
  }

  displayCards(cards) {
    let CardsImg, cardName;
    return cards.map((card, index) => {
      cardName = card[1];
      return <span key={ index }><img src={`https://raw.githubusercontent.com/marsholly/Blackjack_Flux/master/CardImgs/${cardName}.png`} width="150" height="200"/>&nbsp;&nbsp;&nbsp;</span>;
    });
  }

  displayDealerCards(cards) {
    let CardsImg, cardName;
    let { scoreEnable } = this.props;

    if(scoreEnable){
      return cards.map((card, index) => {
        cardName = card[1];
        return <span key={ index }><img src={`https://raw.githubusercontent.com/marsholly/Blackjack_Flux/master/CardImgs/${cardName}.png`} width="150" height="200"/>&nbsp;&nbsp;&nbsp;</span>;
      });
    } else {
      let secondCard = cards[1];
      cardName = secondCard[1];
      return (
        <span>
          <span key='1'><img src='https://raw.githubusercontent.com/marsholly/Blackjack_Flux/master/CardImgs/cardback.png' width="150" height="200"/>&nbsp;&nbsp;&nbsp;</span>
          <span key='2'><img src={`https://raw.githubusercontent.com/marsholly/Blackjack_Flux/master/CardImgs/${cardName}.png`} width="150" height="200"/>&nbsp;&nbsp;&nbsp;</span>
        </span>
      )
    }
  }

  render() {
    let { cards } = this.props;
    let  dealerCardsArr, playerCardsArr, dealerCardsImg, playerCardsImg, dealerScore = 0, playerScore = 0;
    let scores = { dealerScore: 0, playerScore: 0 };

    if ( Object.keys(cards).length !== 0) {
      dealerCardsArr = cards.dealerCards;
      playerCardsArr = cards.playerCards;

      dealerCardsImg = this.displayDealerCards(dealerCardsArr);
      playerCardsImg = this.displayCards(playerCardsArr);

      dealerScore = this.scoreHand(dealerCardsArr);
      playerScore = this.scoreHand(playerCardsArr);

    } else {
      dealerCardsImg = <div></div>;
      playerCardsImg = <div></div>;
    }

    return (
      <div>
        <h3>Dealer :<span id='dealerScore'> { dealerScore } </span></h3>
        <div className="row">
          <span className='cardsArea'> { dealerCardsImg } </span>
        </div>
        <h3>Player :  {playerScore}</h3>
        <div className="row">
          <span className='cardsArea'> { playerCardsImg } </span>
        </div>
      </div>
    )
  }
};
