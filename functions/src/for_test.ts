import * as functions from 'firebase-functions';
import { firestore, storage, auth } from "firebase-admin";
const moment = require('moment-timezone');

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

    testDb = functions.https.onRequest((request, response) => {
        const currentTime: string = this.getLocalTime();
        return this.fs.collection('test').doc(currentTime)
            .set(
                {
                    time_in_string: currentTime,
                    created_at: new Date()
                }
            )
            .then(() => {
                return response.send('OK');
            })
            .catch((err) => {
                console.error("Error: ", err);
                return response.send('Failed!');
            });
    });

    private getLocalTime() {
        const currentTime = moment().tz("Asia/Tokyo").format();
        return currentTime.replace(/\+09:00/,'');
    }
}

// module.exports = Test;
