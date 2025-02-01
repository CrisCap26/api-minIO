const express = require("express");
const cors = require("cors");
const filesRoutes = require("./modules/files/files.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/files", filesRoutes);

module.exports = app;
