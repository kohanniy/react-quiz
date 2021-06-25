import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  logout,
} from '../../store/actions/auth';

function Logout() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Redirect to='/' />
  );
}

export default Logout;
