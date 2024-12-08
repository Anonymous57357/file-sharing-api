// controllers/fileController.js
const cloudinary = require("../config/cloudinary");
const File = require("../models/fileModel");

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    console.log(file.buffer);

    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 12); // Link expires in 24 hours

    console.time("upload");
    // Upload file to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", public_id: file.originalname },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(file.buffer); // Write the file buffer to the stream
    });
    console.timeEnd("upload");

    // Save file info to database
    const newFile = new File({
      filename: file.originalname,
      url: uploadResult.secure_url, // Use secure_url from Cloudinary
      expiry: expiryTime,
    });

    await newFile.save();

    res.status(200).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (err) {
    console.error("File upload failed:", err.message);
    res.status(500).json({ message: "File upload failed", error: err.message });
  }
};

const downloadFile = async (req, res) => {
  try {
    const { id } = req.params; // Retrieve the file ID from the request body
    const file = await File.findById(id); // Fetch the file record from the database

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Compare the current date and the expiry date
    const currentTime = new Date();
    if (currentTime > file.expiry) {
      // Optionally delete the expired file from the database
      await File.findByIdAndDelete(id);
      return res
        .status(400)
        .json({ message: "Link expired and file record removed" });
    }

    // Redirect to the Cloudinary file URL if not expired
    res.redirect(file.url);
  } catch (err) {
    console.error("File download failed:", err.message);
    res
      .status(500)
      .json({ message: "File download failed", error: err.message });
  }
};

module.exports = {
  uploadFile,
  downloadFile,
};
