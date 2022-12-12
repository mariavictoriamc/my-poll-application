export interface UpdateDataState {
    question: string;
    answers: Answer[];
    chartAnswers: Answer[];
}

export interface Answer {
    id: number;
    text: string;
    voteNumber: number;
}
