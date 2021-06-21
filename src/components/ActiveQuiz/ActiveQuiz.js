import './ActiveQuiz.css';
import AnswersList from '../AnswersList/AnswersList';

function ActiveQuiz(props) {
  const {
    answers,
    question,
    onAnswerClick,
    quizLength,
    answerNumber,
    answerState,
  } = props;

  return (
    <div className='active-quiz'>
      <p className='active-quiz__question'>
        <span className='active-quiz__span'>
          <span className='active-quiz__accent'>{answerNumber}.</span>&nbsp;
          {question}
        </span>
        <small>{answerNumber} из {quizLength}</small>
      </p>
      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        answerState={answerState}
      />
    </div>
  );
}

export default ActiveQuiz;
