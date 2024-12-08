const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const { uploadFile, downloadFile } = require("../controllers/fileController");

router.post("/upload", upload.single("file"), uploadFile);
router.get("/download/:id", downloadFile);

module.exports = router;
