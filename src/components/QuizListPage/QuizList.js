import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './QuizList.css';
import axios from '../../axios/axios-quiz';
import Loader from '../UI/Loader/Loader';

function QuizList(props) {
  const [ quizList, setQuizList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await axios.get('/quizes.json');

        const quizzes = [];

        Object.keys(response.data).forEach((key, index) => {
          quizzes.push({
            id: key,
            name: `Тест №${index + 1}`,
          })
        });
        setQuizList(quizzes);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    getQuizzes();
  }, []);

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
