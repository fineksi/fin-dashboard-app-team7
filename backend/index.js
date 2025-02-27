require("dotenv").config();

const Path = require("path");
const Express = require("express");
const Cors = require("cors");
const Favicon = require("serve-favicon");
const BodyParser = require("body-parser");
const Routes = require("./src/routes");

(async () => {
  const API_URL = process.env.API_URL;
  const API_PREFIX = process.env.API_PREFIX;
  try {
    const app = Express();
    const API_PORT = process.env.API_PORT;

    app.use(Favicon(Path.join(__dirname, "public", "favicon.ico")));

    app.use(
      BodyParser.urlencoded({
        extended: false,
      })
    );
    app.use(BodyParser.json());
    app.use(
      Cors({
        origin: "*",
        methods: "OPTIONS,GET,PUT,POST,DELETE",
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "Accept-Language",
          "X-Api-Key",
          "X-Amz-Date",
          "X-Amz-Security-Token",
        ],
        credentials: true,
        optionsSuccessStatus: 200,
      })
    );
    app.use(`/${API_PREFIX}/`, Routes);

    app.listen(API_PORT, () => {
      console.log(`${API_URL}/${API_PREFIX} is available!`);
    });
  } catch (err) {
    console.error(`${API_URL}/${API_PREFIX} is available!`, err);
  }
})();
