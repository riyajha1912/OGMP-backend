let adminUser;

export default class adminDAO {
  static async injectDB(conn) {
    if (adminUser) {
      return;
    }

    try {
      adminUser = await conn.db(process.env.ADMIN_NS).collection("UserData");
    } catch (e) {
      console.error(`unable to establish connection to adminDAO: ${e}`);
    }
  }

  static async addAdmin(name, dept, email, password) {
    try {
      const adminUserDoc = {
        Name: name,
        Dept: dept,
        Email: email,
        Password: password,
      };
      return await adminUser.insertOne(adminUserDoc);
    } catch (e) {
      console.error(`Unable to register User: ${e}`);
      return { error: e };
    }
  }

  static async getAdmin({ filters = null, usersPerPage = 20, page = 0 } = {}) {
    try {
      let adminUserQuery;
      if (filters) {
        if ("Dept" in filters && "Password" in filters) {
          adminUserQuery = {
            Dept: { $eq: filters["Dept"] },
            Password: { $eq: filters["Password"] },
          };
        }
      }

      let cursor;

      try {
        cursor = await adminUser.findOne(adminUserQuery);
      } catch (e) {
        console.error(`Unable to issue find command: ${e}`);
        return { userList: [], totalNumUsers: 0 };
      }

      try {
        const userList = cursor;
        const totalNumUsers = await adminUser.countDocuments(adminUserQuery);
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
}
