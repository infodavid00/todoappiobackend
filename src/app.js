import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import auth from "./routes/auth.js";
import list from "./routes/lists.js";
import appu from "./controllers/appu.js";
import logout from "./controllers/logout.js";

const app = express();
const port = process.env.PORT || 0;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/list", list);
app.get("/", appu);
app.delete("/logout", logout);

app.listen(port, () => console.log("server running on port : ", port));
