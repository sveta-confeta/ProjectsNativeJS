import {ACTIONS_TYPE, CurrencyReducersTypes} from './actions';
import {useSelector} from "react-redux";
import {RootState} from "./state";


export type CurrencyType = {
    currencyName: string;
    buyRate: number;
    sellRate: number;
};
export type CurrencyState = {
    currencies: Array<CurrencyType>;
    currentCurrency: string;
    isBuying: boolean;
    amountOfBYN: string;
    amountOfCurrency: string;
};

const initialState: CurrencyState = {
    currencies: [
        {
            currencyName: 'USD',
            buyRate: 2.62,
            sellRate: 2.58,
        },
        {
            currencyName: 'EUR',
            buyRate: 3.1,
            sellRate: 3.06,
        },
        {
            currencyName: 'RUR',
            buyRate: 0.0345,
            sellRate: 0.0341,
        },
    ],
    currentCurrency: 'USD',
    isBuying: true,
    amountOfBYN: '',
    amountOfCurrency: '',
};

export const currencyReducer = (state: CurrencyState = initialState, action: CurrencyReducersTypes): CurrencyState => {
    // @ts-ignore
    switch (action.type) {
        case  ACTIONS_TYPE.CHANGE_CURRENCY_FIELD_TYPE:{
            return {...state,...action.payload,} //,...action.payload элеметы внутри пэйлоад автоматически обновят стейт
        }
        case ACTIONS_TYPE.CHANGE_CHANGE_ACTION:
        case ACTIONS_TYPE.CHANGE_CURRENT_CURRENCY: //если кейсы одинаковые то мы можем их обьединить
            return {...state,...action.payload,
                //зануляем, чтобы не было проблем с пересчетом
                amountOfBYN: '',
                amountOfCurrency: '',
            }


        default:
            return state;
    }
};

export const selectorCurrencies=(store:RootState)=> store.currency
    //в это место мы можем вставить проверку на фильтрацию и нам придет уже отфильтрованнный стейт:
// export const selectorCurrencies=(store:RootState)=> store.currency.currencies.filter();

