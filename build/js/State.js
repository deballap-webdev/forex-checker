export class ExchangeData {
  #currentBase;
  #currentQuote;
  #favorite;
  #log;
  #interval;
  constructor() {
    this.#currentBase = { code: "USD", name: "United States Dollar" };
    this.#currentQuote = { code: "EUR", name: "Euro" };
    this.#favorite = [];
    this.#interval = "1M";
    this.#log = [];
  }

  getCurrentBase() {
    return this.#currentBase;
  }

  getCurrentQuote() {
    return this.#currentQuote;
  }

  getFavorite() {
    return this.#favorite;
  }

  getInterval() {
    return this.#interval;
  }

  getLog() {
    return this.#log;
  }

  clearLog() {
    const log = this.#log;
    log.splice(0, log.length);
  }

  clearFavorite() {
    const favorite = this.#favorite;
    favorite.splice(0, favorite.length);
  }

  removePairFromFavorite(pairId) {
    const favorite = this.#favorite;
    removeItemFromArray(favorite, pairId);
  }

  addConvToLog(conv) {
    const log = this.#log;
    log.push(conv);
  }

  addPairToFavorite(pair) {
    const favorite = this.#favorite;
    favorite.push(pair);
  }

  removeConvFromLog(logId) {
    const log = this.#log;
    removeItemFromArray(log, logId);
  }

  setExhangeData(exchangeObj) {
    const { interval, currentBase, currentQuote } = exchangeObj;
    if (interval) this.#interval = interval;
    if (currentBase) this.#currentBase = currentBase;
    if (currentQuote) this.#currentQuote = currentQuote;
  }

  toJSON() {
    return {
      favorite: this.#favorite.map((fav) => fav.toJSON()),
      log: this.#log.map((log) => log.toJSON()),
      currentBase: this.#currentBase,
      currentQuote: this.#currentQuote,
      interval: this.#interval,
    };
  }
}

const removeItemFromArray = (array, itemId) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].getId() == itemId) {
      array.splice(i, 1);
      break;
    }
  }
};

export class FavPair {
  #base;
  #quote;
  #id;
  #rate;
  #change;
  constructor() {
    this.#base;
    this.#quote;
    this.#id;
    this.#rate;
    this.#change;
  }

  toJSON() {
    return {
      base: this.#base,
      quote: this.#quote,
      id: this.#id,
      rate: this.#rate,
      change: this.#change,
    };
  }

  setFavPair(favPairObj) {
    const { base, quote, id, rate, change } = favPairObj;
    if (base) this.#base = base;
    if (quote) this.#quote = quote;
    if (id) this.#id = id;
    if (rate) this.#rate = rate;
    if (change || change === 0) this.#change = change;
  }

  getBase() {
    return this.#base;
  }

  getId() {
    return this.#id;
  }

  getQuote() {
    return this.#quote;
  }

  getRate() {
    return this.#rate;
  }
  getChange() {
    return this.#change;
  }
}

export class LoggedConv {
  #base;
  #quote;
  #date;
  #send;
  #receive;
  #id;
  constructor() {
    this.#base;
    this.#quote;
    this.#date;
    this.#send;
    this.#receive;
    this.#id;
  }

  toJSON() {
    return {
      base: this.#base,
      quote: this.#quote,
      date: this.#date,
      send: this.#send,
      receive: this.#receive,
      id: this.#id,
    };
  }

  getBase() {
    return this.#base;
  }

  getQuote() {
    return this.#quote;
  }

  getDate() {
    return this.#date;
  }

  getSendAmount() {
    return this.#send;
  }

  getReceiveAmount() {
    return this.#receive;
  }

  getId() {
    return this.#id;
  }

  setLoggedConv(convObj) {
    const { base, quote, date, send, receive, id } = convObj;
    this.#base = base;
    this.#date = date;
    this.#quote = quote;
    this.#receive = receive;
    this.#send = send;
    this.#id = id;
  }
}

export class AppState {
  #activeSection;
  #error;
  constructor() {
    this.#activeSection = "HISTORY";
    this.#error;
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
