import personalQueriesDAO from "../dao/personalQueriesDAO.js";
import adminAddQueryDAO from "../../admin/dao/adminAddQueryDAO.js";
export default class personalQueriesCtrl {
  static async apiPostQuery(req, res, next) {
    try {
      const subject = req.body.subject;
      const query = req.body.query;
      const date = new Date();
      const Eno = req.body.eno;

      const userQueryResponse = await personalQueriesDAO.addQuery(
        Eno,
        subject,
        query,
        date
      );

      await adminAddQueryDAO.addQuery(Eno, subject, query, date);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
