import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
import { RaspberryPi } from './raspberry_pi';

initializeApp();

export const Pi = new RaspberryPi();
