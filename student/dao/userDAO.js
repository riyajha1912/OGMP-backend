let user;

export default class userDAO {
  static async injectDB(conn) {
    if (user) {
      return;
    }

    try {
      user = await conn.db(process.env.USER_NS).collection("UserData");
    } catch (e) {
      console.error(`unable to establish connection to userDAO: ${e}`);
    }
  }

  static async checkUser({ filters = null, usersPerPage = 20, page = 0 } = {}) {
    try {
      let dbQuery;
      if (filters) {
        if ("Eno" in filters) {
          dbQuery = {
            Eno: { $eq: filters["Eno"] },
          };
        }
      }

      let cursor;

      try {
        cursor = await user.find(dbQuery);
      } catch (e) {
        console.error(`unable to issue find command: ${e}`);
        return { query_List: [], totalNumQueries: 0 };
      }

      try {
        const userList = cursor;
        const totalNumUsers = await user.countDocuments(dbQuery);
        const finalUserList = { userList, totalNumUsers };
        return finalUserList;
      } catch (e) {
        console.error(
          `Unable to convert cursor to array or problem counting documents: ${e}`
        );
        return { userList: [], totalNumQueries: 0 };
      }
    } catch (e) {
      console.error(`Unable to get user: ${e}`);
      return { error: e };
    }
  }
  static async getUser({ filters = null, usersPerPage = 20, page = 0 } = {}) {
    try {
      let dbQuery;
      if (filters) {
        if ("Eno" in filters && "Password" in filters) {
          dbQuery = {
            Eno: { $eq: filters["Eno"] },
            Password: { $eq: filters["Password"] },
          };
        }
      }

      let cursor;

      try {
        cursor = await user.findOne(dbQuery);
      } catch (e) {
        console.error(`unable to issue find command: ${e}`);
        return { query_List: [], totalNumQueries: 0 };
      }

      try {
        const userList = cursor;
        const totalNumUsers = await user.countDocuments(dbQuery);
        const finalUserList = { userList, totalNumUsers };
        return finalUserList;
      } catch (e) {
        console.error(
          `Unable to convert cursor to array or problem counting documents: ${e}`
        );
        return { userList: [], totalNumQueries: 0 };
      }
    } catch (e) {
      console.error(`Unable to get user: ${e}`);
      return { error: e };
    }
  }

  static async addUser(name, eno, email, course, password) {
    try {
      const userDoc = {
        Name: name,
        Eno: eno,
        Email: email,
        Course: course,
        Password: password,
      };
      return await user.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to register User: ${e}`);
      return { error: e };
    }
  }
}
