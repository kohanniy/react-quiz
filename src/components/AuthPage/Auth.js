import React from 'react';
import './Auth.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { validateEmail } from '../../utils/utils';

function Auth(props) {
  const [ formControls, setFormControls ] = React.useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите правильный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите правильный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      }
    },
  });

  const [ isFormValid, setIsFormValid ] = React.useState(false);

  const inputs = Object.keys(formControls);

  function handleLogin() {

  }

  function handleRegister() {

  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function validateInput(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  function handleChange(evt, inputName) {
    const formInputs = {...formControls};
    const input = {...formInputs[inputName]}

    input.value = evt.target.value;
    input.touched = true;
    input.valid = validateInput(input.value, input.validation);

    formInputs[inputName] = input;

    let isAuthFormValid = true;

    Object.keys(formInputs).forEach((name) => {
      isAuthFormValid = formInputs[name].valid && isAuthFormValid
    })

    setFormControls(formInputs);
    setIsFormValid(isAuthFormValid);
  }

  return (
    <div className='auth'>
      <div className='auth__wrapper'>
        <h1 className='auth__title'>Авторизация</h1>
        <form 
          className='auth__form'
          onSubmit={handleSubmit}
        >
          {
            inputs.map((inputName, index) => {
              const input = formControls[inputName];

              return (
                <Input 
                  key={inputName + index}
                  type={input.type}
                  value={input.value}
                  valid={input.valid}
                  touched={input.touched}
                  label={input.label}
                  shouldValidate={!!input.validation}
                  errorMessage={input.errorMessage}
                  onChange={(evt) => handleChange(evt, inputName)}
                />
              );
            })
          }
          <Button
            type='button'
            state='success'
            onClick={handleLogin}
            isDisabled={!isFormValid}
          >
            Войти
          </Button>
          <Button
            type='button'
            state='primary'
            onClick={handleRegister}
            isDisabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
