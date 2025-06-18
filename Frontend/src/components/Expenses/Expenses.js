import React, { useState } from "react";

import ExpensesFilter from "../NewExpense/ExpensesFilter";
import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";
import ExpensesChart from "./ExpensesChart";

import "./Expenses.css";
import { useSelector } from "react-redux";

const Expenses = () => {
  const [filteredYear, setFilteredYear] = useState("2025");

  const { salary } = useSelector((state) => state.salary);

  const { expenses } = useSelector((state) => state.expenses);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  expenses?.map((expense) => (expense.date = new Date(expense.date)));

  const filteredExpenses = expenses?.filter((expense) => {
    return expense?.date?.getFullYear().toString() === filteredYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart
          expenses={filteredExpenses}
          salary={salary}
        ></ExpensesChart>
        <ExpensesList items={filteredExpenses}></ExpensesList>
      </Card>
    </div>
  );
};

export default Expenses;
