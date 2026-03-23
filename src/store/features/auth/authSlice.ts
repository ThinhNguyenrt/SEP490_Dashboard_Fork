import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./authTypes";
import { MockUser } from "@/data/mockUser";

// Get initial state from sessionStorage
const getInitialState = (): AuthState => {
  const savedUser = sessionStorage.getItem("auth_user");
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      return {
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    } catch {
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    }
  }
  return {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // nhấn nút đăng nhập 
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // đăng nhập thành công
    loginSuccess: (state, action: PayloadAction<MockUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false; 
      state.error = null;
      // Save to sessionStorage
      sessionStorage.setItem("auth_user", JSON.stringify(action.payload));
    },
    // có lỗi
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.loading = false; 
    },
    // đăng xuất
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      // Clear from sessionStorage
      sessionStorage.removeItem("auth_user");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;