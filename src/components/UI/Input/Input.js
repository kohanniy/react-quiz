import './Input.css';

const isInvalid = ({ valid, touched, shouldValidate }) => {
  return !valid && shouldValidate && touched;
}

function Input(props) {
  const {
    type,
    label,
    value,
    onChange,
    errorMessage,
    valid,
    touched,
    shouldValidate,
  } = props;

  const inputType = type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`
  let inputClasses = 'input';

  if (isInvalid({ valid, touched, shouldValidate })) inputClasses += ' input_invalid'

  return (
    <div className={inputClasses}>
      <label 
        htmlFor={htmlFor}
        className='input__label'
      >
        {label}
      </label>
      <input 
        type={inputType} 
        className='input__field'
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
      {
        isInvalid({ valid, touched, shouldValidate })
          ? <span className='input__error'>
              { errorMessage || 'Введите верное значение'}
            </span>
          : null
      }
      
    </div>
  );
}

export default Input;
