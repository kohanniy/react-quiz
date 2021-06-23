import { FETCH_QIUZZES_ERROR, FETCH_QIUZZES_START, FETCH_QIUZZES_SUCCESS } from "../actions/actionTypes";

const initialState = {
  quizList: [],
  isLoading: false,
  error: null,
};

export default function quizzesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QIUZZES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_QIUZZES_SUCCESS:
      return {
        ...state,
        quizList: action.quizzes,
        isLoading: false,
      };
    case FETCH_QIUZZES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.err,
      };
    default:
      return state;
  }
}
