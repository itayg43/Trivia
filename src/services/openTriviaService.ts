import {Question} from '../entities/Question';
import {openTriviaClient} from '../clients/openTriviaClient';

interface QuestionJSON {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuestionsJSON {
  response_code: number;
  results: QuestionJSON[];
}

const DEFAULT_QUESTIONS_AMOUNT = 5;

export const getQuestions = async (
  amount: number = DEFAULT_QUESTIONS_AMOUNT,
) => {
  const {data} = await openTriviaClient.get<QuestionsJSON>(
    `/api.php?amount=${amount}`,
  );
  return data.results.map(
    question =>
      new Question(
        question.category,
        question.difficulty,
        question.question,
        question.correct_answer,
        question.incorrect_answers,
      ),
  );
};
