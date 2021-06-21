import './Backdrop.css';

function Backdrop(props) {
  const {
    onBackdropClick,
  } = props;

  return (
    <div
      className='backdrop'
      onClick={onBackdropClick}
    />
  );
}

export default Backdrop;