import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  useWindowDimensions,
} from 'react-native';
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
import {capitalizeFirstLetter} from '../helpers/stringUtils';
import AnswerView from './AnswerView';

const GameView = () => {
  const dimensions = useWindowDimensions();
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
            <Text style={styles.title}>Trivia Game</Text>

            <Text style={styles.title}>
              {currentQuestionIndex + 1}/{questionsCount}
            </Text>
          </View>

          {/** progress */}
          <View style={styles.progressBarContainer}>
            <Progress.Bar
              progress={(currentQuestionIndex + 1) / questionsCount}
              width={dimensions.width / 1.1}
            />
          </View>

          {/** question */}
          <View style={styles.questionContainer}>
            <View style={styles.questionMetadtaContainer}>
              <Text>{questions[currentQuestionIndex].category}</Text>

              <Text>
                {capitalizeFirstLetter(
                  questions[currentQuestionIndex].difficulty,
                )}
              </Text>
            </View>

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
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },

  progressBarContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  questionContainer: {
    marginTop: 30,
  },
  questionMetadtaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  answersContainer: {
    marginTop: 30,
  },

  continueButtonContainer: {
    marginTop: 10,
  },
});
