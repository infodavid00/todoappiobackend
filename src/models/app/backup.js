import dbconnect from "../../utils/dbconnect.js";

export default async function backupm(id, user, data) {
  let connection;
  try {
    connection = dbconnect();
    await connection.connect();
    const db = connection.db("todoapp").collection("col1");
    const res = await db.updateOne(
      { $and: [{ _id: id }, { "meta.user": user }] },
      {
        $set: {
          ulists: data,
          "meta.lastBackup": new Date(),
        },
      }
    );
    if (res.matchedCount && res.modifiedCount) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err.message;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
