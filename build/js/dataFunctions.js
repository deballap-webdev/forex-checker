const fetchCurrencyData = async () => {
  const currencyStream = await fetch(
    "https://api.frankfurter.dev/v2/rates?base=USD&quotes=USD,EUR,GBP,JPY,AUD,CAD,CHF,CNY,NZD,HKD,SGD,SEK,NOK,DKK,KRW,INR,BRL,ZAR,MXN,IDR,TRY,SAR,AED,THB,MYR,PHP,PLN,ILS,ARS,CLP,COP,EGP,NGN,PKR,VND,TWD,CZK,HUF,RON,BGN,ISK,HRK,UAH,KWD,QAR,OMR,BHD,KZT,MAD,PEN,UYU,CRC,JOD,LBP,RUB",
  );
  const currencyJson = await currencyStream.json();
  return currencyJson;
};
