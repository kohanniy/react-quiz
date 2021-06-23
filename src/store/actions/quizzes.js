import axios from '../../axios/axios-quiz';
import { FETCH_QIUZZES_ERROR, FETCH_QIUZZES_START, FETCH_QIUZZES_SUCCESS } from './actionTypes';

export function fetchQuizzesStart() {
 return {
   type: FETCH_QIUZZES_START,
 }
}

export function fetchQuizzesSuccess(quizzes) {
  return {
    type: FETCH_QIUZZES_SUCCESS,
    quizzes
  }
}

export function fetchQuizzesError(err) {
  return {
    type: FETCH_QIUZZES_ERROR,
    err,
  }
}

export function fetchQuizzes() {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart())
    try {
      const response = await axios.get('/quizes.json');

      const quizzes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          name: `Тест №${index + 1}`,
        })
      });
      dispatch(fetchQuizzesSuccess(quizzes))
    } catch (err) {
      fetchQuizzesError(err);
    }
  }
}
