const postService = require('../services/postService');

const getAllPosts = async (_req, res) => {
  const response = await postService.getAllPosts();
  return res.status(response.type).json(response.result);
};

module.exports = {
  getAllPosts,
};
