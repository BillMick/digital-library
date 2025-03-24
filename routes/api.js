var express = require("express");
var router = express.Router();
const app = express();
const multer = require("../middlewares/multer-config");

const upload_controller = require("../controllers/upload.js");

router.post(
    "/upload",
    multer.single("file"),
    upload_controller.Upload
);

module.exports = router;