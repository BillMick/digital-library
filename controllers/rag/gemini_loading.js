const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

// Configuration requise pour GoogleGenerativeAI

// initialisation de modèle

let history = [];

exports.generateResponse = async (req, res) => {
    try {
        console.log(req.body);
        
        const configuration = new GoogleGenerativeAI(process.env.API_KEY);
        const modelId = "gemini-pro";
        const model = configuration.getGenerativeModel({ model: modelId });
        const { prompt } = req.body;
        return res.status(200).json({ prompt: req.body});
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    
        history.push(text);
        console.log(history);
    
        res.send({ response: text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.history = (req, res) => {
    return res.status(200).json({ history: history });
}
  