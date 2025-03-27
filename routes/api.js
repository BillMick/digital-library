const express = require("express");
const router = express.Router();
const checkUserValidity = require('../middlewares/user-validity');
const upload_controller = require("../controllers/files/upload.js");
const download_controller = require("../controllers/files/download.js");
const ragController = require("../controllers/rag/gemini_loading.js");



// #################################### RAG AGENT 
// const bodyParser = require("body-parser");
// router.post("/generate", ragController.Generate);
router.post("/generate", ragController.Generate);
router.get("/generate", ragController.history);
// ###############################################

// Order matters: checkUserValidity runs before multer
const multer = require("../middlewares/multer-config");
router.post( "/upload", multer.single("file"), upload_controller.Upload );
router.get("/download/:fileId", download_controller.Download);



module.exports = router;
