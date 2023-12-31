import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import loggedInUser from "../contexts/logedInUser";
import ErrorMsg from "../components/shared/ErrorMsg";
import SuccessMsg from "../components/shared/SuccessMsg";
const LoginComponent = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { setUserFirstName } = useContext(loggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(loggedInUser);

  const login = async (loginData) => {
    try {
      const data = { email: loginData.email, password: loginData.password };
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        data
      );
      if (response && !response.err) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 10 * 60 * 60 * 1000);
        setCookie("token", token, { path: "/", expires: date });

        setUserFirstName(loginData.email);
        setUser(loginData.email);

        setSuccess("Success");
        setError(null);
        setTimeout(() => {
          setSuccess(null);
          navigate("/");
        }, 5000);
      } else {
        setError(response?.err || "Login failed");
        setSuccess(null);
      }
    } catch (err) {
      setError("An error occurred");
      setSuccess(null);
    }
  };

  const closeErrorSuccess = () => {
    setSuccess("");
    setError("");
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-black overflow-auto ">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Link to={"/"}>
          <Icon icon="logos:spotify" width="150" />
        </Link>
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col text-gray-200 ">
        <div className="font-bold mb-4">To continue, log in to Spotify.</div>
        <form
          onSubmit={handleSubmit((data) => login(data))}
          className="w-full "
        >
          <TextInput
            label="Email Address"
            placeholder=" Enter your email"
            className="my-6"
            register={register}
            registerName={"email"}
            errors={errors.email}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your Password"
            register={register}
            registerName={"password"}
            errors={errors.password}
          />
          <div className=" w-full flex items-center justify-end my-8 transition-shadow ">
            <button className="bg-green-600 font-semibold p-3 px-10 rounded-full ">
              LOG IN
            </button>
          </div>
          {error && errors && (
            <ErrorMsg
              errText={error || errors}
              closeError={closeErrorSuccess}
            />
          )}
          {success && (
            <SuccessMsg
              successText={success}
              closeSuccess={closeErrorSuccess}
            />
          )}
        </form>
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-lg ">
          Don't have an account?
        </div>
        <div className="border border-gray-500 hover:border-gray-400 text-gray-500 hover:text-gray-400 w-full flex items-center justify-center py-4 rounded-full font-bold bg-transparent transition-shadow">
          <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
