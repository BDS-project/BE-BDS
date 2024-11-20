import dotenv from 'dotenv';
import { Storage } from '@google-cloud/storage';

dotenv.config();

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY.replace(/\\n/g, '\n')
  }
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);
export default bucket;
