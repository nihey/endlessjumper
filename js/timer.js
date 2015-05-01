export default class Timer {
  constructor() {
    this.time = new Date();
  }

  elapsed() {
    return new Date().getTime() - this.time.getTime();
  }

  reset() {
    this.time = new Date();
  }
}
