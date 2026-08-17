import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function SavedBlogs() {

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    fetchSavedBlogs();

  }, []);

  const fetchSavedBlogs = async () => {

    try {

      const response = await API.get("/blogs");

      const userId = localStorage.getItem("userId");

      const saved = response.data.filter((blog) =>

        blog.bookmarkedBy?.includes(userId)

      );

      setBlogs(saved);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-[#FFF9F5] px-6 py-16">

      {/* HEADER */}

      <div className="text-center mb-16">

        <h1 className="text-7xl text-[#2B2D42] mb-6">

          Saved Stories 🔖

        </h1>

        <p className="text-2xl text-gray-500">

          Your personal pastel reading collection.

        </p>

      </div>


      {/* EMPTY */}

      {blogs.length === 0 && (

        <div className="text-center mt-32">

          <h2 className="text-5xl text-gray-400 mb-6">

            No saved stories yet

          </h2>

          <p className="text-gray-500 text-xl">

            Bookmark beautiful stories to see them here.

          </p>

        </div>

      )}


      {/* BLOGS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {blogs.map((blog) => (

          <motion.div
            key={blog._id}

            whileHover={{ y: -10 }}

            className="bg-white rounded-[40px] overflow-hidden border border-[#F1E5DC] shadow-lg hover:shadow-2xl transition duration-500"
          >

            {/* IMAGE */}

            <div className="h-72 overflow-hidden">

              <img
                src={
                  blog.image
                    ? `http://localhost:5000/${blog.image}`
                    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                }

                alt="blog"

                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />

            </div>


            {/* CONTENT */}

            <div className="p-8">

              <div className="flex items-center gap-4 mb-6">

                <span className="bg-pink-100 text-gray-700 px-4 py-2 rounded-full">

                  {blog.category || "Other"}

                </span>

              </div>

              <h2 className="text-4xl text-[#2B2D42] leading-tight mb-5">

                {blog.title}

              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">

                {blog.content.slice(0, 90)}...

              </p>

              <button
                onClick={() => navigate(`/blog/${blog._id}`)}

                className="w-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white py-4 rounded-full text-lg shadow-lg hover:scale-[1.02] transition duration-300"
              >

                Read story ✨

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  );

}

export default SavedBlogs;