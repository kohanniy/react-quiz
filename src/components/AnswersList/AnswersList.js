import React from 'react';
import './AnswersList.css';
import AnswerItem from '../AnswerItem/AnswerItem';

function AnswersList(props) {
  const {
    answers,
    onAnswerClick,
    answerState,
  } = props;

  return (
    <ul className='answers-list'>
      {
        answers.map((answer, index) => (
          <AnswerItem
            key={index}
            answer={answer}
            onAnswerClick={onAnswerClick}
            answerState={answerState ? answerState[answer.id] : null}
          />
        ))
      }
    </ul>
  );
}

export default AnswersList;

