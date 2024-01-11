const app = require("./app");

app.listen(app.get("port"), async () => {
  console.log(
    `La aplicación está escuchando en http://localhost:${app.get("port")}`
  );
});
