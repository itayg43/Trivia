import {RootState} from '../store';

export const selectStatus = (state: RootState) => state.questionsState.status;

export const selectErrorMessage = (state: RootState) =>
  state.questionsState.errorMessage;

export const selectCurrentQuestionIndex = (state: RootState) =>
  state.questionsState.currentQuestionIndex;

export const selectIsAnswerSelected = (state: RootState) =>
  state.questionsState.isAnswerSelected;

export const selectSelectedAnswer = (state: RootState) =>
  state.questionsState.selectedAnswer;

export const selectIsGameEnded = (state: RootState) =>
  state.questionsState.isGameEnded;

export const selectCorrectAnswersCount = (state: RootState) =>
  state.questionsState.correctAnswersCount;

export const selectQuestions = (state: RootState) =>
  state.questionsState.questions;

export const selectQuestionsCount = (state: RootState) =>
  state.questionsState.questionsCount;
