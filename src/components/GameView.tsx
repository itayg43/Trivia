import React, {useCallback} from 'react';
import {StyleSheet, View, FlatList, Text, Button} from 'react-native';
import * as Progress from 'react-native-progress';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {
  selectCurrentQuestionIndex,
  selectIsAnswerSelected,
  selectQuestions,
  selectQuestionsCount,
} from '../redux/questions/questionsSelectors';
import {continuePressed} from '../redux/questions/questionsSlice';
import AnswerView from './AnswerView';

const GameView = () => {
  const dispatch = useAppDispatch();

  const currentQuestionIndex = useAppSelector(selectCurrentQuestionIndex);
  const isAnswerSelected = useAppSelector(selectIsAnswerSelected);
  const questions = useAppSelector(selectQuestions);
  const questionsCount = useAppSelector(selectQuestionsCount);

  const handleContinue = useCallback(() => {
    dispatch(continuePressed());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {questions && (
        <>
          {/** header */}
          <View style={styles.headerContainer}>
            <Text>Trivia Game</Text>
            <Text>
              {currentQuestionIndex + 1}/{questionsCount}
            </Text>
          </View>

          {/** progress */}
          <View style={styles.progressBarContainer}>
            <Progress.Bar
              progress={(currentQuestionIndex + 1) / questionsCount}
              width={250}
            />
          </View>

          {/** question */}
          <View style={styles.questionContainer}>
            <Text>{questions[currentQuestionIndex].value}</Text>
          </View>

          {/** answers */}
          <View style={styles.answersContainer}>
            <FlatList
              data={questions[currentQuestionIndex].answers}
              renderItem={({item}) => <AnswerView answer={item} />}
              keyExtractor={item => item.id}
            />
          </View>

          {/** continue */}
          {isAnswerSelected && (
            <View style={styles.continueButtonContainer}>
              <Button title="Continue" onPress={handleContinue} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default GameView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressBarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  questionContainer: {
    marginTop: 20,
  },

  answersContainer: {
    marginTop: 20,
  },

  continueButtonContainer: {
    marginTop: 10,
  },
});
