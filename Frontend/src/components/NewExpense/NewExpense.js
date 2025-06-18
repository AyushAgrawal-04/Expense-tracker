import React, { useState } from 'react';

import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

import Salary from './SalaryForm';
import { useSelector } from 'react-redux';

const NewExpense = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingSalary, setisUpdatingSalary] = useState('');

  const { salary } = useSelector((state) => state.salary);

  const startEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const startUpdatingSalaryHandler = () => {
    setisUpdatingSalary(true);
  };
  const stopUpdatingSalaryHandler = () => {
    setisUpdatingSalary(false);
  };

  const saveSalaryHandler = (salary) => {
    setisUpdatingSalary(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && !isUpdatingSalary && (
        <div className="new-expense-button-container">
          <div>
            <button onClick={startEditingHandler}>Add New Expense</button>
          </div>
          <div>
            <button onClick={startUpdatingSalaryHandler}>Update Salary</button>
          </div>
          <div>
            <p>Current Salary: INR {salary}/- </p>
          </div>
        </div>
      )}
      {isEditing && <ExpenseForm onCancel={stopEditingHandler} />}
      {isUpdatingSalary && (
        <Salary
          onCancel={stopUpdatingSalaryHandler}
          saveSalaryData={saveSalaryHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
