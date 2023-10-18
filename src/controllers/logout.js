export default function logout(rq, rs) {
  rs.clearCookie("signature", { httpOnly: true });
  rs.status(200).json("logged out!");
}
