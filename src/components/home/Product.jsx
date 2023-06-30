import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../store/slices/cart.slice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleClickAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = { quantity: 1, productId: product.id };
    dispatch(addProductToCart(productToAdd));
  };

  return (
    <Link to={`/products/${product.id}`}>
      <article className="border border-gray-400 rounded-md w-[100%] h-[100%] relative max-w-[350px] mx-auto">
        <div className="h-[240px] overflow-hidden p-4 relative group">
          <img
            className="w-full h-full object-contain opacity-100 group-hover:opacity-0 transition-opacity duration-500"
            src={product.images[0].url}
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full object-contain p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <img
              className="w-full h-full object-contain"
              src={product.images[1].url}
              alt=""
            />
          </div>
        </div>
        <div className="border border-gray-300 h-[1px]"></div>

        <section className="p-4 h-auto">
          <h3 className="text-gray-400 font-bold pt-2">{product.brand}</h3>
          <h4 className="text-black-500 font-bold pl-2 pb-4">{product.title}</h4>

          <h4 className="text-gray-400 font-bold text-sm">Price </h4>
          <h4 className="text-black-500 font-bold">${product.price}</h4>

          <button
            className="bg-red-500 text-white rounded-full text-2xl w-[40px] h-[40px] absolute bottom-3 right-3"
            onClick={handleClickAddProduct}
          >
            <i className="bx bx-cart text-center"></i>
          </button>
        </section>
      </article>
    </Link>
  );
};
export default Product;
