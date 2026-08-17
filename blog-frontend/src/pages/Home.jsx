import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiHeart,
  FiMessageCircle
} from "react-icons/fi";

import API from "../api/axios";

function Home() {

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Design",
    "Engineering",
    "Lifestyle",
    "Travel",
    "Food",
    "Other"
  ];

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

  // FILTER BLOGS

  const filteredBlogs = blogs.filter((blog) => {

    const matchesSearch =
      blog.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  // FEATURED BLOG

  const featuredBlog = filteredBlogs[0];

  return (

    <div className="min-h-screen bg-[#FFF9F5] overflow-hidden relative">

      {/* BACKGROUND BLURS */}

      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#F9A8D4]/20 rounded-full blur-3xl"></div>

      <div className="absolute right-[-120px] top-[20%] w-[300px] h-[300px] bg-[#A78BFA]/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] left-[40%] w-[250px] h-[250px] bg-[#7DD3FC]/10 rounded-full blur-3xl"></div>

      {/* HERO */}

      <div className="relative z-10">

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">

          {/* BADGE */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#EEF6FF] text-[#2B2D42] px-5 py-2 rounded-full mb-8 shadow-sm text-sm"
          >

            ✨ A soft place to write

          </motion.div>

          {/* TITLE */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl leading-tight text-[#2B2D42] max-w-5xl mx-auto font-serif"
          >

            A Place for Stories

            <span className="text-[#C084FC]">
              {" "}Like Yours.
            </span>

          </motion.h1>

          {/* SUBTEXT */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed"
          >

            Crumb Stories is a calm, modern blogging space.
            Read thoughtful stories, share your own ideas,
            and join a gentle creative community.

          </motion.p>

          {/* BUTTONS */}

          <div className="flex flex-wrap justify-center gap-4 mt-10">

            <button
              onClick={() => navigate("/create")}
              className="bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white px-8 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition duration-300"
            >

              ✍️ Start writing

            </button>

            <button
              onClick={() => {

                window.scrollTo({
                  top: 800,
                  behavior: "smooth"
                });

              }}
              className="bg-white border border-[#EADFD8] text-[#2B2D42] px-8 py-4 rounded-full text-lg shadow-sm hover:bg-[#FFF4FB] transition duration-300"
            >

              Browse stories

            </button>

          </div>

        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="max-w-6xl mx-auto px-6 relative z-20">

        <div className="bg-white/70 backdrop-blur-xl border border-[#F1E5DC] rounded-[32px] p-5 shadow-md">

          <div className="flex flex-col lg:flex-row gap-5 items-center">

            {/* SEARCH */}

            <div className="flex items-center gap-3 bg-[#F8F1EC] rounded-full px-5 py-4 flex-1 w-full">

              <FiSearch className="text-xl text-gray-400" />

              <input
                type="text"
                placeholder="Search stories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-base"
              />

            </div>

            {/* FILTERS */}

            <div className="flex flex-wrap gap-3 justify-center">

              {categories.map((category) => (

                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`px-5 py-2 rounded-full text-sm transition duration-300

                  ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white shadow-md"
                      : "bg-white border border-[#EADFD8] text-gray-700 hover:bg-[#FFF4FB]"
                  }
                  `}
                >

                  {category}

                </button>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* FEATURED BLOG */}

      {featuredBlog && (

        <div className="max-w-6xl mx-auto px-6 mt-14">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 overflow-hidden rounded-[40px] bg-white shadow-xl border border-[#F1E5DC]"
          >

            {/* IMAGE */}

            <div className="h-[380px] overflow-hidden">

              <img
                src={
                  featuredBlog.image
                    ? `http://localhost:5000/uploads/${featuredBlog.image}`
                    : `https://picsum.photos/seed/${featuredBlog.title}/900/600`
                }
                alt={featuredBlog.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";
                }}
              />

            </div>

            {/* CONTENT */}

            <div className="p-8 md:p-10 flex flex-col justify-center">

              <div className="inline-block bg-pink-100 text-gray-700 px-4 py-2 rounded-full text-sm mb-6 w-fit">

                Featured • {featuredBlog.category || "Design"}

              </div>

              <h1 className="text-4xl md:text-5xl leading-tight text-[#2B2D42] mb-6 font-serif">

                {featuredBlog.title}

              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">

                {featuredBlog.content.slice(0, 180)}...

              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">

                <p className="text-lg text-gray-700">

                  By {featuredBlog.author?.name}

                </p>

                <button
                  onClick={() =>
                    navigate(`/blog/${featuredBlog._id}`)
                  }
                  className="bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white px-6 py-3 rounded-full text-base shadow-md hover:scale-105 transition duration-300"
                >

                  Read story →

                </button>

              </div>

            </div>

          </motion.div>

        </div>

      )}

      {/* BLOG GRID */}

      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredBlogs.slice(1).map((blog) => (

            <motion.div
              key={blog._id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[32px] overflow-hidden shadow-md border border-[#F1E5DC] hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >

              {/* IMAGE */}

              <div className="h-56 overflow-hidden bg-[#F8F1EC]">

                <img
                  src={
                    blog.image
                      ? `http://localhost:5000/uploads/${blog.image}`
                      : `https://picsum.photos/seed/${blog.title}/600/400`
                  }
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

              </div>

              {/* CONTENT */}

              <div className="p-6 flex flex-col flex-1">

                <div className="flex items-center gap-3 mb-5 flex-wrap">

                  <span className="bg-pink-100 text-gray-700 px-3 py-1 rounded-full text-sm">

                    {blog.category || "Other"}

                  </span>

                  <span className="text-gray-500 text-sm">

                    {new Date(blog.createdAt).toLocaleDateString()}

                  </span>

                </div>

                <h2 className="text-3xl text-[#2B2D42] leading-tight mb-4 font-serif line-clamp-2 min-h-[80px]">

                  {blog.title}

                </h2>

                <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3 min-h-[72px]">

                  {blog.content.slice(0, 100)}...

                </p>

                {/* FOOTER */}

                <div className="flex justify-between items-center mt-auto">

                  <div>

                    <h3 className="text-lg text-gray-700 font-serif">

                      {blog.author?.name}

                    </h3>

                  </div>

                  <div className="flex items-center gap-4 text-gray-500">

                    <div className="flex items-center gap-2">

                      <FiHeart />

                      {blog.likedBy?.length || 0}

                    </div>

                    <div className="flex items-center gap-2">

                      <FiMessageCircle />

                      {blog.comments?.length || 0}

                    </div>

                  </div>

                </div>

                {/* BUTTON */}

                <button
                  onClick={() =>
                    navigate(`/blog/${blog._id}`)
                  }
                  className="w-full mt-6 bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white py-3 rounded-full text-base shadow-md hover:scale-[1.02] transition duration-300"
                >

                  Read story ✨

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Home;