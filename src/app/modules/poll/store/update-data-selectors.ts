import { createSelector   } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { UpdateDataState } from '../interfaces/update-data-state';

export const getUpdateDataState = (state: AppState) => state?.updateData;
export const getQuestion = createSelector(getUpdateDataState, (state: UpdateDataState) => state?.question);
export const getAnswers = createSelector(getUpdateDataState, (state: UpdateDataState) => state?.answers);
