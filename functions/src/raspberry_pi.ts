import * as functions from 'firebase-functions';

export class RaspberryPi {
    registerIp = functions.https.onRequest((request, response) => {
        console.log("ip=  " + JSON.stringify(request.ip));
        console.log("ips=  " + JSON.stringify(request.ips));
        return response.send('OK');
    });
}
