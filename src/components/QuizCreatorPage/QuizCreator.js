import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './QuizCreator.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Auxiliary from '../Auxiliary/Auxiliary';
import Select from '../UI/Select/Select';
import {
  createFormControlsForQuiz,
  validate,
  validateForm,
} from '../../form/formFramework';
import {
  createQuizQuestion,
  finishCreateQuiz,
} from '../../store/actions/quizCreator';

function QuizCreator(props) {
  const [ inputs, setInputs ] = React.useState(createFormControlsForQuiz());
  const [ rightAnswerId, setRightAnswerId ] = React.useState(1);
  const [ isFormValid, setIsFormValid ] = React.useState(false);

  const quiz = useSelector((state) => state.quizCreator.quiz);
  const dispatch = useDispatch();

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleAddQuestionBtnClick(evt) {
    evt.preventDefault();

    const index = quiz.length + 1;
    const { question, option1, option2, option3, option4} = inputs;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    };

    dispatch(createQuizQuestion(questionItem));

    setIsFormValid(false);
    setRightAnswerId(1);
    setInputs(createFormControlsForQuiz());
  }

  function handleCreateQuizBtnClick(evt) {
    evt.preventDefault();

    dispatch(finishCreateQuiz());

    setIsFormValid(false);
    setRightAnswerId(1);
    setInputs(createFormControlsForQuiz());   
  }

  function handleInputChange(evt, inputName) {
    const formInputs = { ...inputs };
    const input = { ...formInputs[inputName] }

    input.touched = true;
    input.value = evt.target.value;
    input.valid = validate(input.value, input.validation);

    formInputs[inputName] = input;

    setInputs(formInputs);
    setIsFormValid(validateForm(inputs));
  }

  function handleSelectChange(evt) {
    setRightAnswerId(+evt.target.value);
  }

  function renderInputs() {
    return Object.keys(inputs).map((inputName, index) => {
      const input = inputs[inputName];

      return (
        <Auxiliary key={inputName + index}>
          <Input
            label={input.label}
            value={input.value}
            valid={input.valid}
            shouldValidate={!!input.validation}
            touched={input.touched}
            errorMessage={input.errorMessage}
            onChange={(evt) => handleInputChange(evt, inputName)}
          />
          {
            index === 0
              ? <hr />
              : null
          }
        </Auxiliary>
      );
    })
  }

  const select = <Select 
    label='Отметьте правильный ответ'
    value={rightAnswerId}
    onChange={handleSelectChange}
    options={[
      { text: 1, value: 1 },
      { text: 2, value: 2 },
      { text: 3, value: 3 },
      { text: 4, value: 4 },
    ]}
  />

  return (
    <div className='quiz-creator'>
      <div className='quiz-creator__wrapper'>
        <h1 className='quiz-creator__title'>Создать тест</h1>
        <form
          className='quiz-creator__form'
          onSubmit={handleSubmit}
        >
          {
            renderInputs()
          }
          {
            select
          }
          <Button
            state='primary'
            isDisabled={!isFormValid}
            onClick={handleAddQuestionBtnClick}
          >
            Добавить вопрос
          </Button>
          <Button
            state='success'
            isDisabled={quiz.length === 0}
            onClick={handleCreateQuizBtnClick}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  )
}

export default QuizCreator;
