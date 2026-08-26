export class ExchangeData {
  #currentBase;
  #currentQuote;
  #favourite;
  #log;
  #interval;
  constructor() {
    this.#currentBase = "USD";
    this.#currentQuote = "EUR";
    this.#favorite = [];
    this.#interval = "1M";
    this.#log = [];
  }
}

export class FavPair {
  constructor() {
    this.base = null;
    this.quote = null;
  }
}

export class LoggedConv {
  constructor() {
    this.base = null;
    this.quote = null;
    this.date = null;
    this.send = null;
    this.receive = null;
  }
}

export class AppState {
  #activeSection;
  #error;
  constructor() {
    this.#activeSection = "HISTORY";
    this.#error = null;
  }

  getActiveSection() {
    return this.#activeSection;
  }

  getError() {
    return this.#error;
  }

  setAppState(appStateObj) {
    const { activeSection, error } = appStateObj;
    if (activeSection) this.#activeSection = activeSection;
    if (error) this.#error = error;
  }
}
