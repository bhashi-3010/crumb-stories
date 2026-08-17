import { Link, useLocation } from "react-router-dom";

import { motion } from "framer-motion";

import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { useState } from "react";

function Navbar() {

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const navLinks = [
    {
      name: "Explore",
      path: "/"
    },
    {
      name: "Create",
      path: "/create"
    }
  ];

  return (

    <motion.nav
      initial={{ y: -60, opacity: 0 }}

      animate={{ y: 0, opacity: 1 }}

      transition={{ duration: 0.5 }}

      className="sticky top-0 z-50 backdrop-blur-xl bg-[#FFF9F5]/75 border-b border-[#F1E5DC]"
    >

      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-3 flex justify-between items-center">

        {/* LOGO */}

        <Link
          to="/"

          className="flex items-center gap-3"
        >

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center shadow-md text-white text-lg">

            ✨

          </div>

          <div>

            <h1 className="text-2xl md:text-3xl font-serif text-[#C084FC] leading-none">

              Crumb Stories

            </h1>

            <p className="text-[11px] md:text-xs text-gray-500 mt-1">

              Creative Blogging Platform

            </p>

          </div>

        </Link>

        {/* DESKTOP NAV */}

        <div className="hidden md:flex items-center gap-3">

          {navLinks.map((link) => (

            <Link
              key={link.name}

              to={link.path}

              className={`px-5 py-2 rounded-full text-sm transition duration-300

              ${
                location.pathname === link.path
                  ? "bg-[#F5EDE7] text-[#2B2D42] shadow-sm"
                  : "text-gray-600 hover:bg-[#F8F1EC]"
              }
              `}
            >

              {link.name}

            </Link>

          ))}

        </div>

        {/* RIGHT SIDE */}

        <div className="hidden md:flex items-center gap-3">

          {!token ? (

            <>

              <Link
                to="/login"

                className="px-5 py-2 rounded-full text-sm text-gray-700 hover:bg-[#F8F1EC] transition duration-300"
              >

                Sign in

              </Link>

              <Link
                to="/register"

                className="bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white px-5 py-2 rounded-full text-sm shadow-md hover:scale-105 transition duration-300"
              >

                Join now

              </Link>

            </>

          ) : (

            <div className="flex items-center gap-3">

              <Link
                to="/dashboard"

                className="bg-white border border-[#F1E5DC] px-5 py-2 rounded-full text-sm text-gray-700 hover:bg-[#F8F1EC] transition duration-300 shadow-sm"
              >

                Dashboard

              </Link>

              <button
                onClick={() => {

                  localStorage.removeItem("token");

                  window.location.reload();

                }}

                className="bg-[#FCA5A5] text-white px-5 py-2 rounded-full text-sm hover:scale-105 transition duration-300 shadow-sm"
              >

                Logout

              </button>

            </div>

          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}

          className="md:hidden text-3xl text-[#A78BFA]"
        >

          <HiOutlineMenuAlt3 />

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <motion.div
          initial={{ opacity: 0, y: -15 }}

          animate={{ opacity: 1, y: 0 }}

          className="md:hidden bg-[#FFF9F5]/95 backdrop-blur-xl border-t border-[#F1E5DC] px-5 py-5 flex flex-col gap-4"
        >

          {navLinks.map((link) => (

            <Link
              key={link.name}

              to={link.path}

              onClick={() => setMenuOpen(false)}

              className={`px-5 py-3 rounded-2xl text-sm transition duration-300

              ${
                location.pathname === link.path
                  ? "bg-[#F5EDE7] text-[#2B2D42]"
                  : "bg-white text-gray-700 border border-[#F1E5DC]"
              }
              `}
            >

              {link.name}

            </Link>

          ))}

          {!token ? (

            <>

              <Link
                to="/login"

                className="bg-white px-5 py-3 rounded-2xl text-sm border border-[#F1E5DC]"
              >

                Sign in

              </Link>

              <Link
                to="/register"

                className="bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] text-white px-5 py-3 rounded-2xl text-sm shadow-md"
              >

                Join now

              </Link>

            </>

          ) : (

            <>

              <Link
                to="/dashboard"

                className="bg-white px-5 py-3 rounded-2xl text-sm border border-[#F1E5DC]"
              >

                Dashboard

              </Link>

              <button
                onClick={() => {

                  localStorage.removeItem("token");

                  window.location.reload();

                }}

                className="bg-[#FCA5A5] text-white px-5 py-3 rounded-2xl text-sm shadow-md"
              >

                Logout

              </button>

            </>

          )}

        </motion.div>

      )}

    </motion.nav>

  );

}

export default Navbar;