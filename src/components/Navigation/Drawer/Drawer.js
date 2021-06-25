import { NavLink } from 'react-router-dom';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { 
  list,
  auth,
  quizCreator,
  logout,
} from '../../../utils/constants';

function Drawer(props) {
  const {
    isOpen,
    closeMenu,
    isAuthenticated,
  } = props;

  let drawerClasses = 'drawer';

  let links = [list];

  if (!isOpen) drawerClasses += ' drawer_close';

  if (isAuthenticated) {
    links.push(quizCreator);
    links.push(logout);
  } else {
    links.push(auth);
  }

  return (
    <>
      <nav className={drawerClasses}>
        <ul className='drawer__list'>
          {
            links.map((link, index) => (
              <li 
                key={index}
                className='drawer__item'
              >
                <NavLink 
                  to={link.path}
                  exact={link.exact}
                  className='drawer__link'
                  activeClassName='drawer__link_active'
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
      {
        isOpen 
          ?<Backdrop
            onBackdropClick={closeMenu}
           />
          : null
      }
    </>
  );
}

export default Drawer;
