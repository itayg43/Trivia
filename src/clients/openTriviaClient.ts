import axios from 'axios';

export const openTriviaClient = axios.create({
  baseURL: 'https://opentdb.com',
});
