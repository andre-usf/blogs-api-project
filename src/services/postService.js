const Sequelize = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');
const config = require('../config/config');
const validatePostFields = require('./validations/validatePostFields');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

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

const validateCategoryIds = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
  
  if (count !== categoryIds.length) {
    return { type: 400, result: { message: 'one or more "categoryIds" not found' } };
  }

  return { type: null, result: '' };
};

const createPost = async ({ body, userToken }) => {
  const { title, content, categoryIds } = body;
  
  const { id: userId } = userToken.dataValues;
  
  const errorPostFields = validatePostFields(body);
  if (errorPostFields.type) return errorPostFields;

  const errorCategoryIds = await validateCategoryIds(categoryIds);
  if (errorCategoryIds.type) return errorCategoryIds;

  const transactionResult = await sequelize.transaction(async (transaction) => {
    const createdPost = await BlogPost
    .create({ title, content, userId, categoryIds }, { transaction });

    await PostCategory
    .bulkCreate(categoryIds.map((categoryId) => ({ postId: createdPost.id, categoryId })), 
    { transaction });

    return createdPost;
  });

  return { type: 201, result: transactionResult };
};

const updatePost = async ({ body, userToken, params }) => {
  const { id: userId } = userToken;
  
  const errorPostFields = validatePostFields(body);
  if (errorPostFields.type) return errorPostFields;

  const { result: { userId: postUserId } } = await getPostById(params.id);

  if (userId !== postUserId) return { type: 401, result: { message: 'Unauthorized user' } };

  const { title, content } = body;
  await BlogPost.update({ title, content }, { where: { id: params.id } });
  
  const updatedPost = await getPostById(params.id);
  console.log(updatedPost);

  return { type: 200, result: updatedPost.result };
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
};
