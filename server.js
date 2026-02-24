import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(".")); // phục vụ taskpane.html

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API tạo bảng
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "Bạn là AI chuyên tạo dữ liệu bảng cho Excel. \
Luôn trả về dữ liệu dạng CSV thuần (phân tách bằng dấu phẩy), \
không markdown, không giải thích, không ký tự thừa."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    });

    const result = completion.choices[0].message.content.trim();

    res.json({ result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
