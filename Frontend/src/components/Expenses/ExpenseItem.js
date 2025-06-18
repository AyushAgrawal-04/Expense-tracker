import React from "react";

import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
import Card from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, editExpense } from "../../actions/authActions";

const ExpenseItem = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer?.authData);

  const cancelClickHandler = () => {
    dispatch(deleteExpense(props.expense));
  };

  const editClickHandler = () => {
    const newTitle = window.prompt("Enter new title:", props.expense.title);
    const newAmount = window.prompt("Enter new amount:", props.expense.amount);

    if (newTitle && newAmount) {
      const updatedExpense = {
        ...props.expense,
        title: newTitle,
        amount: newAmount,
      };

      dispatch(
        editExpense({ _id: user?.result?._id, expense: updatedExpense })
      );
    }
  };

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">Rs. {props.amount}</div>
          <button
            type="button"
            onClick={cancelClickHandler}
          >
            Remove Expense
          </button>
          <button
            type="button"
            onClick={editClickHandler}
          >
            Edit Expense
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
