import { FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore/lite';
import { NodeBuilder } from '../entities/node/node-builder';

export class DataStore {
    app: FirebaseApp;
    db: Firestore;
    nodeBuilder: NodeBuilder
    static singleton: DataStore;

    constructor(app: FirebaseApp) {

        this.app = app;
        this.db = getFirestore(app)
        this.nodeBuilder = new NodeBuilder()
        DataStore.singleton = this;
        return DataStore.singleton;
    }
}
