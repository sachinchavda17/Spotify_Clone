import {  useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import ErrorMsg from "../components/shared/ErrorMsg";
import SuccessMsg from "../components/shared/SuccessMsg";

const LoginComponent = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (loginData) => {
    try {
      setLoading(true);
      const data = { email: loginData.email, password: loginData.password };
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        data
      );

      if (response && !response.err) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 10 * 60 * 60 * 1000);

        // Store login details in local storage
        setLoading(false);
        setSuccess("Success");
        setError(null);
        setTimeout(() => {
          localStorage.setItem("currentUser", JSON.stringify(response));
          setCookie("token", token, { path: "/", expires: date });
          setSuccess(null);
          navigate("/");
        }, 3000);
      } else {
        setLoading(false);
        setError(response?.err || "Login failed");
        setSuccess(null);
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred" + err);
      setSuccess(null);
    }
  };

  const closeErrorSuccess = () => {
    setLoading(false);
    setSuccess("");
    setError("");
  };

  return (
    <div>
      {/* {loading && <Loading fullScreen={true} />} */}
      <div className="w-full h-full flex flex-col items-center bg-black overflow-auto ">
        <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
          <Link to={"/"} className="flex justify-center">
            <Icon icon="logos:spotify" width="150" className="w-auto h-12" />
          </Link>
        </div>
        <div className="inputRegion w-full px-5 sm:w-1/3 py-10 flex items-center justify-center flex-col text-gray-200">
          <div className="font-bold mb-4 text-center">
            To continue, log in to Spotify.
          </div>
          <form
            onSubmit={handleSubmit((data) => login(data))}
            className="w-full "
          >
            <TextInput
              label="Email Address"
              placeholder=" Enter your email"
              className="my-6 w-full"
              register={register}
              registerName={"email"}
              error={errors?.email?.message}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your Password"
              register={register}
              registerName={"password"}
              error={errors?.password?.message}
              className="w-full"
            />
            {error && (
              <ErrorMsg errText={error} closeError={closeErrorSuccess} />
            )}
            {success && (
              <SuccessMsg
                successText={success}
                closeSuccess={closeErrorSuccess}
              />
            )}
            <div className=" w-full flex items-center justify-end mb-8 mt-4 transition-shadow ">
              <button
                disabled={loading}
                className="bg-green-600 font-semibold p-3 px-8 rounded-full"
              >
                {loading ? (
                  <div className="px-3 py-0">
                    <Icon
                      icon="line-md:loading-alt-loop"
                      color="#eee"
                      width="27"
                      height="27"
                    />
                  </div>
                ) : (
                  "LOG IN"
                )}
              </button>
            </div>
          </form>
          <div className="w-full border border-solid border-gray-300"></div>
          <div className="my-4 font-semibold text-lg">
            Don't have an account?
          </div>

          <Link to="/signup" className="w-full">
            <div className="border border-gray-500 hover:border-gray-400 text-gray-500 hover:text-gray-400 w-full flex items-center justify-center py-4 rounded-full font-bold bg-transparent transition-shadow">
              SIGN UP FOR SPOTIFY
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
