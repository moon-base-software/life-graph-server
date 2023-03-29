import { FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore/lite';

export class DataStore {
    app: FirebaseApp;
    db: Firestore;
    static singleton: DataStore;

    constructor(app: FirebaseApp) {

        this.app = app;
        this.db = getFirestore(app)
        DataStore.singleton = this;
        return DataStore.singleton;
    }
}
