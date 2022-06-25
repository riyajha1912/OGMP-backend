import mongodb from "mongodb";
const ObjectID = mongodb.ObjectId;

let personalQueries;

export default class personalQueriesDAO {
  static async injectDB(conn) {
    if (personalQueries) {
      return;
    }
    try {
      personalQueries = await conn
        .db(process.env.USER_NS)
        .collection("Queries");
    } catch (e) {
      console.error(`Unable to establish connection to User/Admin: ${e}`);
    }
  }

  static async addQuery(Eno, subject, query, date, queryID) {
    try {
      const queryDoc = {
        Eno: Eno,
        Subject: subject,
        Query: query,
        Date: date,
        _id: ObjectID(queryID),
      };
      return await personalQueries.insertOne(queryDoc);
    } catch (e) {
      console.error(`Unable to post Query ${e}`);
      return { error: e };
    }
  }
}
