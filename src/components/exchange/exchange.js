import React, {useState, useEffect, Fragment} from 'react';
import Select from "react-select";
import {useForm} from "react-hook-form";
import "./exchange.css";
import {baseCurrency, currencyList, currencySymbolList} from "../../configs/baseConfigs";
import {getAMDForAllCurrencies, getCurrency} from "../../actions/actions";
import {round} from "../../configs/helpers";
import {useTranslation} from 'react-i18next';

const Exchange = () => {
    const {t} = useTranslation();
    const optionsList = [baseCurrency, ...currencyList];
    const [baseCurrencyForUnit, setBaseCurrencyForUnit] = useState([]);
    const [activeCurrency, setActiveCurrency] = useState([]);
    const [giveCurrency, setGiveCurrency] = useState(optionsList[0]);
    const [AMDConverter, setAMDConverter] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const symbols = currencyList.map(currency => currency.value);

    const validationOptions = {
        required: {
            value: true,
            message: `Value is required.`
        },
        pattern: /\d+/,
        min: {
            value: giveCurrency.value === "AMD" ? 99 : 1,
            message: `The value must be greater than ${giveCurrency.value === "AMD" ? '99' : '1'}.`
        },
        maxLength: {
            value: 10,
            message: `The value must be no more than 10 characters.`
        },
        minLength: {
            value: giveCurrency.value === "AMD" ? 3 : 1,
            message: `The value must be at least ${giveCurrency.value === "AMD" ? '3' : '1'} characters.`
        }
    };

    useEffect(() => {
        getCurrency(giveCurrency.value, symbols, 10000)
            .then(res => {
                setActiveCurrency(res.rates);
            })
        getAMDForAllCurrencies().then(res => {
            const data = [];
            res.forEach((itm) => {
                data.push({base: itm.data.base, value: itm.data.rates[baseCurrency.value]});
            })
            setBaseCurrencyForUnit(data)
        })
    }, [])

    const onSubmit = (data) => {
        if (giveCurrency.value === 'AMD') {
            setAMDConverter(false);
            getCurrency(giveCurrency.value, symbols, data.currencyValue)
                .then(res => {
                    setActiveCurrency(res.rates);
                })
        } else {
            setAMDConverter(true);
            getCurrency(giveCurrency.value, ["AMD"], data.currencyValue)
                .then(res => {
                    setActiveCurrency(res.rates);
                })
        }
    };

    useEffect(() => {
        console.log("DEPLOYED")
    }, [])

    return (
        <div className='homeBannerExchange'>
            <form onSubmit={handleSubmit(onSubmit)} className='inputWrapper'>
                <label>
                    <span>{t('iHave')}</span>
                    <input defaultValue='10000' type="number" {...register('currencyValue', validationOptions)}/>
                </label>
                <Select
                    className={'selectInput'}
                    defaultValue={giveCurrency}
                    onChange={setGiveCurrency}
                    options={optionsList}
                    isSearchable={false}
                />
                <button className='fw-700'>
                    {t("convert")}
                </button>
            </form>
            <div className='errorMessage'>
                {errors.currencyValue && <p>{errors.currencyValue.message}</p>}
            </div>
            <div className='result'>
                <p className='resultLabel w-100'>{t("iGet")}</p>
                {AMDConverter
                    ?
                    <div className='resultTable'>
                        <div className='resultTableItem'>
                            <p className='fw-700'>AMD</p>
                            {activeCurrency["AMD"] &&
                                <p className='resultTableItemValue'>{round(activeCurrency['AMD'])}</p>}
                        </div>
                    </div>
                    :
                    <Fragment>
                        <div className='resultTable'>
                            {currencyList.map(currency =>
                                <div className='resultTableItem' key={currency.label + activeCurrency[currency.value]}>
                                    <p className='fw-700'>{currency.label}</p>
                                    {activeCurrency[currency.value] &&
                                        <p className='resultTableItemValue'>{round(activeCurrency[currency.value])}</p>}
                                </div>
                            )}
                        </div>
                        <div className='resultTableUnit'>
                            {baseCurrencyForUnit.map((currency, i) =>
                                <p key={i}>{round(currency.value)} AMD {t("for")} 1 {currencySymbolList[currency.base]}</p>
                            )}
                        </div>
                    </Fragment>
                }
            </div>
        </div>
    );
};

export default Exchange;
