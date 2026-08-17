import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FiEdit2,
  FiTrash2,
  FiHeart,
  FiMessageCircle
} from "react-icons/fi";

import API from "../api/axios";

function Dashboard() {

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    fetchBlogs();

  }, []);

  const fetchBlogs = async () => {

    try {

      const response = await API.get("/blogs");

      setBlogs(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE BLOG

  const deleteBlog = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(

        `/blogs/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      toast.success("Story deleted ✨");

      fetchBlogs();

    } catch (error) {

      console.log(error);

      toast.error("Delete failed");

    }

  };

  // TOTAL LIKES

  const totalLikes = blogs.reduce(

    (acc, blog) =>

      acc + (blog.likedBy?.length || 0),

    0

  );

  // TOTAL COMMENTS

  const totalComments = blogs.reduce(

    (acc, blog) =>

      acc + (blog.comments?.length || 0),

    0

  );

  return (

    <div className="min-h-screen bg-[#FFF9F5] relative overflow-hidden px-6 py-8">

      {/* BACKGROUND BLUR */}

      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#F9A8D4]/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#A78BFA]/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* DASHBOARD TOP */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl border border-[#F1E5DC] rounded-[32px] shadow-xl p-6 md:p-8 mb-10"
        >

          <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">

            {/* LEFT */}

            <div className="flex items-center gap-5">

              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center text-white text-4xl shadow-lg">

                👤

              </div>

              <div>

                <h1 className="text-4xl md:text-5xl font-serif text-[#2B2D42]">

                  Creator Dashboard

                </h1>

                <p className="text-gray-500 mt-2 text-lg">

                  Manage your stories and track engagement.

                </p>

              </div>

            </div>

            {/* STATS */}

            <div className="flex gap-4 flex-wrap justify-center">

              <div className="bg-[#F8F1EC] rounded-[22px] w-28 h-28 flex flex-col justify-center items-center shadow-md">

                <h2 className="text-3xl font-bold text-[#A78BFA]">

                  {blogs.length}

                </h2>

                <p className="text-gray-600 mt-1">

                  Stories

                </p>

              </div>

              <div className="bg-[#F8F1EC] rounded-[22px] w-28 h-28 flex flex-col justify-center items-center shadow-md">

                <h2 className="text-3xl font-bold text-[#F9A8D4]">

                  {totalLikes}

                </h2>

                <p className="text-gray-600 mt-1">

                  Likes

                </p>

              </div>

              <div className="bg-[#F8F1EC] rounded-[22px] w-28 h-28 flex flex-col justify-center items-center shadow-md">

                <h2 className="text-3xl font-bold text-[#7DD3FC]">

                  {totalComments}

                </h2>

                <p className="text-gray-600 mt-1">

                  Comments

                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* CREATE BUTTON */}

        <div className="flex justify-end mb-10">

          <button
            onClick={() => navigate("/create")}
            className="bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white px-8 py-4 rounded-full text-lg shadow-xl hover:scale-105 transition duration-300"
          >

            ✍️ Create Story

          </button>

        </div>

        {/* BLOG GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog) => (

            <motion.div
              key={blog._id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[32px] overflow-hidden border border-[#F1E5DC] shadow-lg hover:shadow-2xl transition duration-500 flex flex-col"
            >

              {/* IMAGE */}

              <div className="h-64 overflow-hidden bg-[#F8F1EC]">

                <img
                  src={
                    blog.image
                      ? `http://localhost:5000/uploads/${blog.image}`
                      : `https://picsum.photos/600/400?random=${blog._id}`
                  }

                  alt={blog.title}

                  className="w-full h-full object-cover"

                  loading="lazy"

                  onError={(e) => {

                    e.target.src =
                      "https://picsum.photos/800/500";

                  }}
                />

              </div>

              {/* CONTENT */}

              <div className="p-6 flex flex-col flex-1">

                {/* CATEGORY */}

                <div className="flex items-center gap-3 mb-4 flex-wrap">

                  <span className="bg-pink-100 text-gray-700 px-3 py-1 rounded-full text-sm">

                    {blog.category || "Other"}

                  </span>

                  <span className="text-gray-500 text-sm">

                    {new Date(blog.createdAt).toLocaleDateString()}

                  </span>

                </div>

                {/* TITLE */}

                <h2 className="text-3xl font-serif text-[#2B2D42] leading-tight mb-4 line-clamp-2 min-h-[80px]">

                  {blog.title}

                </h2>

                {/* CONTENT */}

                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 min-h-[80px]">

                  {blog.content.slice(0, 120)}...

                </p>

                {/* STATS */}

                <div className="flex items-center gap-6 text-gray-500 mb-6">

                  <div className="flex items-center gap-2">

                    <FiHeart />

                    <span>

                      {blog.likedBy?.length || 0}

                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <FiMessageCircle />

                    <span>

                      {blog.comments?.length || 0}

                    </span>

                  </div>

                </div>

                {/* ACTION BUTTONS */}

                <div className="flex gap-3 mt-auto">

                  <button
                    onClick={() =>
                      navigate(`/blog/${blog._id}`)
                    }
                    className="flex-1 bg-[#A78BFA] text-white py-3 rounded-full hover:scale-105 transition"
                  >

                    Read

                  </button>

                  <button
                    onClick={() =>
                      navigate(`/edit/${blog._id}`)
                    }
                    className="w-14 h-14 rounded-full bg-[#7DD3FC] text-white flex items-center justify-center hover:scale-105 transition"
                  >

                    <FiEdit2 />

                  </button>

                  <button
                    onClick={() =>
                      deleteBlog(blog._id)
                    }
                    className="w-14 h-14 rounded-full bg-[#FCA5A5] text-white flex items-center justify-center hover:scale-105 transition"
                  >

                    <FiTrash2 />

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;