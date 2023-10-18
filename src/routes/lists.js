import express from "express";
import backup from "../controllers/backup.js";
import restore from "../controllers/restore.js";

const list = express.Router();

list.put("/backup", backup);
list.get("/restore", restore);

export default list;
