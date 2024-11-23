import bucket from '../../config/storage.js';

const uploadFileToGCS = async ({ createReadStream, folder, filename }) => {
  const blob = bucket.file(`${folder}/${filename}`);

  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: { contentType: 'auto' }
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', async () => {
      try {
        const [url] = await blob.getSignedUrl({
          action: 'read',
          expires: '03-01-2030'
        });
        resolve(url);
      } catch (err) {
        reject(err);
      }
    });

    createReadStream().pipe(blobStream);
  });
};
const deleteFileFromGCS = async ({ folder, filename }) => {
  try {
    const blob = bucket.file(`${folder}/${filename}`);

    await blob.delete();
    console.log(`File ${filename} has been deleted successfully.`);
    return `File ${filename} has been deleted successfully.`;
  } catch (error) {
    console.error('Error deleting file:', error.message);
    throw new Error(`Failed to delete file ${filename}: ${error.message}`);
  }
};
export { uploadFileToGCS, deleteFileFromGCS };
