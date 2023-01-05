import React, {useCallback} from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {Answer} from '../entities/Answer';
import {
  selectIsAnswerSelected,
  selectSelectedAnswer,
} from '../redux/questions/questionsSelectors';
import {answerSelection} from '../redux/questions/questionsSlice';

interface Props {
  answer: Answer;
}

const AnswerView = ({answer}: Props) => {
  const dispatch = useAppDispatch();

  const isAnswerSelected = useAppSelector(selectIsAnswerSelected);
  const selectedAnswer = useAppSelector(selectSelectedAnswer);

  const handleSelection = useCallback(() => {
    dispatch(answerSelection(answer));
  }, [dispatch]);

  return (
    <Pressable
      style={styles.container}
      onPress={handleSelection}
      disabled={isAnswerSelected && selectedAnswer?.id !== answer.id}>
      <Text numberOfLines={1}>{answer.value}</Text>

      {isAnswerSelected && selectedAnswer?.id === answer.id && (
        <View style={styles.isCorrectOverlay}>
          <Text>
            {answer.isCorrect ? (
              <MaterialCommunityIcons
                name="check-circle"
                size={22}
                color="green"
              />
            ) : (
              <MaterialCommunityIcons
                name="alert-circle"
                size={22}
                color="red"
              />
            )}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default AnswerView;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },

  isCorrectOverlay: {
    padding: 15,
    position: 'absolute',
    top: 0,
    end: 0,
  },
});
