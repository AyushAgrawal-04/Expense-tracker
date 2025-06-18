import React from 'react';
import NewExpense from '../NewExpense/NewExpense';
import Expenses from '../Expenses/Expenses';
import userDetails from '../Auth/userDetails';
import { useNavigate } from 'react-router-dom';

import './Home.css';

export const Home = () => {
  const user = userDetails;

  const navigate = useNavigate();

  return user ? (
    <div>
      {' '}
      <NewExpense></NewExpense>
      <Expenses />
    </div>
  ) : (
    <div className={'not-auth-message'}>
      <span>
        Please{' '}
        <button className="signout" onClick={() => navigate('/auth')}>
          Sign-In
        </button>{' '}
        to continue.
      </span>
    </div>
  );
};
