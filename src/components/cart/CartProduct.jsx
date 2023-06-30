import { useDispatch } from "react-redux";
import { deleteProductCart } from "../../store/slices/cart.slice";

const CartProduct = ({ cartProduct }) => {
  const dispatch = useDispatch();

  const totalPrice = (cartProduct.quantity * cartProduct.product.price).toFixed(
    2
  );

  const handleClickDelete = () => {
    dispatch(deleteProductCart(cartProduct.id));
  };

  return (
    <article className="grid p-1 grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto]">
      <div className="h-[90px] aspect-square p-2 ">
        <img
          className="w-full h-full object-contain"
          src={cartProduct.product.images[2].url}
          alt=""
        />
      </div>

      <div>
        <span className="text-sm line-clamp-2">
          {cartProduct.product.title}
        </span>
        <article className="my-2">
          <div className="flex border-[1px] max-w-max">
            <button className="p-1 border-[1px] px-3">-</button>
            <div className="p-1 border-[1px] px-4">{cartProduct.quantity}</div>
            <button className="p-1 border-[1px] px-3">+</button>
          </div>
        </article>
      </div>

      <i
        onClick={handleClickDelete}
        className="bx bxs-trash p-1 cursor-pointer justify-self-end self-start"
      ></i>

      <div className="col-start-2 col-span-2 text-end">
        <span>Total: </span>

        <span>${totalPrice}</span>
      </div>
    </article>
  );
};
export default CartProduct;
