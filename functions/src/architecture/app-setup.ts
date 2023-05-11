import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import { DataStore } from './datastore';

const app = initializeApp(firebaseConfig)
const dataStore = new DataStore(app)
export const db = dataStore.db
export const nodeBuilder = dataStore.nodeBuilder
