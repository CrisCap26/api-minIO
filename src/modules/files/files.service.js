const minioClient = require("../../config/minio");
const BUCKET_NAME = process.env.BUCKET_NAME;

exports.uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    const metaData = { "Content-Type": file.mimetype };

    minioClient.putObject(BUCKET_NAME, fileName, file.buffer, metaData, (err) => {
      if (err) return reject(err);
      resolve(`http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${fileName}`);
    });
  });
};

exports.downloadFile = async (filename) => {
  return new Promise((resolve, reject) => {
    minioClient.getObject(BUCKET_NAME, filename, (err, stream) => {
      if (err) return reject(err);
      resolve(stream);
    });
  });
};

exports.listFiles = async () => {
    return new Promise((resolve, reject) => {
      const files = [];
      const stream = minioClient.listObjects(BUCKET_NAME);
  
      stream.on("data", (obj) => {
        files.push({
          name: obj.name,
          size: obj.size,
          lastModified: obj.lastModified,
          url: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${obj.name}`
        });
      });
  
      stream.on("end", () => resolve(files));
      stream.on("error", (err) => reject(err));
    });
  };