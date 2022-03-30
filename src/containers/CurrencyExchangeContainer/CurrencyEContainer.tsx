import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import { CurrencyState, CurrencyType } from '../../redux/currencyReducer';
import { Dispatch } from 'redux';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    CurrencyReducersTypes, ChangeCurrentCurrencyAC
} from '../../redux/actions';
import { connect, ConnectedProps } from 'react-redux';

const CurrencyEContainer: React.FC<TProps> = props => { //это контейнерная компонента

    const {
        currencies,
        currentCurrency,
        isBuying,
        amountOfBYN,
        amountOfCurrency,
        setCurrencyAmount,
        setAction,
        changeCurrency,
    } = props;

    let currencyRate: number = 0;
    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return; //проверка на то чтобы пользователь вводил только числа и не вводил с числами буквы
        //проверка на number не подхлдит.тк у него есть пару букв математических констант.
        if (e.currentTarget.dataset.currency) { //тайпскрипт ничего не знает о dataset поэтому делаем проверку
            const trigger: string = e.currentTarget.dataset.currency;//если тру, выполняем ниже код
            if (trigger === 'byn') {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)); //+ чтоб конечный результат метода был приведен к числу
                    //тк метод toFixed возращает строку
                }
            } else {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => { //проверка на датасет
        e.currentTarget.dataset.action === 'buy' ? setAction(true) : setAction(false);
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && changeCurrency(e.currentTarget.dataset.currency);
    };

    return (
        <React.Fragment>
            <CurrencyExchange //внутри нее презентационная
                currenciesName={currenciesName}
                currentCurrency={currentCurrency}
                currencyRate={currencyRate}
                isBuying={isBuying}
                amountOfBYN={amountOfBYN}
                amountOfCurrency={amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};

const mapStateToProps = ( { currency } : {currency: CurrencyState} ): CurrencyState => {
    return {
        currencies: currency.currencies,
        currentCurrency: currency.currentCurrency,
        isBuying: currency.isBuying,
        amountOfBYN: currency.amountOfBYN,
        amountOfCurrency: currency.amountOfCurrency,
    };
};

// @ts-ignore
const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) : any => {
    return {
        setCurrencyAmount(amountOfBYN: string, amountOfCurrency: string) {
            dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
        },
        setAction(isBuying: boolean) {
            dispatch(ChangeActionAC(isBuying));
        },
        changeCurrency(currency: string) {
            dispatch(ChangeCurrentCurrencyAC(currency));
        },
    };
};

// @ts-ignore
const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>; //автоматическая типизация всех пропсов в компоненте

export default connector(CurrencyEContainer); //подключение презентационной компоненты

