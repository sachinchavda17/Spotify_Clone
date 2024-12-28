import { useState } from "react";
import { Icon } from "@iconify/react";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makePOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "../images/logo4.png";

const LoginComponent = () => {
  const [cookies, setCookie] = useCookies(["token"]);
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
      const response = await makePOSTRequest("/auth/login", data);

      if (response && !response.err) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 10 * 60 * 60 * 1000);

        // Store login details in local storage
        toast.success("Successfully Login");
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            isArtist: response.isArtist,
            joinDate: response.joinDate,
            username: response.username,
            _id: response._id,
          })
        );
        setCookie("token", token, { path: "/", expires: date });
        navigate("/");
      } else {
        toast.error(response?.err || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("An error occurred" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* {loading && <Loading fullScreen={true} />} */}
      <div className="w-full h-full flex flex-col items-center bg-black overflow-auto ">
        <div className="logo p-5 border-b border-solid border-lightGray-light w-full flex justify-center">
          <Link to={"/"} className="flex justify-center">
              <img
                src={logo}
                alt="BeatFlow logo"
                width={125}
                className="hover:opacity-80"
              />
          </Link>
        </div>
        <div className="inputRegion w-full px-5 sm:w-1/3 py-10 flex items-center justify-center flex-col text-lightGray-light">
          <div className="font-bold mb-4 text-center">
            To continue, log in to BeatFlow.
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
            <div className=" w-full flex items-center justify-end mb-8 mt-4 transition-shadow ">
              <button
                disabled={loading}
                className="bg-primary font-semibold p-3 px-8 rounded-full"
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
          <div className="w-full border border-solid border-lightGray-light"></div>
          <div className="my-4 font-semibold text-lg">
            Don't have an account?
          </div>

          <Link to="/signup" className="w-full">
            <div className="border border-lightGray hover:border-lightGray text-lightGray hover:text-lightGray w-full flex items-center justify-center py-4 rounded-full font-bold bg-transparent transition-shadow">
              SIGN UP FOR BEATFLOW
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
