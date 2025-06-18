import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

export const signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Dosent exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid Credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "SOmething went wrong" });
  }
};

export const signupController = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, salary } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already Exist." });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Confirm password must be same as password." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      salary: salary,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const salaryController = async (req, res) => {
  const { _id, salary } = req.body;

  try {
    const existingUser = await User.findOneAndUpdate(
      { _id: _id },
      { salary: salary },
      { new: true }
    );
    return res.status(200).json(existingUser?.salary);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const addExpenses = async (req, res) => {
  const { _id, expense } = req.body;

  try {
    const existingUser = await User.findOne({ _id: _id });

    await existingUser?.expenses.push(expense);

    await existingUser.save();

    return res.status(200).json(existingUser?.expenses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteExpense = async (req, res) => {
  const { _id, expense: deleteExpense } = req.body;

  try {
    const existingUser = await User.findOne({ _id: _id });

    const expenses = existingUser?.expenses;

    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== deleteExpense.id
    );

    existingUser.expenses = updatedExpenses;

    await existingUser.save();

    return res.status(200).json(existingUser?.expenses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const editExpense = async (req, res) => {
  const { _id, expense: updatedExpense } = req.body;

  try {
    const user = await User.findOne({ _id });

    const index = user.expenses.findIndex(
      (expense) => expense.id === updatedExpense.id
    );

    if (index === -1) {
      return res.status(404).json({ message: "Expense not found." });
    }

    user.expenses[index] = updatedExpense;

    await user.save();

    return res.status(200).json(user.expenses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
