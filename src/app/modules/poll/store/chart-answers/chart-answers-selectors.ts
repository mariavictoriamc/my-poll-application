import { createSelector   } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { ChartAnswersState } from '../../interfaces/chart-answers-state';

export const getChartAnswersState = (state: AppState) => state?.chartAnswers;
export const getLabels = createSelector(getChartAnswersState, (state: ChartAnswersState) => state?.labels);
