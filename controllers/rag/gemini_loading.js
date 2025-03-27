const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

// Configuration requise pour GoogleGenerativeAI

// initialisation de modèle

let history = [];

exports.Generate = async (data, res) => {
    const required_keys = ["prompt"];
    const missing_keys = required_keys.filter((key) => !(key in data.body));

    if (missing_keys.length > 0) {
        return res.status(400).json({
            error: "Bad Request.",
            message: `Missing keys: ${missing_keys.join(", ")}`,
        });
    } 
    try {
        console.log("Hey", data.body);
        
        const configuration = new GoogleGenerativeAI(process.env.API_KEY);
        const modelId = "gemini-2.0-flash";
        const model = configuration.getGenerativeModel({ model: modelId });
        const { prompt } = data.body;
        // return res.status(200).json({ prompt: data.body});
    
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        // const result = await model.generateContent(prompt);
        // const response = await result.response;
        // const text = response.text();
        // console.log(text);

        // const text = response;
        history.push(text);
        // console.log(history);
    
        res.send({ response: text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.history = (data, res) => {
    return res.status(200).json({ history: history });
}
  