export const getRatesData = async (base) => {
  let codeArray = [];
  availableCurrencies.forEach((currency) => {
    codeArray.push(currency.code);
  });
  //if (!codeArray.length) return getCachedRates();

  const availableCurrenciesCodeString = codeArray.join(",");
  try {
    const currencyStream = await fetch(
      `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${availableCurrenciesCodeString}`,
    );
    const currencyJson = await currencyStream.json();
    return currencyJson;
  } catch (err) {
    console.error(err.stack);
  }
};

export const storeExchangeData = (exchangeData) => {
  localStorage.setItem("myExchangeData", JSON.stringify(exchangeData));
};

export const getStoredExchangeData = () =>
  localStorage.getItem("myExchangeData");

export const getHistoricDataFromApi = async (base, quote, interval) => {
  let codeArray = [];
  availableCurrencies.forEach((currency) => {
    codeArray.push(currency.code);
  });

  const from = getFromDate(interval);
  const to = new Date().toLocaleDateString("sv-SE");
  console.log(from);
  try {
    const data = await fetch(
      `https://api.frankfurter.dev/v2/rates?to=${to}&quotes=${quote}&base=${base}&from=${from}`,
    );

    const dataJson = await data.json();
    return getHistoricData(dataJson, interval);
  } catch (err) {
    console.error(err.stack);
  }
};

const getFromDate = (interval) => {
  console.log(interval);
  const keyLookup = {
    "1D": {
      from: new Date(Date.now() - 604800000).toLocaleDateString("sv-SE"),
    },
    "1W": {
      from: new Date(Date.now() - 604800000).toLocaleDateString("sv-SE"),
    },

    "1M": {
      from: new Date(Date.now() - 2629800000).toLocaleDateString("sv-SE"),
    },

    "3M": {
      from: new Date(Date.now() - 7889400000).toLocaleDateString("sv-SE"),
    },

    "1Y": {
      from: new Date(Date.now() - 31557600000).toLocaleDateString("sv-SE"),
    },
    "5Y": {
      from: new Date(Date.now() - 157788000000).toLocaleDateString("sv-SE"),
    },
  };

  if (!keyLookup[interval]) return;
  return keyLookup[interval].from;
};

const getHistoricData = (apiData, interval) => {
  if (interval === "1D") apiData = apiData.slice(apiData.length - 2);
  const change =
    apiData.length < 2
      ? "-"
      : Number.parseFloat(
          (apiData[apiData.length - 1].rate - apiData[0].rate).toFixed(4),
        );

  const percentChange =
    apiData.length < 2
      ? "-"
      : Number.parseFloat(
          (
            ((apiData[apiData.length - 1].rate - apiData[0].rate) /
              apiData[0]) *
            100
          ).toFixed(4),
        );
  return {
    change: change,
    currentRate: apiData[apiData.length - 1].rate,
    percentChange: percentChange,
    open: apiData[0],
    last: apiData[apiData.length - 1],
  };
};

export const setRatesData = (ratesData) => {
  sessionStorage.setItem("myRates", JSON.stringify(ratesData));
};

export const getCachedRates = () => sessionStorage.getItem("myRates");

export const availableCurrencies = [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "KRW", name: "South Korean Won" },
  { code: "INR", name: "Indian Rupee" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "ZAR", name: "South African Rand" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "THB", name: "Thai Baht" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "COP", name: "Colombian Peso" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "TWD", name: "New Taiwan Dollar" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "RON", name: "Romanian Leu" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "QAR", name: "Qatari Riyal" },
  { code: "OMR", name: "Omani Rial" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "NPR", name: "Nepalese Rupee" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "PEN", name: "Peruvian Sol" },
  { code: "HNL", name: "Honduran Lempira" },
  { code: "HTG", name: "Haitian Gourde" },
  { code: "JOD", name: "Jordanian Dinar" },
  { code: "LBP", name: "Lebanese Pound" },
  { code: "RUB", name: "Russian Ruble" },
];

export const popularCurrencies = [
  { code: "USD", name: "United States Dollar" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "EUR", name: "Euro" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
];

export const convertCurrency = (rate, entryValue, inputType) => {
  const value = santizeNum(entryValue);
  if (isNaN(value)) return;
  return inputType === "send" ? value * rate : value / rate;
};

const santizeNum = (num) => {
  const regex = /[ ,]/g;
  const cleanNum = Number(num.replaceAll(regex, ""));
  if (!isNaN(cleanNum) && cleanNum !== "") return cleanNum;
};
export const otherCurrencies = availableCurrencies.filter((currency) => {
  return !popularCurrencies
    .map((currency) => currency.code)
    .includes(currency.code);
});

export const filterCurrencies = (entryText) => {
  const searchText = cleanText(entryText).toLowerCase();
  const filteredCurrencies = availableCurrencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchText) ||
      currency.name.toLowerCase().includes(searchText),
  );
  return {
    popular: filteredCurrencies.filter((currency) => {
      return popularCurrencies
        .map((currency) => currency.code)
        .includes(currency.code);
    }),

    other: filteredCurrencies.filter((currency) => {
      return !popularCurrencies
        .map((currency) => currency.code)
        .includes(currency.code);
    }),

    all: filteredCurrencies,
  };
};

const cleanText = (text) => {
  const regex = / {2,}/g;
  return text.replaceAll(regex, " ").trim();
};
