import React from 'react';
import AppBar from './AppBar';
import { useSelector, useDispatch } from 'react-redux';
import { AppUserActions, AppUserSelectors } from '../../stores/user';
import { UserRole } from '../../models/AppUser';

function AppHeader() {
  const userRole = useSelector(AppUserSelectors.getRole);
  const dispatch = useDispatch();

  const setUserRole = (role: UserRole) => {
    dispatch(AppUserActions.updateUser({ role}));
  }

  return (
    <header>
        <AppBar role={userRole} setRole={setUserRole}></AppBar>
    </header>
  );
}

export default AppHeader;
