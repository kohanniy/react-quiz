import { 
  FETCH_QUIZZES_ERROR, 
  FETCH_QUIZZES_START, 
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  NEXT_QUESTION,
  QUIZ_RETRY,
} from "../actions/actionTypes";

const initialState = {
  quizList: [],
  isLoading: false,
  error: null,
  results: {},
  isQuizFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

export default function quizzesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZZES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        quizList: action.quizzes,
        isLoading: false,
      };
    case FETCH_QUIZZES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.err,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quiz: action.quiz,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isQuizFinished: true,
      };
    case NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isQuizFinished: false,
        results: {},
      }
    default:
      return state;
  }
}
