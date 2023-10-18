import dotenv from "dotenv";
import backupm from "../models/app/backup.js";
import verifyjwt from "../utils/jwt.js";

dotenv.config({ path: "../.env" });

export default async function backup(rq, rs) {
  const signature = await rq.cookies.signature;
  const secrete = process.env.SECRETE;
  const data = await rq.body;

  if (signature) {
    const verifytoken = await verifyjwt(signature, secrete);
    if (verifytoken && verifytoken._id !== null) {
      try {
        const dbquery = await backupm(verifytoken._id, verifytoken.user, data);
        if (dbquery === true) {
          rs.status(200).json({ acknowleged: "Ok", data: "backup success!" });
        } else {
          rs.status(200).json({ acknowleged: "Null", data: "backup failed!" });
        }
      } catch (err) {
        rs.status(500).json({
          acknowleged: "False",
          message: err,
        });
      }
    } else {
      rs.status(401).json({
        acknowleged: "False",
        message: verifytoken,
      });
    }
  } else {
    rs.status(404).json({
      acknowleged: "False",
      message: "signature not found!",
    });
  }
}
