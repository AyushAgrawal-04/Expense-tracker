import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import decode from 'jwt-decode';

import { logoutAction } from '../../actions/authActions';

import userDetails from '../Auth/userDetails';

import './Navbar.css';

const Navbar = () => {
  const user = userDetails;

  // const userInfoFromSTate = useSelector(
  //   (state) => state.googleAuthSuccessBackendSave?.authData
  // );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logoutAction());
      }
    }
  }, [user, dispatch, navigate, location]);

  const logouthandler = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logoutAction(navigate));
    }
  };

  return (
    <div className={'appbar'} position="static">
      <div>
        <h1 onClick={() => navigate('/')}>Expense Tracker</h1>
      </div>
      {user ? (
        <div className={'profile'}>
          <div className={'avatar'}>{user.result?.name.charAt(0)}</div>

          <h6 className={'username'} variant="h6">
            {user.result?.name}
          </h6>
          <button className={'signout'} onClick={logouthandler}>
            logout
          </button>
        </div>
      ) : (
        <div className={'profile'} onClick={() => navigate('/auth')}>
          <button className="signout">Sign-In</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
