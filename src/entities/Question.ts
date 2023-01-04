import {decode} from 'html-entities';
import {v4 as uuidv4} from 'uuid';

import {Answer} from './Answer';

export class Question {
  id: string = uuidv4();
  category: string;
  difficulty: string;
  value: string;
  answers: Answer[];

  constructor(
    category: string,
    difficulty: string,
    value: string,
    correctAnswer: string,
    incorrectAnswers: string[],
  ) {
    this.category = category;
    this.difficulty = difficulty;
    this.value = decode(value);
    this.answers = this._initAnswers(correctAnswer, incorrectAnswers);
  }

  private _initAnswers(correctAnswer: string, incorrectAnswers: string[]) {
    const correct = new Answer(correctAnswer, true);

    const incorrects = incorrectAnswers.map(
      incorrect => new Answer(incorrect, false),
    );

    return this._shuffleAnswers([correct, ...incorrects]);
  }

  private _shuffleAnswers(answers: Answer[]) {
    return answers.sort(() => Math.random() - 0.5);
  }
}
