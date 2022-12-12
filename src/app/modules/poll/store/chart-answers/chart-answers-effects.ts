import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, of } from "rxjs";
import { addLabelChart, addLabelChartSuccess, clearChart, clearChartSuccess } from "./chart-answers-actions";

@Injectable()
export class ChartAnswersEffects {

    constructor(private actions$: Actions) {}

    addLabelChart$ = createEffect(() => this.actions$.pipe(
        ofType(addLabelChart),
        mergeMap(action => {
            const data = action?.data;
            return of(addLabelChartSuccess({data}));
        })
    ))

    clearChart$ = createEffect(() => this.actions$.pipe(
        ofType(clearChart),
        mergeMap(() => {
            return of(clearChartSuccess());
        })
    ))

}
