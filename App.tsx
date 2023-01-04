import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Status} from './src/helpers/enums';

import {useAppDispatch} from './src/hooks/useAppDispatch';
import {useAppSelector} from './src/hooks/useAppSelector';
import getQuestionsAsync from './src/redux/questions/asyncActions/getQuestionsAsync';
import {
  selectErrorMessage,
  selectQuestions,
  selectStatus,
} from './src/redux/questions/questionsSelectors';

const App = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const questions = useAppSelector(selectQuestions);

  useEffect(() => {
    dispatch(getQuestionsAsync());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <View>
        {status === Status.loading && <ActivityIndicator />}
        {status === Status.error && <Text>{errorMessage}</Text>}
        <FlatList
          data={questions}
          renderItem={({item}) => <Text>{item.value}</Text>}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
