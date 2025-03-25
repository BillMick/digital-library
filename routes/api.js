const express = require("express");
const router = express.Router();
const checkUserValidity = require('../middlewares/user-validity');
const multer = require("../middlewares/multer-config");
const upload_controller = require("../controllers/files/upload.js");
const download_controller = require("../controllers/files/download.js");
const ragController = require("../controllers/rag/gemini_loading.js");

// Order matters: checkUserValidity runs before multer
router.post( "/upload", multer.single("file"), upload_controller.Upload );

router.get("/download/:fileId", download_controller.Download);


// #################################### RAG AGENT 
// const bodyParser = require("body-parser");
router.post("/generate", ragController.generateResponse);

router.get("/generate", ragController.history);


module.exports = router;
