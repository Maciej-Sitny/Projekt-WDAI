import express from "express";
import router from "./authRoutes.js";
import sequelize from "./database.js";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api", router);

sequelize.sync({ force: false }).then(() => {
  console.log("Baza danych zsynchronizowana!");
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
