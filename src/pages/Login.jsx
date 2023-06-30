import { useForm } from "react-hook-form";
import { loginUser, logoutUser } from "../store/slices/userInfo.slice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { token, user } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const submit = (dataForm) => {
    dispatch(loginUser(dataForm));
  };

  const handleClickLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <section className="bg-gray-100 grid place-content-center px-2">
      {token ? (
        <section className="grid justify-center text-center bg-white rounded-xl p-4 w-[300px] gap-6">
            <i className='bx bxs-user-circle text-9xl text-gray-300'></i>
            <span className="font-bold">{user.firstName} {user.lastName}</span>
            <button onClick={handleClickLogout} className="block w-[250px] py-2 bg-red-500 text-white hover:bg-red-600 transition-colors rounded-md">Log out</button>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-white rounded-xl p-4 max-w-[350px] grid gap-6"
        >
          <h3 className="font-semibold text-xl">
            Welcome! Enter your email and password to continue
          </h3>

          <section className="bg-cyan-100 p-4 py-2 rounded-md">
            <h4 className="text-center font-bold mb-4">Test data</h4>

            <div className="flex items-center gap-2">
              <i className="bx bx-envelope text-xl"></i>
              <span>john@gmail.com</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="bx bx-lock text-xl"></i>
              <span>john1234</span>
            </div>
          </section>

          <div className="grid gap-2">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="border-[1px] border-gray-300 outline-none p-2 rounded-md"
              type="email"
              id="email"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className="border-[1px] border-gray-300 outline-none p-2 rounded-sm"
              type="password"
              id="password"
            />
          </div>

          <button className="block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors">
            Login
          </button>

          <span className="text-sm">Don't have an account? Sign up</span>
        </form>
      )}
    </section>
  );
};
export default Login;
