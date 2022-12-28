import React from "react";

export default function CurrencyApp(props) {
  const {
    currencyOptions,
    selectCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <>
      {currencyOptions && (
        <div>
          <input
            type="text"
            className="question"
            value={amount}
            onChange={onChangeAmount}
          />
          <select value={selectCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
