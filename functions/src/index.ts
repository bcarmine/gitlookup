import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as puppeteer from 'puppeteer';
import { scrapeNZX } from './scrape'

admin.initializeApp()
export const scrapeCompanies = functions
    .runWith({timeoutSeconds:60, memory:"1GB"})
    .region('europe-west1')
    .https.onRequest(async(req, res) => {
        const companies = await scrapeNZX('https://www.nzx.com/markets/NZSX');

        await admin.firestore().doc('nzx/companies').set({
            updatedAt: new Date(),
            companies
        }, {merge:true});

        res.write(companies);
    });

scrapeNZX('https://www.nzx.com/markets/NZSX')