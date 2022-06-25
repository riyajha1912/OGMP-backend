import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import adminDAO from "./admin/dao/adminDAO.js";
import adminQueryDAO from "./admin/dao/queryDAO.js";
import userDAO from "./student/dao/userDAO.js";
import userQueryDAO from "./student/dao/user/queryDAO.js";
import adminAddQueriesDAO from "./admin/dao/adminAddQueryDAO.js";
import personalQueriesDAO from "./student/dao/personalQueriesDAO.js";
import postResponseDAO from "./admin/dao/postResponseDAO.js";
import subjectsDAO from "./student/dao/subjectsDAO.js";

dotenv.config(); //have to configure dotenv to access .env files

const MongoClient = mongodb.MongoClient; //set up our MongoDB client

const port = process.env.PORT || 8000; //syntax to access .env file contents; if cannot be accessed use 8000 as port no.

MongoClient.connect(process.env.OGMP_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewURLParser: true,
})
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })

  .then(async (client) => {
    await adminDAO.injectDB(client);
    await adminQueryDAO.injectDB(client);
    await userDAO.injectDB(client);
    await userQueryDAO.injectDB(client);
    await personalQueriesDAO.injectDB(client);
    await adminAddQueriesDAO.injectDB(client);
    await postResponseDAO.injectDB(client);
    await subjectsDAO.injectDB(client);
    app.listen(port, () => {
      //web server starting
      console.log(`listening on the port ${port}`);
    });
  });
