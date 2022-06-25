import express from "express";
import QueryCtrl from "./query.controller.js";
import postResponseCtrl from "./postResponse.controller.js";
import AdminCtrl from "./admin.controller.js";
const router = express.Router(); //creates routes people can go to

router.route("/signup").post(AdminCtrl.apiPostAdmin);
router.route("/login").get(AdminCtrl.apiGetAdmin);
router.route("/query").get(QueryCtrl.apiGetQueries);
router.route("/PostResponse").post(postResponseCtrl.apiPostResponse);

export default router;
