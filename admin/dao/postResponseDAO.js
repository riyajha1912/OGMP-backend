let adminResponse;

export default class postResponseDAO {
  static async injectDB(conn) {
    if (adminResponse) {
      return;
    }
    try {
      adminResponse = await conn.db(process.env.ADMIN_NS).collection("Queries");
    } catch (e) {
      console.error(`Unable to establish connection to UserDAO: ${e}`);
    }
  }

  static async postResponse(eno, query, response) {
    try {
      const responseDoc = {
        response: response,
      };
      return await adminResponse.updateOne(
        { $and: [{ Query: { $eq: query } }, { Eno: { $eq: eno } }] },
        {
          $set: {
            Response: responseDoc.response,
          },
        }
      );
    } catch (e) {
      console.error(`Unable to post Response ${e.message}`);
      return { error: e.message };
    }
  }
}
