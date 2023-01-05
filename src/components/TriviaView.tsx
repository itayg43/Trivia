import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';

import {Status} from '../helpers/enums';
import {useAppSelector} from '../hooks/useAppSelector';
import {
  selectErrorMessage,
  selectIsGameEnded,
  selectQuestions,
  selectStatus,
} from '../redux/questions/questionsSelectors';
import GameView from './GameView';
import ScoreView from './ScoreView';

const TriviaView = () => {
  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const questions = useAppSelector(selectQuestions);
  const isGameEnded = useAppSelector(selectIsGameEnded);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {status === Status.loading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Loading Questions...</Text>
        </View>
      )}
      {status === Status.error && <Text>{errorMessage}</Text>}
      {status === Status.idle && questions && (
        <>{isGameEnded ? <ScoreView /> : <GameView />}</>
      )}
    </SafeAreaView>
  );
};

export default TriviaView;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },

  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
  },
});
