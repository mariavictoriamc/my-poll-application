import { Action, createReducer, on } from '@ngrx/store';
import { ChartAnswersState } from '../../interfaces/chart-answers-state';
import { addLabelChart, addLabelChartSuccess, clearChart, clearChartSuccess } from './chart-answers-actions';

const INITIAL_STATE: ChartAnswersState = {
    labels: ''
}

const reducerChartAnswers = createReducer(INITIAL_STATE,
    on(addLabelChart, (state) => {
        return {
            ...state
        }
    }),   
    on(addLabelChartSuccess, (state, action) => {
        return {
            ...state,
            labels: action?.data
        }
    }),
    on(clearChart, (state) => {
        return {
            ...state
        }
    }),   
    on(clearChartSuccess, (state) => {
        return {
            ...state,
            ...INITIAL_STATE
        }
    })
)

export function chartAnswersReducer(state: ChartAnswersState = INITIAL_STATE, action: Action) {
    return reducerChartAnswers(state, action);
}
