import { combineReducers } from 'redux';
import quizzesReducer from './quizzes';
import quizCreatorReducer from './quizCreator';

export default combineReducers({
  quizzes: quizzesReducer,
  quizCreator: quizCreatorReducer,
});
