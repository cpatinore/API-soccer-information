const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(app.get("port"), async () => {
  console.log(
    `La aplicación está escuchando en http://localhost:${app.get("port")}`
  );
});
