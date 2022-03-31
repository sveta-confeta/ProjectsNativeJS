import React, {Dispatch} from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {CurrencyType, selectorCurrencies} from '../../redux/currencyReducer';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    ChangeCurrentCurrencyAC, CurrencyReducersTypes,
} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

export const CurrencyEContainer=() => { //это контейнерная компонента

    // const {
    //     currencies,
    //     currentCurrency,
    //     isBuying,
    //     amountOfBYN,
    //     amountOfCurrency,
    //     setCurrencyAmount,
    //     setAction,
    //     changeCurrency,
    // } = props;

    const {
        currencies,    //useSelector достает все данные которые нам нужны и приложение работает норм
        currentCurrency,
        isBuying,
        amountOfBYN,
        amountOfCurrency,
    } = useSelector(selectorCurrencies) //selectorCurrencies-из редьюсера извлеченная часть стейта или весь стейт


    const dispatch=useDispatch <Dispatch<CurrencyReducersTypes>>();

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
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    dispatch(ChangeCurrencyFieldAC(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2))); //+ чтоб конечный результат метода был приведен к числу
                    //тк метод toFixed возращает строку
                }
            } else {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value));
                } else {
                    dispatch(ChangeCurrencyFieldAC((+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => { //проверка на датасет
        e.currentTarget.dataset.action === 'buy' ? dispatch(ChangeActionAC(true)) : dispatch(ChangeActionAC(false));
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && dispatch(ChangeCurrentCurrencyAC(e.currentTarget.dataset.currency));
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
//будем переводить стейт на useSelector:
// const mapStateToProps = ( { currency } : {currency: CurrencyState} ): CurrencyState => { //сдесь мы достаем ветку из стейта
//     return {
//         currencies: currency.currencies,
//         currentCurrency: currency.currentCurrency,
//         isBuying: currency.isBuying,
//         amountOfBYN: currency.amountOfBYN,
//         amountOfCurrency: currency.amountOfCurrency,
//     };
// };


// const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) : any => { //будем переводить стейт на useDispatch
//     return {
//         setCurrencyAmount(amountOfBYN: string, amountOfCurrency: string) {
//             dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
//         },
//         setAction(isBuying: boolean) {
//             dispatch(ChangeActionAC(isBuying));
//         },
//         changeCurrency(currency: string) {
//             dispatch(ChangeCurrentCurrencyAC(currency));
//         },
//     };
// };


// const connector = connect(mapStateToProps, mapDispatchToProps);
// const connector = connect(mapStateToProps, {});

// type TProps = ConnectedProps<typeof connector>; //автоматическая типизация всех пропсов в компоненте
//
// export default connector(CurrencyEContainer); //подключение презентационной компоненты

