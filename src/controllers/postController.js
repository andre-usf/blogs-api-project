const postService = require('../services/postService');

const getAllPosts = async (_req, res) => {
  const response = await postService.getAllPosts();
  return res.status(response.type).json(response.result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const response = await postService.getPostById(id);
  
  return res.status(response.type).json(response.result);
};

const getPostsBySearch = async (req, res) => {
  const { q } = req.query;
  const { type, result } = await postService.getPostBySearch(q);
  
  return res.status(type).json(result);
};

const createPost = async (req, res) => {
  const response = await postService.createPost(req);
  return res.status(response.type).json(response.result);
};

const updatePost = async (req, res) => {
  const response = await postService.updatePost(req);
  return res.status(response.type).json(response.result);
};

const deletePost = async (req, res) => {
  const response = await postService.deletePost(req);
  return res.status(response.type).json(response.result);
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
};
