let adminQueries;

export default class adminAddQueriesDAO {
  static async injectDB(conn) {
    if (adminQueries) {
      return;
    }
    try {
      adminQueries = await conn.db(process.env.ADMIN_NS).collection("Queries");
    } catch (e) {
      console.error(`Unable to establish connection to AdminAddQueryDAO: ${e}`);
    }
  }

  static async addQuery(eno, subject, query, date) {
    try {
      const queryDoc = {
        Eno: eno,
        Subject: subject,
        Query: query,
        Date: date,
        Response: "",
      };

      return await adminQueries.insertOne(queryDoc);
    } catch (e) {
      console.error(`Unable to post Query in admin ${e}`);
      return { error: e };
    }
  }
}
