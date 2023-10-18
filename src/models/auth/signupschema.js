import crypto from "node:crypto";

export default function Signupschema(user, password) {
  this._id = crypto.randomBytes(30).toString("hex");
  this.meta = {
    user: user,
    password: password,
    lastBackup: "never",
  };
  this.ulists = [];
}
