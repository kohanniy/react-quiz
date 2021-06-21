import './MenuToggle.css';

function MenuToggle(props) {
  const {
    onToggleClick,
    isOpen,
  } = props;

  let menuToggleClasses = 'menu-toggle fa';

  isOpen 
    ? menuToggleClasses += ' fa-times menu-toggle_open'
    : menuToggleClasses += ' fa-bars'

  return (
    <i
      className={menuToggleClasses}
      onClick={onToggleClick}
    />
  )
}

export default MenuToggle;
