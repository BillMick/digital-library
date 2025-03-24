var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");

// ######################### For Swagger ###################################################
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Files Management",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It is used to manage files in digital library project.",
    license: {
      name: "Licensed Under G4 - Digital library",
      url: "",
    },
    contact: {
      name: "",
      url: "",
    },
  },
  servers: [
    {
      url: "",
      description: "Development server",
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ["./docs/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
// For documentation
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ############################################################################

var api_router = require("./routes/api.js");

var app = express();
// For solving CORS issues
app.use(cors());

// Body parsers should be used before the multer and file upload handling
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: false })); // For form data

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "public")));

// Specify group URI
app.use("/api", api_router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});

module.exports = app;
