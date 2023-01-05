import React, {useCallback} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {playAgainAsync} from '../redux/questions/asyncActions/playAgainAsync';
import {selectCorrectAnswersCount} from '../redux/questions/questionsSelectors';

const ScoreView = () => {
  const dispatch = useAppDispatch();

  const correctAnswersCount = useAppSelector(selectCorrectAnswersCount);

  const handlePlayAgain = useCallback(() => {
    dispatch(playAgainAsync());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations!</Text>

      <View style={styles.scoreContainer}>
        <Text>You answered correctly on {correctAnswersCount} questions.</Text>
      </View>

      <View style={styles.playAgainButtonContainer}>
        <Button title="Play again!" onPress={handlePlayAgain} />
      </View>
    </View>
  );
};

export default ScoreView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
  },

  scoreContainer: {
    marginTop: 20,
  },

  playAgainButtonContainer: {
    marginTop: 10,
  },
});
