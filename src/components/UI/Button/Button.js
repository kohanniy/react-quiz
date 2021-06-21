import './Button.css';

function Button(props) {
  const {
    type,
    onClick,
    children,
    isDisabled,
    state,
  } = props;

  let buttonClasses = 'button';

  if (state === 'primary') buttonClasses += ' button_state_primary'

  if (state === 'success') buttonClasses += ' button_state_success'

  if (state === 'error') buttonClasses += ' button_state_error'

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}

export default Button;