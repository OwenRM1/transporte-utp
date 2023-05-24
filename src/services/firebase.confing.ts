import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { API_KEY, APP_ID, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID } from '../variables';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  appId: APP_ID,
};
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
