const Blog = require("../models/Blog");


// CREATE BLOG

const createBlog = async (req, res) => {

  try {

    const { title, content, category } = req.body;

    const blog = await Blog.create({

      title,
      content,
      category,
      image: req.file?.filename,
      author: req.user

    });

    res.status(201).json({

      message: "Blog Created Successfully",

      blog

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// GET ALL BLOGS

const getBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find()

      .populate("author", "name email")

      .populate("comments.user", "name");

    res.status(200).json(blogs);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// GET SINGLE BLOG

const getSingleBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id)

      .populate("author", "name email")

      .populate("comments.user", "name");

    if (!blog) {

      return res.status(404).json({

        message: "Blog not found"

      });

    }

    res.status(200).json(blog);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// UPDATE BLOG

const updateBlog = async (req, res) => {

  try {

    const updatedData = {

      title: req.body.title,
      content: req.body.content,
      category: req.body.category

    };

    // UPDATE IMAGE ONLY IF NEW IMAGE EXISTS

    if (req.file) {

      updatedData.image = req.file.filename;

    }

    const updatedBlog = await Blog.findByIdAndUpdate(

      req.params.id,

      updatedData,

      { new: true }

    );

    res.status(200).json({

      message: "Blog Updated",

      updatedBlog

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// DELETE BLOG

const deleteBlog = async (req, res) => {

  try {

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({

      message: "Blog Deleted"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// LIKE BLOG

const likeBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {

      return res.status(404).json({

        message: "Blog not found"

      });

    }

    const userId = req.user;

    const alreadyLiked =
      blog.likedBy.includes(userId);

    // TOGGLE LIKE

    if (alreadyLiked) {

      blog.likedBy =
        blog.likedBy.filter(

          (id) => id.toString() !== userId

        );

    } else {

      blog.likedBy.push(userId);

    }

    await blog.save();

    res.status(200).json({

      message: "Like updated",

      likes: blog.likedBy.length,

      blog

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// ADD COMMENT

const addComment = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {

      return res.status(404).json({

        message: "Blog not found"

      });

    }

    if (!req.body.text) {

      return res.status(400).json({

        message: "Comment text required"

      });

    }

    const newComment = {

      user: req.user,

      text: req.body.text

    };

    blog.comments.push(newComment);

    await blog.save();

    const updatedBlog = await Blog.findById(req.params.id)

      .populate("comments.user", "name");

    res.status(200).json(updatedBlog);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

// BOOKMARK BLOG

const bookmarkBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {

      return res.status(404).json({

        message: "Blog not found"

      });

    }

    const userId = req.user;

    const alreadyBookmarked =
      blog.bookmarkedBy.includes(userId);

    // TOGGLE BOOKMARK

    if (alreadyBookmarked) {

      blog.bookmarkedBy =
        blog.bookmarkedBy.filter(

          (id) => id.toString() !== userId

        );

    } else {

      blog.bookmarkedBy.push(userId);

    }

    await blog.save();

    res.status(200).json({

      message: "Bookmark updated",

      blog

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


module.exports = {

  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
  bookmarkBlog

};