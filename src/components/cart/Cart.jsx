import { useDispatch, useSelector } from "react-redux";
import {
  checkoutCart,
  getCartProducts,
  modifyIsCartShowing,
} from "../../store/slices/cart.slice";
import { useEffect } from "react";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { isCartShowing, products } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const handleClickChangeCartShowing = () => dispatch(modifyIsCartShowing());

  const handleClickCheckout = () => dispatch(checkoutCart())

  const totalCheckoutPrice = products.reduce((acc, product) => acc + product.quantity * product.product.price, 0)

  useEffect(() => {
    if(token && isCartShowing){
      dispatch(getCartProducts());
    }
  }, [isCartShowing]);

  return ( 
    <section
      className={`fixed top-0 bg-white h-screen ${
        isCartShowing && token ? "right-0" : "-right-full"
      } w-[300px] transition-all duration-200 p-2 shadow-2xl shadow-black/30 grid grid-rows-[auto_1fr_auto]`}
    >
      <button
        onClick={handleClickChangeCartShowing}
        className="absolute top-3 right-3 text-xl text-red-500"
      >
        <i className="bx bx-x"></i>
      </button>

      <h3 className="font-bold text-xl text-gray-500 p-2">Shoppig Cart</h3>

      {/* Cart Products */}
      <section className="grid gap-4 content-start py-6 overflow-y-auto">
        {products.map((cartProduct) => (
          <CartProduct key={cartProduct.id} cartProduct={cartProduct} />
        ))}
      </section>

      {/* Total Price Section */}
      <section className="border-t-[1px] border-gray-300 p-4 grid grid-cols-2 gap-4">
        <span className="text-gray-400">Total</span>
        <span className="text-end font-bold">${(totalCheckoutPrice).toFixed(2)}</span>
        <button onClick={handleClickCheckout} className="col-span-2 block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors">
          Checkout
        </button>
      </section>
    </section>
  );
};
export default Cart;
