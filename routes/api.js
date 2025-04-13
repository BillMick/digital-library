const express = require("express");
const router = express.Router();
const checkUserValidity = require('../middlewares/user-validity');
const upload_controller = require("../controllers/files/upload.js");
const search_controller = require("../controllers/files/search.js");
const user_files_controller = require("../controllers/files/user_files.js");
const download_controller = require("../controllers/files/download.js");
const ragController = require("../controllers/rag/rag_agent.js");
const categoriesController = require("../controllers/files/categories.js");



// #################################### RAG AGENT 
// const bodyParser = require("body-parser");
// router.post("/generate", ragController.Generate);
router.post("/generate", ragController.RagAgent);
// router.get("/generate", ragController.history);
// ###############################################

// Order matters: checkUserValidity runs before multer
const multer = require("../middlewares/multer-config");
router.post( "/upload", multer.single("file"), upload_controller.Upload );
router.get("/download/:fileId", download_controller.Download);
router.get("/categories", categoriesController.Categories);

router.get("/files", search_controller.AllFiles);
router.get("/by-id/:fileId", search_controller.SearchByID);
router.get("/by-title/:title", search_controller.SearchByTitle);
router.get("/by-author/:author", search_controller.SearchByAuthor);

router.get("/connect/:userId/:fileId", user_files_controller.ConnectToUser);
router.get("/disconnect/:userId/:fileId", user_files_controller.DisconnectToUser);

module.exports = router;
