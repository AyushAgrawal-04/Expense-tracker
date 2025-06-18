import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4F81",
  "#008080",
  "#FFD700",
  "#B22222",
  "#40E0D0",
  "#DA70D6",
  "#7FFF00",
];

const ExpensesChart = ({ expenses = [], salary }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  // Filter expenses by selected month
  const filteredExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getMonth() === selectedMonth && !isNaN(date);
  });

  // Group by title and sum amounts
  const groupedData = {};
  filteredExpenses.forEach((expense) => {
    const title = expense.title;
    groupedData[title] = (groupedData[title] || 0) + Number(expense.amount);
  });

  const pieData = Object.entries(groupedData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <label
          htmlFor="month"
          style={{ color: "white" }}
        >
          Filter by Month:
        </label>{" "}
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {MONTHS.map((month, index) => (
            <option
              key={index}
              value={index}
            >
              {month}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={
              pieData.length > 0 ? pieData : [{ name: "No Data", value: 1 }]
            }
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={pieData.length > 0}
          >
            {(pieData.length > 0
              ? pieData
              : [{ name: "No Data", value: 1 }]
            ).map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  pieData.length > 0 ? COLORS[index % COLORS.length] : "#ccc"
                }
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesChart;
