import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { modifyIsCartShowing } from "../../store/slices/cart.slice";

const Header = () => {
  const dispatch = useDispatch();

  const handleClickShowCart = () => dispatch(modifyIsCartShowing());

  return (
    <header className="relative">
    <div className="flex justify-between items-center">
      <Link className="text-[#f85555] font-bold text-3xl font-sans px-4" to="/">
        e-commerce
      </Link>

      <nav className="text-3xl w-[40%] grid grid-cols-3 items-center text-gray-400">
        <Link to="/login">
          <i className="bx bx-user mx-auto flex justify-center p-4 lg:border-l lg:border-gray-400 m-0"></i>
        </Link>
        <Link to="/purchases">
          <i className="bx bx-box mx-auto flex justify-center p-4 lg:border-l lg:border-gray-400 m-0"></i>
        </Link>
        <button onClick={handleClickShowCart}>
          <i className="bx bx-cart mx-auto flex justify-center p-4 lg:border-l lg:border-gray-400 m-0"></i>
        </button>
      </nav>
    </div>

    <div className="absolute bottom-0 left-0 w-full h-[1px] lg:bg-gray-400"></div>
  </header>
  );
};
export default Header;
