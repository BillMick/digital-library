require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { Sequelize } = require('sequelize');
const { SQLDatabase } = require('langchain/sql_db');
const { createSqlAgent, SqlToolkit } = require('langchain/agents/toolkits/sql');
const { AgentExecutor, ZeroShotAgent } = require('langchain/agents');
const { PromptTemplate } = require('@langchain/core/prompts');
const path = require('path'); // Add path module

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error('API_KEY is missing. Please check your .env file');
}

const GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, '../../resources/infra-odyssey-421910-7e0f2f55ded1.json'); // Use absolute path
process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS;

async function runAgent() {
    try {
        const model = new ChatGoogleGenerativeAI({
            modelName: 'gemini-2.0-flash',
            temperature: 0,
        });

        const sequelize = new Sequelize('digital_library', 'postgres', 'postgres', {
            host: 'localhost',
            dialect: 'postgres',
        });

        await sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');

        const db = await SQLDatabase.fromDataSourceParams({
            appDataSource: sequelize,
        });

        const toolkit = new SqlToolkit(db, model);

        const executor = createSqlAgent(model, toolkit, {
            agentType: 'zero-shot-react-description',
            verbose: true,
        });

        const response = await executor.invoke({
            input: "Pourrais-tu me proposer des livres dont la catégorie est Art ?",
        });

        console.log(response.output);

        await sequelize.close();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

runAgent();