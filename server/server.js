require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const bodyParser = require("body-parser");
const mqttHandler = require("./mqttHandler");
const mqttController = require("./mqttController");
const mailRouter = require("./routers/mailRouter");

const port = process.env.PORT || 3000;

const app = startApp(port);
module.exports = app;

function startApp(port) {
  const app = setupApp();
  addRoutesToApp(app);
  addFrontendToApp(app);
  mqttHandler.connect();

  app.use(bodyParser);
  // Error handler (i.e., when exception is thrown) must be registered last
  const env = app.get("env");
  addErrorHandlerToApp(app, env);

  app.listen(port, function (err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
  });

  return app;
}

function setupApp() {
  const app = express();
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      optionsSucessStatus: 204,
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  return app;
}

function addRoutesToApp(app) {
  app.get("/api", function (req, res) {
    res.json({ message: "Welcome to your Distributed Systems Baby" });
  });

  app.use("/api/mail", mailRouter);
  app.use("/api", mqttController);

  // Catch all non-error handler for api (i.e., 404 Not Found)
  app.use("/api/*", function (req, res) {
    res.status(404).json({ message: "Endpoint Not Found" });
  });
}

function addFrontendToApp(app) {
  // Configuration for serving frontend in production mode
  // Support Vuejs HTML 5 history mode
  app.use(history());
  // Serve static assets
  const root = path.normalize(__dirname + "/..");
  const client = path.join(root, "client", "dist");
  app.use(express.static(client));
}

function addErrorHandlerToApp(app, env) {
  // eslint-disable-next-line no-unused-consts
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    const err_res = {
      message: err.message,
      error: {},
    };
    if (env === "development") {
      // Return sensitive stack trace only in dev mode
      err_res["error"] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
  });
}
