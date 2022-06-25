import QueryDAO from "../dao/user/queryDAO.js";

export default class QueriesController {
  static async apiGetQueries(req, res, next) {
    const queriesPerPage = req.query.queriesPerPage
      ? parseInt(req.query.queriesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.Eno) {
      filters.Eno = req.query.Eno;
    } else {
      filters = null;
    }
    const { query_List, totalNumQueries } = await QueryDAO.getQuery({
      filters,
      page,
      queriesPerPage,
    });

    let response = {
      query: query_List,
      page: page,
      filters: filters,
      entries_per_page: queriesPerPage,
      totalResults: totalNumQueries,
    };
    res.json(response);
  }
}
