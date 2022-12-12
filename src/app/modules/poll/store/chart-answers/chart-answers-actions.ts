import { createAction, props } from '@ngrx/store';

export const ADD_LABEL_CHART = 'ADD_LABEL_CHART';
export const ADD_LABEL_CHART_SUCCESS = 'ADD_LABEL_CHART_SUCCESS';

export const CLEAR_CHART = 'CLEAR_CHART';
export const CLEAR_CHART_SUCCESS = 'CLEAR_CHART_SUCCESS';

export const addLabelChart = createAction(
    ADD_LABEL_CHART,
    props<{ data: string }>()
);

export const addLabelChartSuccess = createAction(
    ADD_LABEL_CHART_SUCCESS,
    props<{ data: any }>()
);

export const clearChart = createAction(
    CLEAR_CHART
);

export const clearChartSuccess = createAction(
    CLEAR_CHART_SUCCESS
);
