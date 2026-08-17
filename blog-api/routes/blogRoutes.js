const express = require("express");

const router = express.Router();

const {

  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment

} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");


// CREATE BLOG

router.post(

  "/",

  protect,

  upload.single("image"),

  createBlog

);


// GET ALL BLOGS

router.get("/", getBlogs);


// GET SINGLE BLOG

router.get("/:id", getSingleBlog);


// UPDATE BLOG

router.put(

  "/:id",

  protect,

  upload.single("image"),

  updateBlog

);


// DELETE BLOG

router.delete(

  "/:id",

  protect,

  deleteBlog

);


// LIKE BLOG

router.put(

  "/like/:id",

  protect,

  likeBlog

);


// COMMENT BLOG

router.post(

  "/comment/:id",

  protect,

  addComment

);


module.exports = router;