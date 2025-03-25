const express = require("express");
const router = express.Router();
const checkUserValidity = require('../middlewares/user-validity');
const multer = require("../middlewares/multer-config");
const upload_controller = require("../controllers/files/upload.js");
const download_controller = require("../controllers/files/download.js");

// Order matters: checkUserValidity runs before multer
router.post(
    "/upload",
    // checkUserValidity,
    multer.single("file"),
    upload_controller.Upload
);

router.get("/download/:fileId", download_controller.Download);

module.exports = router;
