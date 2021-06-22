const createControl = (config, validation) => {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ''
  }
}

const createOption = (num) => {
  return createControl({
    label: `Вариант ${num}`,
    errorMessage: 'Поле не может быть пустым',
    id: num,
  }, {required: true})
};

export const createFormControlsForQuiz = () => ({
  question: createControl({
    label: 'Введите вопрос',
    errorMessage: 'Поле не может быть пустым',
  }, { required: true }),
  option1: createOption(1),
  option2: createOption(2),
  option3: createOption(3),
  option4: createOption(4),
})

export const validate = (value, validation = null) => {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }  

  return isValid;
};

export const validateForm = (inputs) => {
  let isFormValid = true;

  for (let input in inputs) {
    if (inputs.hasOwnProperty(input)) {
      isFormValid = inputs[input].valid && isFormValid;
    }
  }

  return isFormValid;
}


