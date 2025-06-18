import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { jwtSignUp, jwtSignIn } from '../../actions/authActions';

import './Auth.css';

const formDataInitialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  salary: '',
};

const Auth = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);
  const [formData, setformData] = useState(formDataInitialState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(jwtSignUp(formData, navigate));
    } else {
      dispatch(jwtSignIn(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setisSignUp((prevSIgnUpSTate) => !prevSIgnUpSTate);
    setshowPassword(false);
  };

  return (
    <div className="signin-form">
      <form onSubmit={handleSubmit}>
        <div className="signin-form__controls">
          {isSignUp && (
            <>
              <div className="signin-form__control">
                <label>First Name</label>
                <input
                  name="firstName"
                  onChange={handleChange}
                  autoFocus={true}
                  half
                  type={'text'}
                ></input>
              </div>
              <div className="signin-form__control">
                <label>Last Name</label>
                <input
                  name="lastName"
                  onChange={handleChange}
                  half
                  type={'text'}
                ></input>
              </div>
              <div className="signin-form__control">
                <label>Enter Monthly Salary</label>
                <input
                  name="salary"
                  onChange={handleChange}
                  half
                  type={'text'}
                ></input>
              </div>
            </>
          )}
          <div className="signin-form__control">
            <label>Email Address</label>
            <input
              name="email"
              label="Email Address"
              onChange={handleChange}
              type="email"
            ></input>
          </div>
          <div className="signin-form__control">
            <label>Password</label>
            <input
              name="password"
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
            ></input>
          </div>
          {isSignUp && (
            <div className="signin-form__control">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                onChange={handleChange}
                type={'password'}
              ></input>
            </div>
          )}
        </div>
        <div className="signin-form__actions">
          <button type="submit"> {isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </div>
      </form>
      <div className="signin-form__actions">
        <button onClick={switchMode}>
          {isSignUp
            ? 'Already have an account? Sign In'
            : 'Dont have an account? SIgn Up'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
