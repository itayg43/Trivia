import {RootState} from '../store';

export const selectStatus = (state: RootState) => state.questionsState.status;

export const selectErrorMessage = (state: RootState) =>
  state.questionsState.errorMessage;

export const selectCurrentQuestionIndex = (state: RootState) =>
  state.questionsState.currentQuestionIndex;

export const selectQuestions = (state: RootState) =>
  state.questionsState.questions;
