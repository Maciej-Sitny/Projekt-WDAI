import express from "express";
import { json } from "express";
import router from "./orderRoutes.js";
import sequelize from "./database.js";

const app = express();
const PORT = 4000;

app.use(json());
app.use(router);
app.use("/api", router);

sequelize.sync({ force: false }).then(() => {
  console.log("Baza danych zsynchronizowana!");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
