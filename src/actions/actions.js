import axios from "axios";
import {baseCurrency, currencyList} from "../configs/baseConfigs";

const getCurrency = (base = "AMD", symbols = ["USD", "EUR", "GBP", "CHF"], amount) => {
    const symbolsString = `&symbols=${symbols.join(',')}`;
    const amountString = amount ? `&amount=${amount}` : '';
    return axios.get(`https://api.exchangerate.host/latest?base=${base}${symbolsString}${amountString}`)
        .then(res => res.data);
}

const getAMDForAllCurrencies = () => {
    const APIList = currencyList.map((currency) =>
        `https://api.exchangerate.host/latest?base=${currency.value}&symbols=${baseCurrency.value}&amount=1`
    );
    return axios.all(APIList.map((api) => axios.get(api))).then(axios.spread((...responses) => {
        return responses;
    })).catch(errors => {
        console.log(errors);
    })
}

export {getCurrency, getAMDForAllCurrencies};
