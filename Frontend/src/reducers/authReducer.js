import {
  ADD_EXPENSE_FAILURE,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  EDIT_EXPENSE_SUCCESS,
  JWT_AUTH_FAILURE,
  JWT_AUTH_REQUEST,
  JWT_AUTH_SUCCESS,
  LOGOUT,
  UPDATE_SALARY_FAILURE,
  UPDATE_SALARY_REQUEST,
  UPDATE_SALARY_SUCCESS,
} from "../constants/authConstants";

import userDetails from "../components/Auth/userDetails";

const jwtAuthReducer = (
  state = { loading: false, authData: undefined },
  action
) => {
  switch (action.type) {
    case JWT_AUTH_REQUEST:
      return { loading: true };

    case JWT_AUTH_SUCCESS:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { loading: false, success: true, authData: action?.payload };

    case JWT_AUTH_FAILURE:
      return { loading: false, error: action.payload };

    case LOGOUT:
      return { loading: false, authData: null };

    default:
      return state;
  }
};

const salaryreducer = (
  state = { loading: false, salary: userDetails?.result?.salary },
  action
) => {
  switch (action.type) {
    case UPDATE_SALARY_REQUEST:
      return { loading: true };

    case UPDATE_SALARY_SUCCESS:
      userDetails.result.salary = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...userDetails }));
      return { loading: false, success: true, salary: action?.payload };

    case UPDATE_SALARY_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const updateExpenseReducer = (
  state = { loading: false, expenses: userDetails?.result?.expenses },
  action
) => {
  switch (action.type) {
    case ADD_EXPENSE_REQUEST:
      return { loading: true };

    case ADD_EXPENSE_SUCCESS:
      userDetails.result.expenses = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...userDetails }));
      return { loading: false, success: true, expenses: action?.payload };

    case EDIT_EXPENSE_SUCCESS:
      userDetails.result.expenses = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...userDetails }));
      return { loading: false, success: true, expenses: action?.payload };

    case ADD_EXPENSE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { jwtAuthReducer, salaryreducer, updateExpenseReducer };
