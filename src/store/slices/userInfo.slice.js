import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configAxios";

const initialState = {
  token: "",
  user: null,
};

const userInfoSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem('userInfo')) ?? initialState,
  name: "userInfo",
  reducers: {
    setUserInfo: (state, action) => {
      const responseLongin = action.payload;
      const newState = { ...state, ...responseLongin };
      localStorage.setItem("userInfo", JSON.stringify(newState));
      return newState;
    },
    logoutUser: (state) => {
      const newState = { ...state, ...initialState };
      localStorage.setItem("userInfo", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { setUserInfo, logoutUser } = userInfoSlice.actions;

export const loginUser = (dataForm) => (dispatch) => {

  axiosEcommerce
    .post("/users/login", dataForm)
    .then(({ data }) => dispatch(setUserInfo(data)))
    .catch((err) => console.log(err));
};

export default userInfoSlice.reducer;
