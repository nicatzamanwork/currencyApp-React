import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";
import CurrencyApp from "./components/CurrencyApp";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]);
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchageRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  useEffect(() => {
    fetch(
      "https://api.freecurrencyapi.com/v1/latest?apikey=H7U6ZG39DBPyq7QUKMjyFka6mquhmq70C97x9qtH"
    )
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.data)[0];
        setFromCurrency(data.data);
        setToCurrency(firstCurrency);
        setExchageRate(data.data[firstCurrency]);
        setCurrencyOptions(Object.keys(data.data));
      });
  }, []);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <div className="converter_holder">
      <h1>Convert</h1>
      <CurrencyApp
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div>=</div>
      <CurrencyApp
        currencyOptions={currencyOptions}
        selectCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default App;
