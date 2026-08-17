import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useParams } from "react-router-dom";

import {
  FiHeart,
  FiSend,
  FiMessageCircle
} from "react-icons/fi";

import toast from "react-hot-toast";

import API from "../api/axios";

function SingleBlog() {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const [comment, setComment] = useState("");

  useEffect(() => {

    fetchBlog();

  }, []);

  const fetchBlog = async () => {

    try {

      const response = await API.get(`/blogs/${id}`);

      setBlog(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // LIKE BLOG

  const likeBlog = async () => {

    try {

      const token = localStorage.getItem("token");

      await API.put(

        `/blogs/like/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      fetchBlog();

    } catch (error) {

      console.log(error);

    }

  };

  // ADD COMMENT

  const addComment = async () => {

    if (!comment) {

      return toast.error("Write a comment");

    }

    try {

      const token = localStorage.getItem("token");

      await API.post(

        `/blogs/comment/${id}`,

        {
          text: comment
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      toast.success("Comment added ✨");

      setComment("");

      fetchBlog();

    } catch (error) {

      console.log(error);

      toast.error("Comment failed");

    }

  };

  if (!blog) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#FFF9F5]">

        <h1 className="text-3xl text-gray-400">

          Loading...

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#FFF9F5] px-4 py-10 relative overflow-hidden">

      {/* BACKGROUND BLURS */}

      <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-[#F9A8D4]/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-[#A78BFA]/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* BLOG IMAGE */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          className="overflow-hidden rounded-[32px] shadow-xl mb-8"
        >

          <img
            src={
              blog.image
                ? `http://localhost:5000/${blog.image}`
                : `https://picsum.photos/1200/600?random=${blog._id}`
            }

            alt="blog"

            className="w-full h-[320px] md:h-[420px] object-cover"
          />

        </motion.div>

        {/* BLOG CONTENT */}

        <motion.div
          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          className="bg-white rounded-[32px] p-6 md:p-10 shadow-xl border border-[#F1E5DC]"
        >

          {/* CATEGORY */}

          <div className="mb-5">

            <span className="bg-pink-100 text-gray-700 px-4 py-2 rounded-full text-sm">

              {blog.category || "Other"}

            </span>

          </div>

          {/* TITLE */}

          <h1 className="text-4xl md:text-5xl text-[#2B2D42] leading-tight mb-6 font-serif">

            {blog.title}

          </h1>

          {/* AUTHOR */}

          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">

            <p className="text-gray-500 text-lg">

              By {blog.author?.name}

            </p>

            <p className="text-gray-400 text-sm">

              {new Date(blog.createdAt).toLocaleDateString()}

            </p>

          </div>

          {/* CONTENT */}

          <div className="text-gray-700 text-lg leading-[2] whitespace-pre-line">

            {blog.content}

          </div>

          {/* ACTIONS */}

          <div className="mt-10 flex items-center gap-4 flex-wrap">

            <button
              onClick={likeBlog}

              className="flex items-center gap-2 bg-[#FFE4EC] text-pink-500 px-5 py-3 rounded-full hover:scale-105 transition shadow-sm"
            >

              <FiHeart />

              {blog.likedBy?.length || 0}

            </button>

            <div className="flex items-center gap-2 bg-[#EEF7FF] text-[#4A90E2] px-5 py-3 rounded-full shadow-sm">

              <FiMessageCircle />

              {blog.comments?.length || 0}

            </div>

          </div>

        </motion.div>

        {/* COMMENTS SECTION */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          className="mt-10 bg-white rounded-[32px] p-6 md:p-10 shadow-xl border border-[#F1E5DC]"
        >

          <h2 className="text-3xl md:text-4xl text-[#2B2D42] mb-8 font-serif">

            Comments 💬

          </h2>

          {/* COMMENT INPUT */}

          <div className="flex gap-3 mb-8">

            <input
              type="text"

              placeholder="Write a thoughtful comment..."

              value={comment}

              onChange={(e) => setComment(e.target.value)}

              className="flex-1 bg-[#F8F1EC] border border-[#F1E5DC] rounded-full px-5 py-4 text-base outline-none"
            />

            <button
              onClick={addComment}

              className="bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white px-6 rounded-full shadow-md hover:scale-105 transition"
            >

              <FiSend size={20} />

            </button>

          </div>

          {/* COMMENTS */}

          <div className="space-y-4">

            {blog.comments?.length === 0 && (

              <p className="text-gray-400 text-base">

                No comments yet.

              </p>

            )}

            {blog.comments?.map((item, index) => (

              <div
                key={index}

                className="bg-[#FFF9F5] border border-[#F1E5DC] rounded-[24px] p-5"
              >

                <h3 className="text-lg text-[#2B2D42] mb-2 font-serif">

                  {item.user?.name || "User"}

                </h3>

                <p className="text-gray-600 leading-relaxed">

                  {item.text}

                </p>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </div>

  );

}

export default SingleBlog;