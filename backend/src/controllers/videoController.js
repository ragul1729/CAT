const videoService = require('../services/videoService');

const createVideo = async (req, res) => {
  const { name, link } = req.body;
  try {
    const video = await videoService.addVideo(name, link);
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const deleted = await videoService.deleteVideo(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Video not found' });
    res.status(200).json({ message: 'Video deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createVideo, getAllVideos, getVideoById, deleteVideo };
