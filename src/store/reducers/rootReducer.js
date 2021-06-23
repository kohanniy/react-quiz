import { combineReducers } from 'redux';
import quizzesReducer from './quizzes';

export default combineReducers({
  quizzes: quizzesReducer,
});
