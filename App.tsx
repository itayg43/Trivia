import React, {useEffect} from 'react';

import {useAppDispatch} from './src/hooks/useAppDispatch';
import {getQuestionsAsync} from './src/redux/questions/asyncActions/getQuestionsAsync';
import TriviaView from './src/components/TriviaView';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getQuestionsAsync());
  }, [dispatch]);

  return <TriviaView />;
};

export default App;
