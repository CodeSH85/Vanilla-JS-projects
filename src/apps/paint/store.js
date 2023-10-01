
const initValue = {
  steps: []
}

class Store {
  #state = {
    steps: []
  }
  constructor() {

  }

  get history() {
    return 'ddd';
  }

  #getState() {
    return this.#state;
  }


  #setState(stateOrFn) {
    const prevState = this.#getState()

    let newState;
    switch (typeof stateOrFn) {
      case 'Function':
        newState = stateOrFn(prevState);
        break;
      case 'object':
        newState = stateOrFn;
        break;
      default:
        throw new Error('Invalid state.');
        break;
    }
    this.#state = newState;
  }
}

export default Store