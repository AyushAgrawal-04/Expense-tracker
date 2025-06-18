import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './Salary.css';
import { updateSalary } from '../../actions/authActions';

const Salary = (props) => {
  const [enteredSalary, setSalary] = useState('0');

  const dispatch = useDispatch();

  const salaryChangeHandler = (event) => {
    setSalary(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(updateSalary(enteredSalary));

    props.onCancel();
  };

  return (
    <div className="main-pad">
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label htmlFor="salary">Enter your Monthly salary</label>
            <input
              id="salary"
              type="number"
              onChange={salaryChangeHandler}
            ></input>
          </div>
        </div>
        <div className="new-expense__actions">
          <button onClick={() => props.onCancel()}>Go Back</button>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Salary;
