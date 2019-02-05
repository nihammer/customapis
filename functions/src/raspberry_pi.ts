import * as functions from 'firebase-functions';
import { firestore } from "firebase-admin";
const moment = require('moment-timezone');

export class RaspberryPi {
    private readonly fs: firestore.Firestore;

    constructor() {
        this.fs = firestore();
    }

    registerIp = functions.https.onRequest(async (request, response) => {
        const currentTime: string = this.getLocalTime();
        const currentIp: string = request.body.current_ip;
        const newIp: string = request.body.new_ip;
        const currentSnap = await this.fs.collection('raspberrypi').doc('current').get();
        if (currentIp !== currentSnap.data().ip_address) {
            console.error('Current Ip is wrong!');
            return response.send('Failed!');
        }
        return this.fs.collection('raspberrypi').doc('current')
            .set(
                {
                    ip_address: newIp,
                    created_at: currentTime
                }
            )
            .then(() => {
                return this.fs.doc(`raspberrypi/current/changedIps/${currentTime}`)
                    .set(
                        {
                            ip_address: currentSnap.data().ip_address,
                            created_at: currentSnap.data().created_at
                        }
                    )
                    .then(() => {
                        console.log("Document successfully written!");
                        return response.send('OK');
                    });
            })
            .catch((err) => {
                console.error("Error: ", err);
                return response.send('Failed!');
            });
    });

    getIp = functions.https.onRequest(async (request, response) => {
        const currentTime: string = this.getLocalTime();
        const ipSnap = await this.fs.collection('raspberrypi').doc('current').get();
        return this.fs.doc(`raspberrypi/current/requestedIps/${currentTime}`)
            .set(
                {
                    ip_address: request.ip,
                    created_at: currentTime
                }
            )
            .then(() => {
                return response.send(ipSnap.data().ip_address);
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
