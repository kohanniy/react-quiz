import './Select.css';
import { createHtmlFor } from '../../../utils/utils';

function Select(props) {
  const {
    label,
    value,
    onChange,
    options,
  } = props;

  const htmlFor = createHtmlFor(label);

  return (
    <div className='select'>
      <label
        htmlFor={htmlFor}
        className='select__label'
      >
        {label}
      </label>
      <select
        id={htmlFor}
        name=''
        value={value}
        onChange={onChange}
        className='select__options'
      >
        {
          options.map((option, index) => (
            <option
              key={option.value + index}
              value={option.value}
            >
              {option.text}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default Select;
