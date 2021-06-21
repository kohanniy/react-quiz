import React from 'react';
import './Layout.css';

function Layout (props) {
  const {
    children
  } = props;

  return (
    <div className='layout'>
      <main className='layout__main'>
        {children}
      </main>
    </div>
  );
}

export default Layout;