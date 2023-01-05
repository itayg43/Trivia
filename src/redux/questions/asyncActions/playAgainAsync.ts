import {resetState} from '../questionsSlice';
import {AppDispatch} from '../../store';
import {getQuestionsAsync} from './getQuestionsAsync';

export const playAgainAsync = () => async (dispatch: AppDispatch) => {
  dispatch(resetState());
  dispatch(getQuestionsAsync());
};
