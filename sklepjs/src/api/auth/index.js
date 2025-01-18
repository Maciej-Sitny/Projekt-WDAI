import express from "express";
import { json } from "express";
import router from "./authRoutes.js";
import sequelize from "../database.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());
app.use(router);

sequelize.sync({ force: false }).then(() => {
  console.log("Baza danych zsynchronizowana!");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
