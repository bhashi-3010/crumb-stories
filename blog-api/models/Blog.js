const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(

  {

    user: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User"

    },

    text: {

      type: String,

      required: true

    }

  },

  {

    timestamps: true

  }

);

const blogSchema = new mongoose.Schema(

  {

    title: {

      type: String,

      required: true

    },

    content: {

      type: String,

      required: true

    },

    image: {

      type: String

    },

    category: {

      type: String

    },

    author: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User"

    },

    likedBy: [

      {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

      }

    ],

    comments: [commentSchema]

  },

  {

    timestamps: true

  }

);

module.exports = mongoose.model("Blog", blogSchema);