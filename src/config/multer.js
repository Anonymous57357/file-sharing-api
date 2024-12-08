const multer = require("multer");

// Multer storage setup (stores file in memory temporarily)
const storage = multer.memoryStorage();
const upload = multer({ storage, dest: "uploads/" });

module.exports = upload;
