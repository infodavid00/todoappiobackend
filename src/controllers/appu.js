import dotenv from "dotenv";
import verify from "../models/app/verify.js";
import verifyjwt from "../utils/jwt.js";

dotenv.config({ path: "../.env" });

export default async function appu(rq, rs) {
  const signature = await rq.cookies.signature;
  const secrete = process.env.SECRETE;

  if (signature) {
    const verifytoken = await verifyjwt(signature, secrete);
    if (verifytoken && verifytoken._id !== null) {
      try {
        const dbquery = await verify(verifytoken._id, verifytoken.user);
        rs.status(200).json({ acknowleged: "Ok", data: dbquery });
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
