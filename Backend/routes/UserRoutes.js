import express from "express";
import {
  signinController,
  signupController,
  salaryController,
  addExpenses,
  deleteExpense,
  editExpense,
} from "../controllers/userController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signin", signinController);
userRouter.post("/signup", signupController);
userRouter.post("/salary", isAuth, salaryController);
userRouter.post("/addexpense", isAuth, addExpenses);
userRouter.post("/deleteexpense", isAuth, deleteExpense);
userRouter.post("/editexpense", isAuth, editExpense);

export default userRouter;
