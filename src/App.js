import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './components/Layout/Layout';
import Quiz from './components/QuizPage/Quiz';
import QuizCreator from './components/QuizCreatorPage/QuizCreator';
import QuizList from './components/QuizListPage/QuizList';
import Auth from './components/AuthPage/Auth';
import Logout from './components/Logout/Logout';
import {
  autoLogin,
} from './store/actions/auth';

function App() {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const dispatch = useDispatch();

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/quiz/:id' component={Quiz} />
      <Route exact path='/' component={QuizList} />
      <Redirect to='/' />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/logout' component={Logout} />
        <Route exact path='/' component={QuizList} />
        <Redirect to='/' />
      </Switch>
    )
  }

  React.useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <Layout
      isAuthenticated={isAuthenticated}
    >
      { routes }
    </Layout>
  );
}

export default App;
