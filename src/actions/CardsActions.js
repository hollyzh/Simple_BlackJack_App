import AppDispatcher from '../AppDispatcher';

const CardsActions = {
  createNewGame(cards) {
    AppDispatcher.dispatch ({
      type: 'CREATE_NEW_GAME',
      payload: { cards }
    })
  },
  stand(standCards) {
    AppDispatcher.dispatch ({
      type: 'STAND',
      payload: { standCards }
    })
  },
  hit(hitCards) {
    AppDispatcher.dispatch ({
      type: 'HIT',
      payload: { hitCards }
    })
  }
}

export default CardsActions;
