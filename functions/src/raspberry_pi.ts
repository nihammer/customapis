import * as functions from 'firebase-functions';
import { firestore } from "firebase-admin";

export class RaspberryPi {
    private readonly fs: firestore.Firestore;

    constructor() {
        this.fs = firestore();
    }

    registerIp = functions.https.onRequest((request, response) => {
        console.log("ip=  " + JSON.stringify(request.ip));
        return this.fs.collection('raspberry').doc('ip').set({ ip_address: request.ip })
            .then(() => {
                console.log("Document successfully written!");
                return response.send('OK');
            })
            .catch((err) => {
                console.error("Error: ", err);
                return response.send('Failed!');
            });
    });

    getIp = functions.https.onRequest((request, response) => {
        return this.fs.collection('raspberry').doc('ip').get()
            .then((snap) => {
                return response.send(snap.data().ip_address);
            })
            .catch((err) => {
                console.error("Error: ", err);
                return response.send('Failed!');
            });
    });
}
