import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { generate } from "./lib.js";

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the chat App",
  });
});

app.post("/chat", async (req, res) => {
  const { message, threadId } = req.body;

  if (!message || !threadId) {
    res.status(400).json({
      message: "All fields are mandatory",
    });
    return;
  }

  const result = await generate(message, threadId);

  res.json({
    message: result,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
