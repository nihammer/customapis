import * as functions from 'firebase-functions';
import { firestore, storage, auth } from "firebase-admin";

class Test {
    private readonly fs: firestore.Firestore;
    private readonly st: storage.Storage;

    constructor() {
        this.fs = firestore();
        this.st = storage();
    }

    executionCount = functions.https.onRequest((request, response) => {
        this.count++;
        console.log("count=  " + this.count);
        throw new functions.https.HttpsError('unauthenticated', 'Authentication error!', 'unauthenticated');
        // response.send('OK');
    });

    uploadImage = functions.https.onRequest((request, response) => {
        const imagePath = "test/sample.png";
        return st.bucket().upload("./files/sample.png", { destination: imagePath }).then(() => {
            return response.send(imagePath);
        }).catch(error => {
            console.log("upload file failed.", error);
        });
    });
}

module.exports = Test;
