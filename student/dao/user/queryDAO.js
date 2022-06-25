//DATA ACCESS OBJECTS FILE

let studQuery;

export default class QueryDAO {
  static async injectDB(conn) {
    if (studQuery) {
      return;
    }
    try {
      studQuery = await conn.db(process.env.USER_NS).collection("Queries");
    } catch (e) {
      console.error(`unable to establish connection to queryDAO(Query): ${e}`);
    }
  }

  static async getQuery({
    filters = null,
    queriesPerPage = 20,
    page = 0,
  } = {}) {
    let dbQuery;
    if (filters) {
      if ("Eno" in filters) {
        dbQuery = {
          Eno: { $eq: filters["Eno"] },
        };
      }
    }

    let cursor;
    if (dbQuery) {
      try {
        cursor = await studQuery.find(dbQuery);
      } catch (e) {
        console.error(`unable to issue find command: ${e}`);
        return { query_List: [], totalNumQueries: 0 };
      }

      const displayCursor = cursor
        .limit(queriesPerPage)
        .skip((queriesPerPage = page));

      try {
        const query_List = await displayCursor.toArray();
        const totalNumQueries = await studQuery.countDocuments(dbQuery);

        return { query_List, totalNumQueries };
      } catch (e) {
        console.error(
          `Unable to convert cursor to array or problem counting documents: ${e}`
        );
        return { query_List: [], totalNumQueries: 0 };
      }
    } else {
      return { query_List: [], totalNumQueries: 0 };
    }
  }
}
