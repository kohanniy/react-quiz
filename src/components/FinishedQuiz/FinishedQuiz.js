import './FinishedQuiz.css';
import Button from '../UI/Button/Button';

function FinishedQuiz(props) {
  const {
    results,
    quiz,
    onRetry,
  } = props;

  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total += 1;
    }

    return total;
  }, 0);

  return (
    <div className='finished-quiz'>
      <ul className='finished-quiz__list'>
        {
          quiz.map((quizItem, index) => {
            let iconClasses = `finished-quiz__icon finished-quiz__icon_state_${results[quizItem.id]} fa`;

            if (results[quizItem.id] === 'error') iconClasses += ' finished-quiz__icon_state_error fa-times'

            if (results[quizItem.id] === 'success') iconClasses += ' finished-quiz__icon_state_success fa-check'

            return (
              <li
                key={index}
                className='finished-quiz__item'
              >
                <strong>{quizItem.id}</strong>.&nbsp;
                {quizItem.question}
                <i className={iconClasses} />
              </li>
            )
          })
        }
      </ul>
      <p>Ваш результат: {successCount} из {quiz.length}</p>
      <div>
        <Button
          type='button'
          onClick={onRetry}
          state='primary'
        >
          Повторить
        </Button>
        <Button
          type='button'
          state='success'
        >
          Перейти в список тестов
        </Button>
      </div>
    </div>
  );
}

export default FinishedQuiz;
