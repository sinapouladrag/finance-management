import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utlis/baseURL";

const initialState = {
  account: {},
  accounts: [],
  error: null,
  loading: false,
  success: false,
  isUpdated: false,
};

export const createAccountAction = createAsyncThunk(
  "account/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { title, initialBalance, accountType, notes } = payload;
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${baseURL}/accounts`,
        { name: title, initialBalance, accountType, notes },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAccountAction = createAsyncThunk(
  "account/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, initialBalance, accountType, notes, id } = payload;
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `${baseURL}/accounts/${id}`,
        { name, initialBalance, accountType, notes },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleAccountAction = createAsyncThunk(
  "account/get-details",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(`${baseURL}/accounts/${payload}`, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  extraReducers: (builder) => {
    //create account
    builder.addCase(createAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });
    builder.addCase(createAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.account = null;
    });
    //get single account
    builder.addCase(getSingleAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });
    builder.addCase(getSingleAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.account = null;
    });
    //update account
    builder.addCase(updateAccountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.account = action.payload;
    });
    builder.addCase(updateAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      state.account = null;
      state.isUpdated = false;
    });
  },
});

const accountReducer = accountsSlice.reducer;

export default accountReducer;
