import { combineReducers } from 'redux';
import quizzesReducer from './quizzes';
import quizCreatorReducer from './quizCreator';
import authReducer from './auth';

export default combineReducers({
  quizzes: quizzesReducer,
  quizCreator: quizCreatorReducer,
  auth: authReducer,
});
