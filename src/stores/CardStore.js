import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

let _cards = {};

class CardStore extends EventEmitter {
  constructor(props) {
    super(props);

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'CREATE_NEW_GAME':
          let { cards } = action.payload;
          _cards = cards;
          this.emit('CHANGE');
          break;
        case 'STAND':
          let { standCards } = action.payload;
          _cards = standCards;
          this.emit('CHANGE');
          break;
        case 'HIT':
          let { hitCards } = action.payload;
          _cards = hitCards;
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAll() {
    return _cards;
  }
}

export default new CardStore();
