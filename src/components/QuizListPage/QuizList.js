import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './QuizList.css';
import { fetchQuizzes } from '../../store/actions/quizzes';
import Loader from '../UI/Loader/Loader';

function QuizList() {
  const quizList = useSelector((state) => state.quizzes.quizList);
  const isLoading = useSelector((state) => state.quizzes.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <div className='quizzes'>
      <div>
        <h1 className='quizzes__title'>Список тестов</h1>
        {
          isLoading
            ? <Loader />
            : <ul className='quizzes__list'>
                {
                  quizList.map((item) => (
                    <li 
                      className='quizzes__item'
                      key={item.id}
                    >
                      <NavLink
                        to={`/quiz/${item.id}`}
                        className='quizzes__link'
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
        }
      </div>
    </div>
  );
}

export default QuizList;
