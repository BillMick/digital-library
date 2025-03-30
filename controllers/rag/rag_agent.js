const path = require('path');
const fs = require('fs');

exports.RagAgent = async (req, response) => {
    const required_keys = ["userId", "prompt"];
    const missing_keys = required_keys.filter((key) => !(key in req.body));
    if (missing_keys.length > 0) {
        return response.status(400).json({
            error: "Bad Request.",
            message: `Missing keys: ${missing_keys.join(", ")}`,
        });
    } else {
        try {
            const resources_folder_path = path.join(__dirname, "../../resources");
            const { spawn } = require("child_process");
            const python_script_path = path.join(resources_folder_path, "rag_agent.py");
            let python_process = spawn("python3.10", [python_script_path, req.body.userId, req.body.prompt]);
            python_process.stdout.on("data", (data) => {
                console.log(`Python script stdout: ${data}`);
            });
            python_process.stderr.on("data", (data) => {
                console.log(`Python script stderr: ${data}`);
            });
            python_process.on("close", (code) => {
                console.log(`Python script exited with code ${code}`);
                if (code == 0) {
                    const chat_file_path = path.join(resources_folder_path, `${req.body.userId}.json`); // to change
                    fs.readFile(chat_file_path, "utf8", (err, rag_response) => { // to change
                        if (err) {
                            console.error("Error reading file:", err);
                            return response.status(500).json({message: "Something has gone bad. Try again.", error: err});
                        } else {
                            const chat = JSON.parse(rag_response);
                            return response.status(201).json({message: chat});
                        }
                    });
                } else {
                    return response.status(500).json({message: "Something has gone bad. Try again.", error: `Code ${code}`});
                }
            });
        } catch (error) {
            console.log(`Error :, ${error}`);
        }
    }
}
