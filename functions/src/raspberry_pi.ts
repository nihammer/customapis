import * as functions from 'firebase-functions';
import { firestore } from "firebase-admin";
const moment = require('moment-timezone');

export class RaspberryPi {
    private readonly fs: firestore.Firestore;

    constructor() {
        this.fs = firestore();
    }

    registerIp = functions.https.onRequest((request, response) => {
        console.log("ip=  " + JSON.stringify(request.ip));
        const currentTime: string = this.getLocalTime();
        return this.fs.collection('raspberry').doc(currentTime)
            .set(
                {
                    ip_address: request.ip,
                    created_at: currentTime
                }
            )
            .then(() => {
                console.log("Document successfully written!");
                return response.send('OK');
            })
            .catch((err) => {
                console.error("Error: ", err);
                return response.send('Failed!');
            });
    });

    getIp = functions.https.onRequest(async (request, response) => {
        const currentTime: string = this.getLocalTime();
        const ipSnap = await this.fs.collection('raspberry').orderBy("created_at", "desc").limit(1).get();
        return this.fs.collection('guest').doc(currentTime)
            .set(
                {
                    ip_address: request.ip,
                    created_at: currentTime
                }
            )
            .then(() => {
                return response.send(ipSnap.docs[0].data().ip_address);
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

// module.exports = RaspberryPi;
