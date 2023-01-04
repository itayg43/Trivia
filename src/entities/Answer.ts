import {decode} from 'html-entities';
import {v4 as uuidv4} from 'uuid';

export class Answer {
  id: string = uuidv4();
  value: string;
  isCorrect: boolean;

  constructor(value: string, isCorrect: boolean) {
    this.value = decode(value);
    this.isCorrect = isCorrect;
  }
}
