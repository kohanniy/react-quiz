import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Quiz from './components/QuizPage/Quiz';
import QuizCreator from './components/QuizCreatorPage/QuizCreator';
import QuizList from './components/QuizListPage/QuizList';
import Auth from './components/AuthPage/Auth';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' component={QuizList} />
      </Switch>
    </Layout>
  );
}

export default App;
