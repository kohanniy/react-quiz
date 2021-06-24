import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Quiz.css';
import ActiveQuiz from '../ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../FinishedQuiz/FinishedQuiz';
import Loader from '../UI/Loader/Loader';
import { 
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../store/actions/quizzes';

function Quiz(props) {
  const quiz = useSelector((state) => state.quizzes.quiz);
  const isLoading = useSelector((state) => state.quizzes.isLoading);
  const activeQuestion = useSelector((state) => state.quizzes.activeQuestion);
  const answerState = useSelector((state) => state.quizzes.answerState);
  const results = useSelector((state) => state.quizzes.results);
  const isQuizFinished = useSelector((state) => state.quizzes.isQuizFinished);

  const dispatch = useDispatch();

  function handleRetryButtonClick() {
    dispatch(retryQuiz());
  }

  React.useEffect(() => {
    dispatch(fetchQuizById(props.match.params.id));
    dispatch(retryQuiz());
  }, [dispatch, props.match.params.id]);

  return (
    <div className='quiz'>
      <div className='quiz__wrapper'>
        <h1 className='quiz__title'>
          Ответьте на вопросы
        </h1>
        {
          isLoading || !quiz
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
                    onAnswerClick={(answerId) => dispatch(quizAnswerClick(answerId))}
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
