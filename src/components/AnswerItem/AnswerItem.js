import React from 'react';
import './AnswerItem.css';

function AnswerItem(props) {
  const { 
    answer,
    onAnswerClick,
    answerState,
  } = props;

  let itemClasses = 'answer-item';

  if (answerState) {
    itemClasses += ` answer-item_state_${answerState}`;
  }

  function handleClick() {
    onAnswerClick(answer.id)
  }

  return (
    <li onClick={handleClick} className={itemClasses}>
      {answer.text}
    </li>
  );
}

export default AnswerItem;
