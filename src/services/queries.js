import http from "../http-common.js";

class QueryDataService {
  getUser(eno, password) {
    return http.get(`/user/login?Eno=${eno}&Password=${password}`);
  }

  checkUser(eno) {
    return http.get(`/user/checkUser?eno=${eno}`);
  }

  getAll(eno, page = 0) {
    return http.get(`/user?Eno=${eno}&page=${page}`);
  }

  getSubjects() {
    return http.get(`/user/subjects`);
  }
  createQuery(data) {
    return http.post("/user/AskQuery", data);
  }
  find(query) {
    return http.get(`/user?Subject=${query}`);
  }

  addUser(data) {
    return http.post(`/user/signup`, data);
  }
}

export default new QueryDataService();
