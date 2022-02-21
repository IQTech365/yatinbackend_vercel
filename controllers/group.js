const fs = require("fs");
const util = require("util");
const { storageRef } = require("../firebase2");
const { v4: uuidv4 } = require("uuid");
const MediaModel = require("../models/Media");
const unlinkFile = util.promisify(fs.unlink);

const saveMedia = async (req, res) => {
  const storage = await storageRef.upload(req.file.path, {
    public: true,
    destination: `/videos/${req.file.filename}`,
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
    },
  });
  const media_link = storage[0].metadata.mediaLink;
  const media_id = storage[0].metadata.id;

  const data = {
    media_id: media_id,
    media_link: media_link,
    groups: JSON.parse(req.body.groups),
  };
  try {
    const media = new MediaModel(data);
    const doc = await media.save();
    res.send({ media: doc.media });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMediaById = async (req, res) => {
  const media_id = req.query.id;
  try {
    const media = await MediaModel.findOne({ media_id: media_id });
    res.send(media);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMediaAll = async (req, res) => {
  try {
    const medias = await MediaModel.find({});
    res.send(medias);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  saveMedia,
  getMediaById,
  getMediaAll,
};
