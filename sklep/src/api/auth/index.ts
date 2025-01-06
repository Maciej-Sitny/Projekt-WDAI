import express from "express";
import sequelize from "../database";
import { router } from "./authRoutes";

const app = express();

app.use(express.json());
app.use(router);

const PORT = 3000;

sequelize.sync({ force: false }).then(() => {
  console.log("Baza danych zsyhnchronizowana!");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
