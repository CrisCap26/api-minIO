const FilesService = require("./files.service");

exports.uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const fileUrl = await FilesService.uploadFile(req.file);
    res.json({ 
        status: 201,
        message: "File uploaded successfully", 
        url: fileUrl
     });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
};

exports.downloadFile = async (req, res) => {
  const { filename } = req.params;

  try {
    const fileStream = await FilesService.downloadFile(filename);
    res.attachment(filename);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Error downloading file", error });
  }
};

exports.listFiles = async (req, res) => {
    try {
      const files = await FilesService.listFiles();
      res.json({
        status: 200,
        files
      });
    } catch (error) {
      res.status(500).json({ message: "Error listing files", error });
    }
  };
