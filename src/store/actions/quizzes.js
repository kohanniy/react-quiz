import axios from '../../axios/axios-quiz';
import { 
  FETCH_QUIZZES_ERROR, 
  FETCH_QUIZZES_START, 
  FETCH_QUIZZES_SUCCESS, 
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  NEXT_QUESTION,
  QUIZ_RETRY,
} from './actionTypes';

export function fetchQuizzesStart() {
 return {
   type: FETCH_QUIZZES_START,
 }
}

export function fetchQuizzesSuccess(quizzes) {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    quizzes
  }
}

export function fetchQuizzesError(err) {
  return {
    type: FETCH_QUIZZES_ERROR,
    err,
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
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

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      dispatch(fetchQuizSuccess(response.data));
    } catch (err) {
      dispatch(fetchQuizzesError(err));
    }
  }
}

function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  }
}

export function quizNextQuestion(number) {
  return {
    type: NEXT_QUESTION,
    number,
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quizzes;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (key === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      };

      dispatch(quizSetState({[answerId]: 'success'}, results));
      const timeout = setTimeout(() => {
        if (state.activeQuestion + 1 === state.quiz.length) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        clearTimeout(timeout);
      }, 1000);
        
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({[answerId]: 'error'}, results));
    }
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  }
}
