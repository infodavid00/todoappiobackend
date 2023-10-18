import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import signinm from "../models/auth/signin.js";

dotenv.config({ path: "./.env" });

const comparePassword = async (hashed, password) => {
  try {
    const compPassword = await bcrypt.compare(password, hashed);
    return compPassword;
  } catch (err) {
    throw err;
  }
};

export default async function signin(rq, rs) {
  const { user, password } = rq.body;
  try {
    const lookup = await signinm(user);
    if (lookup !== null) {
      const compare = await comparePassword(lookup.meta.password, password);
      if (compare === true) {
        const secrete = process.env.SECRETE;
        const token = jwt.sign(
          { _id: lookup._id, user: lookup.meta.user },
          secrete,
          { expiresIn: "1d" }
        );
        rs.cookie("signature", token, {
          httpOnly: true,
        });
        rs.status(200).json({
          acknowledged: "Ok",
          message: "login success!",
        });
      } else {
        rs.status(200).json({
          acknowledged: "False",
          message: "incorrect password!",
        });
      }
    } else {
      rs.status(200).json({
        acknowledged: "False",
        message: "user does not exist",
      });
    }
  } catch (err) {
    rs.status(500).json(err);
  }
}
