import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useForm } from "react-hook-form";
import loggedInUser from "../contexts/logedInUser";
const SignupComponent = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { setUser } = useContext(loggedInUser)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUp = async (signupdata) => {
    if (signupdata.password !== signupdata.confirmPassword) {
      alert("Password does not match. Please check again");
      return;
    }
    const data = {
      email: signupdata.email,
      password: signupdata.password,
      username: signupdata.username,
      firstName: signupdata.firstName,
      lastName: signupdata.lastName,
    };
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    );
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 10 * 60 * 60 * 1000);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      setUser(signupdata.email)
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-black overflow-auto text-gray-200">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Link to={"/"}>
          <Icon icon="logos:spotify" width="150" />
        </Link>
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        {/*  I will have my 2 inputs(email and password) and I will have my sign up instead button*/}
        <div className="font-bold mb-4 text-2xl">
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
            register={register}
            errors={errors}
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            registerName="username"
            register={register}
            errors={errors}
          />
          <PasswordInput
            label="Create Password"
            placeholder="create a strong password"
            registerName="password"
            register={register}
            errors={errors}
            className="my-6"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Enter password again"
            registerName="confirmPassword"
            register={register}
            errors={errors}
            className="my-6"
          />
          <TextInput
            label="First Name"
            placeholder="Enter Your First Name"
            className="my-6"
            registerName="firstName"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter Your Last Name"
            registerName="lastName"
            register={register}
            errors={errors}
          />
          <div className=" w-full flex items-center justify-center  transition-shadow  my-8">
            <button
              type="submit"
              className="bg-green-600 font-semibold p-3 px-10 rounded-full "
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-lg">
          Already have an account?
        </div>
        <div className="border border-gray-500 hover:border-gray-400 text-gray-500 hover:text-gray-400 w-full flex items-center justify-center py-4 rounded-full font-bold bg-transparent transition-shadow">
          <Link to="/login">LOG IN INSTEAD</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
