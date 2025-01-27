import express from "express";
import { json } from "express";
import router from "./reviewRoutes.js";
import sequelize from "./database.js";
import cors from "cors";

const app = express();
const PORT = 4002;

app.use(cors());
app.use(json());
app.use("/api", router);

sequelize.sync({ force: false }).then(() => {
  console.log("Baza danych opinii zsynchronizowana!");
});

app.listen(PORT, () => {
  console.log(`Serwer opinii działa na porcie ${PORT}`);
});
