require('dotenv').config();
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const path = require('path');

const API_KEY = process.env.API_KEY;
const GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, '../../resources/infra-odyssey-421910-7e0f2f55ded1.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS;

async function testGenAI() {
    try {
        const model = new ChatGoogleGenerativeAI({
            modelName: 'gemini-2.0-flash',
            temperature: 0,
        });
        console.log('ChatGoogleGenerativeAI initialized successfully.');
    } catch (error) {
        console.error('Error initializing ChatGoogleGenerativeAI:', error);
    }
}

testGenAI();