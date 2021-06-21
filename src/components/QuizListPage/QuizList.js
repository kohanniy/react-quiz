import { NavLink } from 'react-router-dom';
import './QuizList.css';
import { listOfQuizzes } from '../../utils/constants';

function QuizList(props) {
  return (
    <div className='quizzes'>
      <div>
        <h1 className='quizzes__title'>Список тестов</h1>
        <ul className='quizzes__list'>
          {
            listOfQuizzes.map((item, index) => (
              <li 
                className='quizzes__item'
                key={index}
              >
                <NavLink
                  to={`/quiz/${item}`}
                  className='quizzes__link'
                >
                  Тест {item}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default QuizList;
