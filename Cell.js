
class Cell {
  constructor(currentState)
  {
    this.currentState = currentState;
  }

  update() {
    this.currentState = this.nextState;
  }

  setNextState(nextState) {
    this.nextState = nextState;
  }

  currentState() {
    return this.currentState;
  }
}
