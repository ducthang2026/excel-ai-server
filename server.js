import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));   // BẮT BUỘC PHẢI CÓ

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.chat.completions.create({
  model: "gpt-4.1-mini",
  messages: [
    {
      role: "system",
      content: "Luôn trả về dữ liệu dạng CSV, không giải thích thêm."
    },
    { role: "user", content: prompt }
  ],
});
