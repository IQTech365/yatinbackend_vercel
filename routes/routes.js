const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
var dir = "./public/videos";   // PATH TO UPLOAD FILE
if (!fs.existsSync(dir)) {  // CREATE DIRECTORY IF NOT FOUND
  fs.mkdirSync(dir, { recursive: true });
}
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

const {signIn, createUser, getAllUsers} = require('../controllers/auth');
const {saveMedia, getMediaById, getMediaAll} = require('../controllers/group');

router.post('/signin', signIn);
router.post('/create', createUser);
router.get('/users', getAllUsers);
router.post('/group', upload.single('video_file'), saveMedia);
router.get('/get-media', getMediaById);
router.get('/get-media-all', getMediaAll);


module.exports = router;