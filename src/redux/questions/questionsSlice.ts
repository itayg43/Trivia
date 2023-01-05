import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Status} from '../../helpers/enums';
import {Question} from '../../entities/Question';
import {Answer} from '../../entities/Answer';

interface QuestionsState {
  status: Status;
  errorMessage: string;
  currentQuestionIndex: number;
  isAnswerSelected: boolean;
  selectedAnswer: Answer | null;
  isGameEnded: boolean;
  correctAnswersCount: number;
  questions: Question[] | null;
  questionsCount: number;
}

const initialState: QuestionsState = {
  status: Status.idle,
  errorMessage: '',
  currentQuestionIndex: 0,
  isAnswerSelected: false,
  selectedAnswer: null,
  isGameEnded: false,
  correctAnswersCount: 0,
  questions: null,
  questionsCount: 0,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    // get questions
    getQuestions: state => {
      state.status = Status.loading;
    },
    getQuestionsSuccess: (state, action: PayloadAction<Question[]>) => {
      const questions = action.payload;
      state.status = Status.idle;
      state.questions = questions;
      state.questionsCount = questions.length;
    },
    getQuestionsFail: (state, action: PayloadAction<string>) => {
      state.status = Status.error;
      state.errorMessage = action.payload;
    },

    // answer selection
    answerSelection: (state, action: PayloadAction<Answer>) => {
      const selectedAnswer = action.payload;
      state.isAnswerSelected = true;
      state.selectedAnswer = selectedAnswer;
      state.correctAnswersCount = selectedAnswer.isCorrect
        ? state.correctAnswersCount + 1
        : state.correctAnswersCount;
    },

    // continue pressed
    continuePressed: state => {
      if (state.currentQuestionIndex + 1 < state.questionsCount) {
        state.currentQuestionIndex += 1;
        state.isAnswerSelected = false;
      } else {
        state.isGameEnded = true;
      }
    },

    // reset state
    resetState: state => {
      state.isAnswerSelected = false;
      state.isGameEnded = false;
      state.currentQuestionIndex = 0;
      state.correctAnswersCount = 0;
    },
  },
});

export const {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsFail,
  answerSelection,
  continuePressed,
  resetState,
} = questionsSlice.actions;

export default questionsSlice.reducer;
