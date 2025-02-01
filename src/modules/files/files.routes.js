const express = require("express");
const multer = require("multer");
const FilesController = require("./files.controller");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Subir archivo
router.post("/upload", upload.single("file"), FilesController.uploadFile);

// Descargar archivo
router.get("/download/:filename", FilesController.downloadFile);

// Listar archivos
router.get("/list", FilesController.listFiles);


module.exports = router;
