import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import auth from "./routes/auth.js";
import list from "./routes/lists.js";
import appu from "./controllers/appu.js";

const app = express();
const port = process.env.PORT || 0;

app.use(express.json());

const corsOptions = {
  origin: "https://todo-5d9a5.web.app/",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/auth", auth);
app.use("/list", list);
app.get("/", appu);

app.listen(port);
