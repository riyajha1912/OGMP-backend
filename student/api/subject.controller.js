import SubjectDAO from "../dao/subjectsDAO.js";

export default class SubjectController {
  static async apiGetSubjects(req, res, next) {
    try {
      let subject = await SubjectDAO.getSubject();
      res.json(subject);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
