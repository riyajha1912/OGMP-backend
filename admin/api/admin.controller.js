import adminDAO from "../dao/adminDAO.js";

export default class adminController {
  static async apiPostAdmin(req, res, next) {
    try {
      const name = req.body.fname + " " + req.body.lname;
      const dept = req.body.dept;
      const email = req.body.email;
      const password = req.body.password;

      const adminResponse = await adminDAO.addAdmin(
        name,
        dept,
        email,
        password
      );

      res.json({ status: "admin successfully added" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetAdmin(req, res, next) {
    const usersPerPage = req.query.usersPerPage
      ? parseInt(req.query.usersPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    try {
      let filters = {};
      if (req.query.Dept && req.query.Password) {
        filters.Dept = req.query.Dept;
        filters.Password = req.query.Password;
      }

      const { userList, totalNumUsers } = await adminDAO.getAdmin({
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
}
