import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/usersSlice";
import accountReducer from "../slice/accounts/accountsSlice";
import transactionReducer from "../slice/transactions/transactionSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    accounts: accountReducer,
    transaction: transactionReducer,
  },
});

export default store;
