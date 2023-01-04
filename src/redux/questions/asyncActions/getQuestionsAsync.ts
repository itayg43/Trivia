import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsFail,
} from '../questionsSlice';
import openTriviaService from '../../../services/openTriviaService';
import {AppDispatch} from '../../store';

export default () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getQuestions());
    const questions = await openTriviaService.getQuestions();
    dispatch(getQuestionsSuccess(questions));
  } catch (error) {
    console.error(error);
    dispatch(getQuestionsFail('Could not get questions.'));
  }
};
