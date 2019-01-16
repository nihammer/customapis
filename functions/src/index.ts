import { initializeApp } from 'firebase-admin';
import { ForTest } from './for_test';
import { RaspberryPi } from './raspberry_pi';

initializeApp();

export const Pi = new RaspberryPi();
export const Test = new ForTest();

// if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.indexOf("Pi") === 0) {
//     console.log("function name1 = " + process.env.FUNCTION_NAME);
//     const RaspberryPi = require('./raspberry_pi');
//     exports.Pi = new RaspberryPi();
// }

// if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.indexOf("T") === 0) {
//     console.log("function name2 = " + process.env.FUNCTION_NAME);
//     const Test = require('./test');
//     const t = new Test();
//     exports["TexecutionCount"] = t["executionCount"];
//     exports["TuploadImage"] = t["uploadImage"];
// }
