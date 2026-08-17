const express = require("express");

const router = express.Router();

const OpenAI = require("openai");

const client = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY

});

router.post("/generate", async (req, res) => {

  try {

    const { prompt } = req.body;

    const completion = await client.chat.completions.create({

      model: "gpt-3.5-turbo",

      messages: [

        {
          role: "system",
          content: "You are a professional blog writer."
        },

        {
          role: "user",
          content: `Write a modern blog article about: ${prompt}`
        }

      ]

    });

    res.json({

      content:
        completion.choices[0].message.content

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "AI generation failed"

    });

  }

});

module.exports = router;