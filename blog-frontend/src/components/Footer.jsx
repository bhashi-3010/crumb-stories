import {
  FiInstagram,
  FiTwitter,
  FiGithub
} from "react-icons/fi";

import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="bg-[#FFF9F5] border-t border-[#F1E5DC] mt-24">

      <div className="max-w-6xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-12">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#F9A8D4] flex items-center justify-center text-white shadow-md">

                ✨

              </div>

              <div>

                <h1 className="text-2xl font-serif text-[#C084FC]">

                  Crumb Stories

                </h1>

                <p className="text-xs text-gray-500">

                  Creative Blogging Platform

                </p>

              </div>

            </div>

            <p className="text-gray-600 leading-relaxed max-w-sm">

              A calm digital space to share stories,
              ideas, creativity, and thoughtful writing.

            </p>

          </div>

          {/* LINKS */}

          <div>

            <h2 className="text-xl text-[#2B2D42] mb-5 font-serif">

              Explore

            </h2>

            <div className="flex flex-col gap-3 text-gray-600">

              <Link
                to="/"

                className="hover:text-[#A78BFA] transition"
              >

                Home

              </Link>

              <Link
                to="/create"

                className="hover:text-[#A78BFA] transition"
              >

                Create Story

              </Link>

              <Link
                to="/dashboard"

                className="hover:text-[#A78BFA] transition"
              >

                Dashboard

              </Link>

            </div>

          </div>

          {/* SOCIAL */}

          <div>

            <h2 className="text-xl text-[#2B2D42] mb-5 font-serif">

              Connect

            </h2>

            <div className="flex items-center gap-4">

              <button className="w-12 h-12 rounded-full bg-white border border-[#F1E5DC] flex items-center justify-center hover:bg-[#F8F1EC] transition">

                <FiInstagram />

              </button>

              <button className="w-12 h-12 rounded-full bg-white border border-[#F1E5DC] flex items-center justify-center hover:bg-[#F8F1EC] transition">

                <FiTwitter />

              </button>

              <button className="w-12 h-12 rounded-full bg-white border border-[#F1E5DC] flex items-center justify-center hover:bg-[#F8F1EC] transition">

                <FiGithub />

              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-[#F1E5DC] mt-12 pt-6 text-center text-gray-500 text-sm">

          © 2026 Crumb Stories — Crafted with creativity ✨

        </div>

      </div>

    </footer>

  );

}

export default Footer;