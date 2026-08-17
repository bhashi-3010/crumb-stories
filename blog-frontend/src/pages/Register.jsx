import { useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
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

      await API.post(
        "/auth/register",
        formData
      );

      toast.success("Account created successfully ✨");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="min-h-screen bg-[#FFF9F5] overflow-hidden relative flex items-center justify-center px-6 py-10">

      {/* BACKGROUND BLOBS */}

      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#A78BFA]/40 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#F9A8D4]/40 rounded-full blur-3xl"></div>

      <div className="absolute top-[20%] right-[15%] w-[180px] h-[180px] bg-[#7DD3FC]/30 rounded-full blur-3xl"></div>


      {/* REGISTER CARD */}

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.7 }}

        className="relative w-full max-w-xl bg-white/70 backdrop-blur-2xl border border-white shadow-2xl rounded-[36px] p-8 md:p-10"
      >

        {/* TOP SECTION */}

        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center text-white text-3xl shadow-lg">

            🌸

          </div>

          <h1 className="text-5xl md:text-6xl text-[#2B2D42] leading-tight font-serif">

            Join Crumb Stories

          </h1>

          <p className="text-gray-500 text-base mt-4">

            Start sharing your creativity with the world ✨

          </p>

        </div>


        {/* INPUTS */}

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full name"

            onChange={handleChange}

            className="w-full bg-[#F8F1EC] border border-[#F1E5DC] rounded-full px-6 py-4 text-base outline-none focus:ring-4 focus:ring-[#E9D5FF] transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"

            onChange={handleChange}

            className="w-full bg-[#F8F1EC] border border-[#F1E5DC] rounded-full px-6 py-4 text-base outline-none focus:ring-4 focus:ring-[#E9D5FF] transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"

            onChange={handleChange}

            className="w-full bg-[#F8F1EC] border border-[#F1E5DC] rounded-full px-6 py-4 text-base outline-none focus:ring-4 focus:ring-[#E9D5FF] transition"
          />

        </div>


        {/* REGISTER BUTTON */}

        <button
          onClick={handleSubmit}

          className="w-full mt-7 bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white py-4 rounded-full text-lg shadow-xl hover:scale-[1.02] transition duration-300"
        >

          Create account ✨

        </button>


        {/* FOOTER */}

        <p className="text-center text-gray-500 mt-7 text-base">

          Already have an account?

          <Link
            to="/login"

            className="text-[#A78BFA] ml-2 hover:underline"
          >

            Sign in

          </Link>

        </p>

      </motion.div>

    </div>

  );

}

export default Register;