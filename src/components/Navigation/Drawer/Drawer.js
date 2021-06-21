import { NavLink } from 'react-router-dom';
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { InternalPagesLinks } from '../../../utils/constants';

const links = [1, 2, 3];

function Drawer(props) {
  const {
    isOpen,
    closeMenu,
  } = props;

  let drawerClasses = 'drawer'

  if (!isOpen) drawerClasses += ' drawer_close'

  return (
    <>
      <nav className={drawerClasses}>
        <ul className='drawer__list'>
          {
            InternalPagesLinks.map((link, index) => (
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
