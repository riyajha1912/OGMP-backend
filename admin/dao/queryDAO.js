let adminQuery;

export default class QueryDAO {
  static async injectDB(conn) {
    if (adminQuery) {
      return;
    }
    try {
      adminQuery = await conn.db(process.env.ADMIN_NS).collection("Queries");
    } catch (e) {
      console.error(
        `unable to establish connection to adminQueryDAO(Query): ${e}`
      );
    }
  }

  static async getQuery({ filters = null, queriesPerPage = 5, page = 0 } = {}) {
    let dbQuery;
    if (filters) {
      if ("Subject" in filters) {
        dbQuery = { Subject: { $eq: filters["Subject"] } };
      }
    }

    let cursor;

    try {
      cursor = await adminQuery.find(dbQuery);
    } catch (e) {
      console.error(`unable to issue find command: ${e}`);
      return { query_List: [], totalNumQueries: 0 };
    }

    const displayCursor = cursor
      .limit(queriesPerPage)
      .skip((queriesPerPage = page));

    try {
      const query_List = await displayCursor.toArray();
      const totalNumQueries = await adminQuery.countDocuments(dbQuery);

      return { query_List, totalNumQueries };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents: ${e}`
      );
      return { query_List: [], totalNumQueries: 0 };
    }
  }
}
