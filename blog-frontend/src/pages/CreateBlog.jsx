import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Sparkles, ImagePlus } from "lucide-react";
import API from "../api/axios";

function CreateBlog() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      await API.post(
        "/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Story published ✨");

      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      setPreview("");

    } catch (error) {

      toast.error("Failed to publish");
      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-[#FFF9F5] px-4 py-8 relative overflow-hidden">

      {/* BACKGROUND BLURS */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 opacity-20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-2xl mx-auto bg-white/90 backdrop-blur-xl rounded-[32px] border border-[#F1E5DC] shadow-2xl p-6 md:p-8"
      >

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center mx-auto mb-4 shadow-lg">

            <Sparkles className="text-white" size={30} />

          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-[#2B2D42] mb-2">

            Create Story

          </h1>

          <p className="text-gray-500 text-base md:text-lg">

            Share your beautiful thoughts with the world ✨

          </p>

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}

          <div>

            <label className="block text-sm mb-2 text-[#2B2D42] font-medium">

              Story Title

            </label>

            <input
              type="text"
              placeholder="Enter your story title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#FFF9F5] border border-[#E9DCD2] rounded-2xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-[#A78BFA] transition"
              required
            />

          </div>

          {/* CATEGORY */}

          <div>

            <label className="block text-sm mb-2 text-[#2B2D42] font-medium">

              Category

            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#FFF9F5] border border-[#E9DCD2] rounded-2xl px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#A78BFA]"
              required
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

          <div>

            <label className="block text-sm mb-2 text-[#2B2D42] font-medium">

              Story Content

            </label>

            <textarea
              rows="6"
              placeholder="Write your beautiful story here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#FFF9F5] border border-[#E9DCD2] rounded-2xl px-5 py-4 text-base outline-none resize-none focus:ring-2 focus:ring-[#A78BFA]"
              required
            />

          </div>

          {/* IMAGE */}

          <div>

            <label className="block text-sm mb-3 text-[#2B2D42] font-medium">

              Upload Cover Image

            </label>

            <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#E9DCD2] bg-[#FFF9F5] rounded-2xl p-6 cursor-pointer hover:border-[#A78BFA] transition">

              <ImagePlus
                size={30}
                className="text-[#A78BFA] mb-3"
              />

              <p className="text-sm text-gray-600">

                Click to upload image

              </p>

              <p className="text-xs text-gray-400 mt-1">

                PNG, JPG, JPEG supported

              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

          </div>

          {/* IMAGE PREVIEW */}

          {preview && (

            <div className="rounded-2xl overflow-hidden shadow-md border border-[#F1E5DC]">

              <img
                src={preview}
                alt="preview"
                className="w-full h-56 object-cover"
              />

            </div>

          )}

          {/* BUTTON */}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white py-4 rounded-full text-lg shadow-lg hover:shadow-2xl transition"
          >

            {loading
              ? "Publishing..."
              : "Publish Story ✨"}

          </motion.button>

        </form>

      </motion.div>

    </div>

  );
}

export default CreateBlog;