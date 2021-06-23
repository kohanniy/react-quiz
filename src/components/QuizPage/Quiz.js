import React from 'react';
import './Quiz.css';
import ActiveQuiz from '../ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../FinishedQuiz/FinishedQuiz';
import Loader from '../UI/Loader/Loader';
import axios from '../../axios/axios-quiz';

function Quiz(props) {
  const [ quiz, setQuiz ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(true);

  const [ activeQuestion, setActiveQuestion ] = React.useState(0);
  const [ answerState, setAnswerState ] = React.useState(null);
  const [ isQuizFinished, setIsQuizFinished ] = React.useState(false);
  const [ results, setResults ] = React.useState({});

  const isFinished = () => activeQuestion + 1 === quiz.length

  function handleAnswerClick(answerId) {
    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (key === 'success') {
        return;
      }
    }

    const question = quiz[activeQuestion];
    const quizResults = results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) quizResults[question.id] = 'success';
      
      setAnswerState({
        [answerId]: 'success',
      });
      const timeout = setTimeout(() => {
        if (isFinished()) {
          setIsQuizFinished(true);
          setResults(quizResults);
        } else {
          setActiveQuestion(activeQuestion + 1);
          setAnswerState(null);
        }
        clearTimeout(timeout);
      }, 1000);
      
    } else {
      setAnswerState({ [answerId]: 'error' });
      quizResults[question.id] = 'error';
    }
  }

  function handleRetryButtonClick() {
    setActiveQuestion(0);
    setAnswerState(null);
    setIsQuizFinished(false);
    setResults({});
  }

  React.useEffect(() => {
    (
      async () => {
        try {
          const response = await axios.get(`/quizes/${props.match.params.id}.json`);
          setQuiz(response.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      }
    )()
  }, [props.match.params.id]);

  return (
    <div className='quiz'>
      <div className='quiz__wrapper'>
        <h1 className='quiz__title'>
          Ответьте на вопросы
        </h1>
        {
          isLoading
            ? <Loader />
            : isQuizFinished
                ? <FinishedQuiz
                    results={results}
                    quiz={quiz}
                    onRetry={handleRetryButtonClick}
                  />
                : <ActiveQuiz 
                    answers={quiz[activeQuestion].answers}
                    question={quiz[activeQuestion].question}
                    onAnswerClick={handleAnswerClick}
                    quizLength={quiz.length}
                    answerNumber={activeQuestion + 1}
                    answerState={answerState}
                  />
        }
      </div>
    </div>
  );
}

export default Quiz;
