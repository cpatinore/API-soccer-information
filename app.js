const express = require("express");
const app = express();
const port = 3000;

//Settings
app.set('port',process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(express.json());


//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Allow', 'GET, POST');
    next();
});


// API
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.use("/api/training", require("./routes/training"));


app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
