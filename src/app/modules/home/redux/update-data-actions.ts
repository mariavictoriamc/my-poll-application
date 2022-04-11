import { createAction, props } from '@ngrx/store';

export const QUESTION_MADED = 'QUESTION_MADED';
export const QUESTION_MADED_SUCCESS = 'QUESTION_MADED_SUCCESS';

export const ANSWER_MADED = 'ANSWER_MADED';
export const ANSWER_MADED_SUCCESS = 'ANSWER_MADED_SUCCESS';

export const REMOVE_ANSWER = 'REMOVE_ANSWER';
export const REMOVE_ANSWER_SUCCESS = 'REMOVE_ANSWER_SUCCESS';

export const RESET = 'RESET';
export const RESET_SUCCESS = 'RESET_SUCCESS';

export const VOTE_ANSWER = 'VOTE_ANSWER';
export const VOTE_ANSWER_SUCCESS = 'VOTE_ANSWER_SUCCESS';

export const questionMaded = createAction(
    QUESTION_MADED,
    props<{ data: string }>()
);

export const questionMadedSuccess = createAction(
    QUESTION_MADED_SUCCESS,
    props<{ data: any }>()
);

export const answerMaded = createAction(
    ANSWER_MADED,
    props<{ data: any }>()
);

export const answerMadedSuccess = createAction(
    ANSWER_MADED_SUCCESS,
    props<{ data: any }>()
);

export const removeAnswer = createAction(
    REMOVE_ANSWER,
    props<{index: number}>()
);

export const removeAnswerSuccess = createAction(
    REMOVE_ANSWER_SUCCESS,
    props<{ data: any }>()
);

export const reset = createAction(
    RESET
);

export const resetSuccess = createAction(
    RESET_SUCCESS
);

export const voteAnswer = createAction(
    VOTE_ANSWER,
    props<{ data: any }>()
);

export const voteAnswerSuccess = createAction(
    VOTE_ANSWER_SUCCESS,
    props<{ data: any }>()
);
