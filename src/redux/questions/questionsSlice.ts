import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Status} from '../../helpers/enums';
import {Question} from '../../entities/Question';

interface QuestionsState {
  status: Status;
  errorMessage: string;
  currentQuestionIndex: number;
  questions: Question[];
}

const initialState: QuestionsState = {
  status: Status.idle,
  errorMessage: '',
  currentQuestionIndex: 0,
  questions: [],
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    getQuestions: state => {
      state.status = Status.loading;
    },
    getQuestionsSuccess: (state, action: PayloadAction<Question[]>) => {
      state.status = Status.idle;
      state.questions = action.payload;
    },
    getQuestionsFail: (state, action: PayloadAction<string>) => {
      state.status = Status.error;
      state.errorMessage = action.payload;
    },
  },
});

export const {getQuestions, getQuestionsSuccess, getQuestionsFail} =
  questionsSlice.actions;

export default questionsSlice.reducer;
