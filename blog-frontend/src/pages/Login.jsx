import { useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async () => {

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "userId",
        response.data._id
      );

      toast.success("Welcome back ✨");

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="min-h-screen bg-[#FFF9F5] overflow-hidden relative flex items-center justify-center px-6">

      {/* BACKGROUND BLOBS */}

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-[#F9A8D4]/40 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#A78BFA]/40 rounded-full blur-3xl"></div>

      <div className="absolute top-[30%] right-[10%] w-[200px] h-[200px] bg-[#7DD3FC]/30 rounded-full blur-3xl"></div>


      {/* LOGIN CARD */}

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.7 }}

        className="relative w-full max-w-lg bg-white/70 backdrop-blur-2xl border border-white shadow-2xl rounded-[45px] p-10 md:p-14"
      >

        {/* TOP TEXT */}

        <div className="text-center mb-10">

          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center text-white text-4xl shadow-lg">

            ✨

          </div>

          <h1 className="text-6xl text-[#2B2D42]">

            Welcome to Crumb Stories!!

          </h1>

          <p className="text-gray-500 text-lg mt-4">

            Sign in to continue your writing journey.

          </p>

        </div>


        {/* INPUTS */}

        <div className="space-y-6">

          <input
            type="email"
            name="email"
            placeholder="Email address"

            onChange={handleChange}

            className="w-full bg-[#F8F1EC] border border-[#F1E5DC] rounded-full px-7 py-5 text-lg outline-none focus:ring-4 focus:ring-[#E9D5FF] transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"

            onChange={handleChange}

            className="w-full bg-[#F8F1EC] border border-[#F1E5DC] rounded-full px-7 py-5 text-lg outline-none focus:ring-4 focus:ring-[#E9D5FF] transition"
          />

        </div>


        {/* LOGIN BUTTON */}

        <button
          onClick={handleSubmit}

          className="w-full mt-8 bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white py-5 rounded-full text-xl shadow-xl hover:scale-[1.02] transition duration-300"
        >

          Sign in ✨

        </button>


        {/* FOOTER */}

        <p className="text-center text-gray-500 mt-8 text-lg">

          Don’t have an account?

          <Link
            to="/register"

            className="text-[#A78BFA] ml-2 hover:underline"
          >

            Create one

          </Link>

        </p>

      </motion.div>

    </div>

  );

}

export default Login;