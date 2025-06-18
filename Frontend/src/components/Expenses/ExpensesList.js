import React from 'react';
import ExpenseItem from './ExpenseItem';

import './ExpensesList.css';

const ExpensesList = (props) => {
  if (props?.items?.length === 0) {
    return <h2 className="expenses-list__fallback">No Expenses Hurray!!</h2>;
  }

  return (
    <ul className="expenses-list">
      {props?.items?.map((expense) => (
        <ExpenseItem
          key={expense.id}
          Id={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          expense={expense}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
