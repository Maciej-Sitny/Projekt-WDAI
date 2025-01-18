const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("../mikroserwis1/routes/books");
const orderRoutes = require("./routes/orders");
const sequelize = require("../config/database");

const app = express();

app.use(bodyParser.json());
app.use(bookRoutes);
app.use(orderRoutes);

const PORT = 4000;

sequelize.sync({ force: false }).then(() => {
  console.log("Baza danych zsynchronizowana!");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
