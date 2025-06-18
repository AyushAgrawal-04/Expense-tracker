import * as api from "../api/index";

import {
  ADD_EXPENSE_FAILURE,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  EDIT_EXPENSE_SUCCESS, // ✅ Added
  JWT_AUTH_FAILURE,
  JWT_AUTH_REQUEST,
  JWT_AUTH_SUCCESS,
  LOGOUT,
  UPDATE_SALARY_FAILURE,
  UPDATE_SALARY_REQUEST,
  UPDATE_SALARY_SUCCESS,
} from "../constants/authConstants";

import userDetails from "../components/Auth/userDetails";

export const logoutAction = (navigate) => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });

  window.location.reload();
  navigate("/");
};

export const jwtSignIn = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: JWT_AUTH_REQUEST });

    const { data } = await api.signIn(userData);

    dispatch({ type: JWT_AUTH_SUCCESS, payload: data });

    navigate("/");
    window.location.reload();
  } catch (error) {
    dispatch({ type: JWT_AUTH_FAILURE, payload: error.message });
  }
};

export const jwtSignUp = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: JWT_AUTH_REQUEST });

    const { data } = await api.signUp(userData);
    dispatch({ type: JWT_AUTH_SUCCESS, payload: data });

    navigate("/");
    window.location.reload();
  } catch (error) {
    dispatch({ type: JWT_AUTH_FAILURE, payload: error.message });
  }
};

export const updateSalary = (salary) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SALARY_REQUEST });

    const { _id } = userDetails?.result;
    const { data } = await api.updateSalary({ salary, _id });
    dispatch({ type: UPDATE_SALARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_SALARY_FAILURE, payload: error.message });
  }
};

export const addExpense = (expense) => async (dispatch) => {
  try {
    dispatch({ type: ADD_EXPENSE_REQUEST });

    const { _id } = userDetails?.result;
    const { data } = await api.addExpense({ expense, _id });

    dispatch({ type: ADD_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_EXPENSE_FAILURE, payload: error.message });
  }
};

export const deleteExpense = (expense) => async (dispatch) => {
  try {
    dispatch({ type: ADD_EXPENSE_REQUEST });

    const { _id } = userDetails?.result;
    const { data } = await api.deleteExpense({ expense, _id });

    dispatch({ type: ADD_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_EXPENSE_FAILURE, payload: error.message });
  }
};

// ✅ New Action: Edit Expense (Properly separated)
export const editExpense = (expense) => async (dispatch) => {
  try {
    dispatch({ type: ADD_EXPENSE_REQUEST });

    const { _id } = userDetails?.result;
    const { data } = await api.editExpense({ expense, _id });

    dispatch({ type: EDIT_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_EXPENSE_FAILURE, payload: error.message });
  }
};
