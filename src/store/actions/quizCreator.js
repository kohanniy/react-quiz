import {
  CREATE_QUESTION,
  RESET_QUIZ_CREATOR,
} from './actionTypes';
import axios from '../../axios/axios-quiz';

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUESTION,
    item,
  }
}

export function resetQuizCreator() {
  return {
    type: RESET_QUIZ_CREATOR,
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post('/quizes.json', getState().quizCreator.quiz);
    dispatch(resetQuizCreator());
  }
}
