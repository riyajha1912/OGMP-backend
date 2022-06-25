import userDAO from "../dao/userDAO.js";

export default class userController {
  static async apiCheckUser(req, res, next) {
    const usersPerPage = req.query.usersPerPage
      ? parseInt(req.query.usersPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    try {
      let filters = {};
      if (req.query.eno) {
        filters.Eno = req.query.eno;
      }

      const { User, totalNumUsers } = await userDAO.checkUser({
        filters,
        page,
        usersPerPage,
      });

      let response = {
        query: User,
        page: page,
        filters: filters,
        entries_per_page: usersPerPage,
        totalResults: totalNumUsers,
      };
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetUser(req, res, next) {
    const usersPerPage = req.query.usersPerPage
      ? parseInt(req.query.usersPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    try {
      let filters = {};
      if (req.query.Eno && req.query.Password) {
        filters.Eno = req.query.Eno;
        filters.Password = req.query.Password;
      }

      const { userList, totalNumUsers } = await userDAO.getUser({
        filters,
        page,
        usersPerPage,
      });

      let response = {
        query: userList,
        page: page,
        filters: filters,
        entries_per_page: usersPerPage,
        totalResults: totalNumUsers,
      };
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPostUser(req, res, next) {
    try {
      const name = req.body.username;
      const eno = req.body.eno;
      const email = req.body.email;
      const course = req.body.course;
      const password = req.body.password;

      const userResponse = await userDAO.addUser(
        name,
        eno,
        email,
        course,
        password
      );

      res.json({ status: "user successfully added" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
