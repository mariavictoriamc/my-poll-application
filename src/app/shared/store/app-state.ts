import { UpdateDataState } from "src/app/modules/poll/interfaces/update-data-state";
import { ChartAnswersState } from "src/app/modules/poll/interfaces/chart-answers-state";

export interface AppState {
    updateData: UpdateDataState;
    chartAnswers: ChartAnswersState;
}
