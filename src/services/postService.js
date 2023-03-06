const { BlogPost, User, Category } = require('../models');

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: 200, result: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
   });

  if (!post) return { type: 404, result: { message: 'Post does not exist' } };

  return { type: 200, result: post };
};

module.exports = {
  getAllPosts,
  getPostById,
};
