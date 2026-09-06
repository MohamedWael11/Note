import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { UserContext } from "../Context/Context";

function Login() {
  let { setToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (values) => {
    setIsLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      let { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
        values
      );
      setIsLoading(false);
      if (data?.msg == "done") {
        setSuccessMsg("Account logged successfully");
        setTimeout(() => {
          navigate("/");
        }, 1500);
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.response?.data?.msg || "Something went wrong");
    }
  };

  const validation = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,20}$/,
        "password must be between 6 and 20 characters"
      )
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: handleLogin,
    validationSchema: validation,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl mx-auto my-16 w-[90%] sm:w-[420px]"
    >
      <h2 className="text-3xl font-bold mb-1 text-center text-gray-800">
        Welcome Back
      </h2>
      <p className="text-center text-gray-400 text-sm mb-6">
        Login to your account
      </p>

      {successMsg && (
        <p className="text-green-700 bg-green-50 border border-green-200 rounded-lg text-sm font-medium py-2 px-3 mb-4 text-center">
          {successMsg}
        </p>
      )}
      {errorMsg && (
        <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg text-sm font-medium py-2 px-3 mb-4 text-center">
          {errorMsg}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <input
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isloading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
      >
        {isloading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
      </button>

      <p className="mt-5 text-sm text-gray-600 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700">
          Register now
        </Link>
      </p>
    </form>
  );
}
export default Login;