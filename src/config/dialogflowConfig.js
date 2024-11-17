import dotenv from 'dotenv';

import { SessionsClient } from '@google-cloud/dialogflow';

dotenv.config();

const sessionClient = new SessionsClient({
  credentials: {
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  projectId: process.env.DIALOGFLOW_PROJECT_ID
});

export default sessionClient;
export const projectId = process.env.DIALOGFLOW_PROJECT_ID;
