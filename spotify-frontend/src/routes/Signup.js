import { useState } from "react";
import { useCookies } from "react-cookie";
import { Icon } from "@iconify/react";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makePOSTRequest } from "../utils/serverHelpers";
import { useForm } from "react-hook-form";
import profileColor from "../containers/profileColor";
import { toast } from "react-toastify";
const SignupComponent = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * profileColor.length);
    const colorCombo = profileColor[randomIndex];
    return colorCombo;
  };

  const signUp = async (signupdata) => {
    try {
      setLoading(true);
      if (signupdata.password !== signupdata.confirmPassword) {
        toast.error("Password does not match. Please check again");
        return; // Return early if passwords do not match
      }
      const colorsCombo = getRandomColor();

      const data = {
        email: signupdata.email,
        password: signupdata.password,
        username: signupdata.username,
        firstName: signupdata.firstName,
        lastName: signupdata.lastName,
        profileBackground: colorsCombo.background,
        profileText: colorsCombo.text,
      };

      const response = await makePOSTRequest("/auth/register", data);

      if (response && !response.err) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 10 * 60 * 60 * 1000);
        toast.success("Successfully Signup");
        setCookie("token", token, { path: "/", expires: date });
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
        navigate("/");
      } else {
        toast.error(response.err);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-black overflow-auto text-lightGray-light">
      <div className="logo p-5 border-b border-solid border-lightGray-light w-full flex justify-center">
        <Link to={"/"}>
          <Icon icon="logos:spotify" width="150" />
        </Link>
      </div>
      <div className="inputRegion w-full px-5 sm:w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-4 text-2xl text-center">
          Sign up for free to start listening.
        </div>
        <form
          className="w-full"
          onSubmit={handleSubmit((data) => {
            signUp(data);
          })}
        >
          <TextInput
            label="Email address"
            placeholder="Enter your email"
            className="my-6"
            registerName="email"
            pattern={"/^[w-.]+@([w-]+.)+[w-]{2,}$/gm"}
            patternErr={
              "email should have \n1. 1 Uppercase\n2. 1 lowecase\n3. 1 special character\n4. 1 number"
            }
            register={register}
            error={errors?.email?.message}
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            registerName="username"
            register={register}
            pattern={"^[a-zA-Z0-9_.-]+$"}
            patternErr={"only underscore, alphanumber, dash allowed"}
            error={errors?.username?.message}
          />
          <PasswordInput
            label="Create Password"
            placeholder="create a strong password"
            registerName="password"
            register={register}
            pattern={
              "/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.-_*])([a-zA-Z0-9@#$%^&+=*.-_]){3,}$/"
            }
            patternErr={
              "create a strong password\n a number\n a lowercase\n a uppercase\n a special character"
            }
            error={errors?.password?.message}
            className="my-6"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Enter password again"
            registerName="confirmPassword"
            register={register}
            error={errors?.confirmPassword?.message}
            className="my-6"
          />
          <TextInput
            label="First Name"
            placeholder="Enter Your First Name"
            className="my-6"
            registerName="firstName"
            register={register}
            error={errors?.firstName?.message}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter Your Last Name"
            registerName="lastName"
            register={register}
            error={errors?.lastName?.message}
          />
          <div className=" w-full flex items-center justify-center  transition-shadow  my-8">
            <button
              disabled={loading}
              type="submit"
              className="bg-green-600 font-semibold p-3 px-10 rounded-full "
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
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="w-full border border-solid border-lightGray-light"></div>
        <div className="my-6 font-semibold text-lg">
          Already have an account?
        </div>
        <Link to="/login" className="w-full">
          <div className="border border-lightGray hover:border-lightGray text-lightGray hover:text-lightGray  w-full flex items-center justify-center py-4 rounded-full font-bold bg-transparent transition-shadow">
            LOG IN INSTEAD
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignupComponent;
