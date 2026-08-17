import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";

import API from "../api/axios";

function EditBlog() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    title: "",
    content: "",
    category: ""

  });

  const [image, setImage] = useState(null);

  useEffect(() => {

    fetchBlog();

  }, []);

  const fetchBlog = async () => {

    try {

      const response = await API.get(`/blogs/${id}`);

      setFormData({

        title: response.data.title,

        content: response.data.content,

        category: response.data.category || ""

      });

    } catch (error) {

      console.log(error);

    }

  };


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  const handleImageChange = (e) => {

    setImage(e.target.files[0]);

  };


  const handleSubmit = async () => {

    try {

      const token = localStorage.getItem("token");

      const updatedData = new FormData();

      updatedData.append("title", formData.title);

      updatedData.append("content", formData.content);

      updatedData.append("category", formData.category);

      if (image) {

        updatedData.append("image", image);

      }

      await API.put(
        `/blogs/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Story updated ✨");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error("Update failed");

    }

  };

  return (

    <div className="min-h-screen bg-[#FFF9F5] relative overflow-hidden px-6 py-16">

      {/* BLOBS */}

      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-[#F9A8D4]/40 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#A78BFA]/40 rounded-full blur-3xl"></div>


      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.7 }}

        className="relative max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl border border-white rounded-[50px] shadow-2xl p-8 md:p-14"
      >

        {/* HEADING */}

        <div className="mb-12 text-center">

          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center text-white text-4xl shadow-lg">

            ✏️

          </div>

          <h1 className="text-6xl text-[#2B2D42]">

            Edit your story

          </h1>

          <p className="text-gray-500 text-xl mt-5">

            Refine and improve your writing beautifully.

          </p>

        </div>


        {/* TITLE */}

        <div className="mb-8">

          <label className="block text-xl mb-4 text-gray-700">

            Story title

          </label>

          <input
            type="text"
            name="title"

            value={formData.title}

            onChange={handleChange}

            className="w-full bg-[#F8F1EC] border border-[#F1E5DC] rounded-[25px] px-7 py-5 text-xl outline-none focus:ring-4 focus:ring-[#E9D5FF] transition"
          />

        </div>


        {/* CATEGORY */}

        <div className="mb-8">

          <label className="block text-xl mb-4 text-gray-700">

            Category

          </label>

          <select
            name="category"

            value={formData.category}

            onChange={handleChange}

            className="w-full bg-[#F8F1EC] border border-[#F1E5DC] rounded-[25px] px-7 py-5 text-xl outline-none focus:ring-4 focus:ring-[#E9D5FF] transition"
          >

            <option value="">Choose category</option>

            <option value="Design">Design</option>

            <option value="Engineering">Engineering</option>

            <option value="Lifestyle">Lifestyle</option>

            <option value="Travel">Travel</option>

            <option value="Food">Food</option>

            <option value="Other">Other</option>

          </select>

        </div>


        {/* CONTENT */}

        <div className="mb-8">

          <label className="block text-xl mb-4 text-gray-700">

            Your story

          </label>

          <textarea
            rows="12"
            name="content"

            value={formData.content}

            onChange={handleChange}

            className="w-full bg-[#F8F1EC] border border-[#F1E5DC] rounded-[30px] px-7 py-6 text-lg outline-none resize-none focus:ring-4 focus:ring-[#E9D5FF] transition"
          />

        </div>


        {/* IMAGE */}

        <div className="mb-10">

          <label className="block text-xl mb-4 text-gray-700">

            Update cover image

          </label>

          <div className="border-2 border-dashed border-[#EADFD8] bg-[#FFFDFC] rounded-[30px] p-10 text-center">

            <input
              type="file"
              accept="image/*"

              onChange={handleImageChange}

              className="text-lg"
            />

            <p className="text-gray-500 mt-4">

              Upload a new image if you'd like to change it.

            </p>

          </div>

        </div>


        {/* BUTTON */}

        <button
          onClick={handleSubmit}

          className="w-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white py-5 rounded-full text-2xl shadow-xl hover:scale-[1.02] transition duration-300"
        >

          Save changes ✨

        </button>

      </motion.div>

    </div>

  );

}

export default EditBlog;