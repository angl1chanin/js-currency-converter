const converterBtn = document.querySelector('.currency-converter__btn');
const valueFromInput = document.getElementById(
    'currency-converter__value-from'
);

let VALUE_FROM = 0;
let CONVERTED_VALUE = 0;

function convert() {
    const choosenCurrencies = document.querySelectorAll(
        '#dropdown__current-currency'
    );
    const currencyFrom = choosenCurrencies[0].getAttribute('data-currency');
    const currencyTo = choosenCurrencies[1].getAttribute('data-currency');
    const currenciesObj = currencies.currencies;
    let exchangeRate = 0;

    if (currencyFrom === currencies.baseCurrency) {
        exchangeRate = currenciesObj[currencyTo]['rate'];
        CONVERTED_VALUE = VALUE_FROM / exchangeRate;
    } else if (currencyTo === currencies.baseCurrency) {
        exchangeRate = currenciesObj[currencyFrom]['rate'];
        CONVERTED_VALUE = VALUE_FROM * exchangeRate;
    } else {
        exchangeRateFrom = currenciesObj[currencyFrom]['rate'];
        exchangeRateTo = currenciesObj[currencyTo]['rate'];
        CONVERTED_VALUE = (VALUE_FROM * exchangeRateFrom) / exchangeRateTo;
    }
}

function displayCnvertedValue() {
    let convertToField = document.querySelector('.currency-converter__gets');
    let convertToInput = convertToField.querySelector(
        '.currency-converter__input'
    );

    convertToInput.setAttribute('value', CONVERTED_VALUE.toFixed(2));
}

function updateConvertValue(event) {
    VALUE_FROM = event.target.value;
}

converterBtn.addEventListener('click', () => {
    convert();
    displayCnvertedValue();
});

valueFromInput.addEventListener('input', (event) => {
    updateConvertValue(event);
});
