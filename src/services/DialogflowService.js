import { v4 as uuidv4 } from 'uuid';
import sessionClient, { projectId } from '../config/dialogflowConfig.js';

const sendMessageToDialogflow = async (message, sessionId = uuidv4()) => {
  try {
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'vi'
        }
      }
    };

    const [response] = await sessionClient.detectIntent(request);
    return response.queryResult;
  } catch (error) {
    console.error('Error sending message to Dialogflow:', error);
    throw new Error('Dialogflow service error');
  }
};
export default sendMessageToDialogflow;
