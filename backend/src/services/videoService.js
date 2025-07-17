const Video = require('../models/Video');

const addVideo = async (name, link) => {
  const video = new Video({ name, link });
  return await video.save();
};

const getAllVideos = async () => {
  return await Video.find().sort({ addedAt: -1 });
};

const getVideoById = async (id) => {
  return await Video.findById(id);
};

const deleteVideo = async (id) => {
  return await Video.findByIdAndDelete(id);
};

module.exports = { addVideo, getAllVideos, getVideoById, deleteVideo };
