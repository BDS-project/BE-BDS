import bucket from '../../config/storage.js';

const uploadFileToGCS = async ({ createReadStream, filename }) => {
  const blob = bucket.file(filename);

  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: { contentType: 'auto' }
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    createReadStream().pipe(blobStream);
  });
};
export default uploadFileToGCS;
