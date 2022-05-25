import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, of } from "rxjs";
import { questionMaded, questionMadedSuccess, answerMaded, answerMadedSuccess, reset, resetSuccess, removeAnswer, removeAnswerSuccess, voteAnswer, voteAnswerSuccess } from "./update-data-actions";

@Injectable()
export class UpdateDataEffects {

    constructor(
        private actions$: Actions
    ) {}

    questionMaded$ = createEffect(() => this.actions$.pipe(
        ofType(questionMaded),
        mergeMap(action => {
            const data = action?.data;
            return of(questionMadedSuccess({data}));
        })
    ))

    answerMaded$ = createEffect(() => this.actions$.pipe(
        ofType(answerMaded),
        mergeMap(action => {
            const data = action?.data;
            return of(answerMadedSuccess({data}));
        })
    ))

    removeAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(removeAnswer),
        mergeMap(action => {
            const data = action;
            return of(removeAnswerSuccess({data}));
        })
    ))

    reset$ = createEffect(() => this.actions$.pipe(
        ofType(reset),
        mergeMap(() => {
            return of(resetSuccess());
        })
    ))

    voteAnswer$ = createEffect(() => this.actions$.pipe(
        ofType(voteAnswer),
        mergeMap(action => {
            const data = action?.data;
            return of(voteAnswerSuccess({data}));
        })
    ))

}
