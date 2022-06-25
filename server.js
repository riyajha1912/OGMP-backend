import express from "express";
import cors from "cors";
import userquery from "./student/api/query.routes.js";
import admin from "./admin/api/admin.routes.js";
const app = express(); //now our app uses express

app.use(cors()); //cors= cross origin resources
app.use(express.json()); //let's you send/receive data in json format

app.use("/api/v1/user", userquery); //app will use restaurants file and show data at '/api/v1/restaurants' url
app.use("/api/v1/admin", admin);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
}); //in case, any other url opened (represented by wild card '*'), status 404 (not found) displayed to user

export default app; //export so that other files can import app
