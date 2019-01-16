import * as functions from 'firebase-functions';
import { firestore, storage, auth } from "firebase-admin";

export class ForTest {
    private readonly fs: firestore.Firestore;
    private count: number;

    constructor() {
        this.fs = firestore();
        this.count = 0;
    }

    executionCount = functions.https.onRequest((request, response) => {
        this.count++;
        console.log("count=  " + this.count);
        throw new functions.https.HttpsError('unauthenticated', 'Authentication error!', 'unauthenticated');
        // response.send('OK');
    });

    waitAFewSeconds = functions.https.onRequest((request, response) => {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, 5000);
        }).then(() => {
            return response.send('<========== OK ==========>');
        }).catch(error => {
            console.log("upload file failed.", error);
        });
    });
}

// module.exports = Test;
