import React from 'react';
import './Layout.css';
import MenuToggle from '../Navigation/MenuToggle/MenuToggle';
import Drawer from '../Navigation/Drawer/Drawer';

function Layout (props) {
  const {
    children
  } = props;

  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false);

  function handleToggleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className='layout'>
      <Drawer
        isOpen={isMenuOpen}
        closeMenu={closeMenu}
      />
      <MenuToggle
        onToggleClick={handleToggleMenuClick}
        isOpen={isMenuOpen}
      />
      <main className='layout__main'>
        {children}
      </main>
    </div>
  );
}

export default Layout;