import React from 'react';
import './Quiz.css';
import ActiveQuiz from '../ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../FinishedQuiz/FinishedQuiz';

function Quiz(props) {
  // const {

  // } = props;

  const [ quiz, setQuiz ] = React.useState([
    {
      id: 1,
      question: 'Какого цвета небо?',
      rightAnswerId: 2,
      answers: [
        {text: 'Черного', id: 1},
        {text: 'Синего', id: 2},
        {text: 'Красного', id: 3},
        {text: 'Зеленого', id: 4},
      ]
    },
    {
      id: 2,
      question: 'В каком году основан Санкт-Петербург?',
      rightAnswerId: 3,
      answers: [
        {text: '1700', id: 1},
        {text: '1702', id: 2},
        {text: '1703', id: 3},
        {text: '1803', id: 4},
      ]
    },
  ]);

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

  return (
    <div className='quiz'>
      <div className='quiz__wrapper'>
        <h1 className='quiz__title'>
          Ответьте на вопросы
        </h1>
        {
          isQuizFinished
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
