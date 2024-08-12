const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyB-VHUGCkxDMElEPugEDQgRjBYHTPntMNk";
const genai = new GoogleGenerativeAI(API_KEY);

app.post("/gemini", async (req, res) => {
  console.log(req.body.history);
  console.log(req.body.message);
  const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: req.body.history.map((item) => ({
      role: item.role,
      parts: item.parts.map(part => ({ text: part.text })),
    })),
  });
 
  let result = await chat.sendMessage(req.body.message);
  const response = await result.response;
  const text = response.text();

  console.log(text);
  res.send(text);
});

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
