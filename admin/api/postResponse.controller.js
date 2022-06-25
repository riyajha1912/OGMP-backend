import postResponseDAO from "../dao/postResponseDAO.js";
export default class postResponseCtrl {
  static async apiPostResponse(req, res, next) {
    try {
      const eno = req.body.eno;
      const query = req.body.query;
      const response = req.body.response;

      await postResponseDAO.postResponse(eno, query, response);

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
