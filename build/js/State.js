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
    const { log, favorite, interval, currentBase, currentQuote } = exchangeObj;
    if (log) this.#log = log;
    if (favorite) this.#favorite = favorite;
    if (interval) this.#interval = interval;
    if (currentBase) this.#currentBase = currentBase;
    if (currentQuote) this.#currentQuote = currentQuote;
  }
}

const removeItemFromArray = (array, itemId) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].getId() === itemId) {
      array.splice(i, 1);
      break;
    }
  }
};

export class FavPair {
  #base;
  #quote;
  #id;
  constructor() {
    this.#base;
    this.#quote;
    this.#id;
  }

  setFavPair(favPairObj) {
    const { base, quote, id } = favPairObj;
    this.#base = base;
    this.#quote = quote;
    this.#id = id;
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
}

export class LoggedConv {
  #base;
  #quote;
  #date;
  #send;
  #receive;
  #id;
  constructor() {
    this.#base = null;
    this.#quote = null;
    this.#date = null;
    this.#send = null;
    this.#receive = null;
    this.#id = null;
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
