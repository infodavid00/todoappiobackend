import dbconnect from "../../utils/dbconnect.js";

export default async function verify(id, user) {
  let connection;
  try {
    connection = dbconnect();
    await connection.connect();
    const db = connection.db("todoapp").collection("col1");
    const res = await db.findOne(
      { $and: [{ _id: id }, { "meta.user": user }] },
      {
        projection: {
          "meta.user": 1,
          "meta.lastBackup": 1,
        },
      }
    );
    return res;
  } catch (err) {
    throw err.message;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
