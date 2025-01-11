const express = require("express");
const { json } = require("express");
const router = require("./authRoutes.js");
const sequelize = require("../database.js");

const app = express();
const PORT = 3000;

app.use(json());
app.use(router);

sequelize.sync({ force: false }).then(() => {
  console.log("Baza danych zsynchronizowana!");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
