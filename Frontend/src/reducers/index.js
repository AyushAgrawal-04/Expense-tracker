import { combineReducers } from 'redux';

import {
  updateExpenseReducer,
  jwtAuthReducer,
  salaryreducer,
} from './authReducer';

export default combineReducers({
  jwtAUth: jwtAuthReducer,
  salary: salaryreducer,
  expenses: updateExpenseReducer,
});
