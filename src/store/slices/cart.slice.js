import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configAxios";

const initialState = {
  products: [],
  isCartShowing: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    modifyIsCartShowing: (state) => {
      state.isCartShowing = !state.isCartShowing;
    },
    setProducts: (state, action) => {
      const newProduts = action.payload;
      state.products = newProduts;
    },
  },
});

export const { modifyIsCartShowing, setProducts } = cartSlice.actions;

export const getCartProducts = () => (dispatch) => {
  axiosEcommerce
    .get("/cart", getConfig())
    .then(({ data }) => dispatch(setProducts(data)))
    .catch((err) => console.log(err));
};

export const addProductToCart = (data) => (dispatch) => {
  axiosEcommerce
    .post("/cart", data, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => console.log(err));
};

export const deleteProductCart = (productId) => (dispatch) => {
  axiosEcommerce
    .delete(`/cart/${productId}`, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => console.log(err));
};

export const checkoutCart = () => (dispatch) => {
  axiosEcommerce.post("/purchases", {}, getConfig())
  .then(() => dispatch(getCartProducts()))
  .catch((err) => console.log(err));
}

export default cartSlice.reducer;
