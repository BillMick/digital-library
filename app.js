const bodyParser = require('body-parser')
// const { config } = require('./config')
const express = require('express')
const routes = require('./routes/api.js')

const expressServer = express()

expressServer.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
/**
 * Health Check endpoints
 */
expressServer.get('/status', (req, res) => {
  res.status(200).end()
})

// ######################### For Swagger ###################################################
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Files management",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express.",
    license: {
      name: "G4 - Digital Library",
      url: "",
    },
    contact: {
      name: "G4 - Digital Library",
      url: "",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ["./docs/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
// ############################################################################

// For documentation
expressServer.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware that transforms the raw string of req.body into json
expressServer.use(bodyParser.json())

expressServer.use(express.urlencoded({ extended: false }));

expressServer.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

expressServer.use('/api', routes)
const port = 3003;
expressServer.listen(port, () => {
  console.log(`
    ################################################
    🛡️  Server listening on port: ${port} 🛡️ 
    ################################################
  `)
})
