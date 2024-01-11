const express = require("express");
const app = express();

// config swagger
const fs = require("fs");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.parse(
  fs.readFileSync("./config/swagger.yaml", "utf8")
);

//Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//middlewares
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Allow", "GET, POST");
  next();
});

// API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.use("/api/training", require("./routes/training"));
app.use("/api/team", require("./routes/team"));

app.listen(app.get("port"), () => {
  console.log(
    `La aplicación está escuchando en http://localhost:${app.get("port")}`
  );
});
