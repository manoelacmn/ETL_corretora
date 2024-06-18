import express from "express";
import cors from "cors";
import itemsR from "./routers/items-router";

const PORT = 4000;
const HOSTNAME = "http://localhost";

// Instantiate express
const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// Roteamento endereçado e encadeado.
app.use("/api", itemsR);

// Default endpoint /
app.get("/", (req, res) => {
  res.send("Welcome!");
});

//Qualquer rota nao tratada.
app.use((req, res) => {
  res.status(404);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running: ${HOSTNAME}:${PORT}`);
});
