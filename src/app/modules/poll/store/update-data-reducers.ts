import { Action, createReducer, on } from '@ngrx/store';
import { UpdateDataState } from '../interfaces/update-data-state';
import { questionMaded, questionMadedSuccess, answerMaded, answerMadedSuccess, reset, resetSuccess, removeAnswer, removeAnswerSuccess, voteAnswerSuccess, voteAnswer } from './update-data-actions';

const INITIAL_STATE: UpdateDataState = {
    question: '',
    answers: []
}

const reducerUpdateData = createReducer(INITIAL_STATE,
    on(questionMaded, (state) => {
        return {
            ...state
        }
    }),
    on(questionMadedSuccess, (state, action) => {
        return {
            ...state,
            question: action?.data
        }
    }),
    on(answerMaded, (state) => {
        return {
            ...state
        }
    }),
    on(answerMadedSuccess, (state, action) => {
        return {
            ...state,
            answers: [...state?.answers, action?.data]
        }
    }),
    on(removeAnswer, (state) => {
        return {
            ...state
        }
    }),
    on(removeAnswerSuccess, (state, action) => {
        const index = state.answers.findIndex(answer => answer?.id === action?.data);
        let newAnswers = [...state?.answers];
        newAnswers.splice(index,1);
        return {
            ...state,
            answers: newAnswers
        }
    }),
    on(reset, (state) => {
        return {
            ...state
        }
    }),
    on(resetSuccess, (state) => {
        return {
            ...state,
            ...INITIAL_STATE
        }
    }),
    on(voteAnswer, (state) => {
        return {
            ...state
        }
    }),
    on(voteAnswerSuccess, (state, action) => {
        return {
            ...state,
            answers: [...state?.answers, action?.data]
        }
    })
)

export function updateDataReducer(state: UpdateDataState = INITIAL_STATE, action: Action) {
    return reducerUpdateData(state, action);
}
