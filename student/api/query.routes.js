import express from "express";
import QueryCtrl from "./query.controller.js";
import personalQueriesCtrl from "./personalQueries.controller.js";
import SubjectCtrl from "./subject.controller.js";
import UserCtrl from "./user.controller.js";
const router = express.Router(); //creates routes people can go to
router.route("/").get(QueryCtrl.apiGetQueries);
router.route("/checkUser").get(UserCtrl.apiCheckUser);
router.route("/login").get(UserCtrl.apiGetUser);
router.route("/signup").post(UserCtrl.apiPostUser);
router.route("/subjects").get(SubjectCtrl.apiGetSubjects);
router.route("/AskQuery").post(personalQueriesCtrl.apiPostQuery);

export default router;
