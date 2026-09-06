import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";

function Signup() {
  let navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (values) => {
    setIsLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      let { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        values
      );
      setIsLoading(false);
      if (data?.msg == "done") {
        setSuccessMsg("Account created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.response?.data?.msg || "Something went wrong");
    }
  };

  const validation = Yup.object().shape({
    name: Yup.string()
      .min(3, "name must be 3 characters")
      .max(20, "name must be less than 20 characters")
      .required("name is reqiired"),
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,20}$/,
        "password must be between 6 and 20 characters"
      )
      .required("password is required"),
    age: Yup.number()
      .min(18, "age must be at least 18 years old")
      .max(99, "age must be less than 99 years old")
      .required("age is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone number is not valid")
      .required("phone is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", age: "", phone: "" },
    onSubmit: handleRegister,
    validationSchema: validation,
  });

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Sign up to get started
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
              type="text"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                placeholder="Age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                name="age"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.age && formik.touched.age && (
                <p className="text-red-600 text-xs mt-1">{formik.errors.age}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                name="phone"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-600 text-xs mt-1">{formik.errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isloading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        >
          {isloading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>

        <p className="mt-5 text-sm text-gray-600 flex justify-between items-center">
          Already have an account?
          <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Signup;