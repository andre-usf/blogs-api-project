const Sequelize = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');
const config = require('../config/config');

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

const validatePostFields = (post) => {
  const arrayValues = Object.values(post);
  const someValuesEmpty = arrayValues.some((value) => !value);
  
  if (someValuesEmpty) {
   return { type: 400, result: { message: 'Some required fields are missing' } };
  }

  return { type: 201, result: null };
};

const validateCategoryIds = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
  
  if (count !== categoryIds.length) {
    return { type: 400, result: { message: 'one or more "categoryIds" not found' } };
  }

  return { type: 201, result: null };
};

const createPost = async ({ body, userToken }) => {
  const { title, content, categoryIds } = body;
  const { id: userId } = userToken.payload.dataValues;

  const errorPostFields = validatePostFields(body);
  if (errorPostFields.result) return errorPostFields;

  const errorCategoryIds = await validateCategoryIds(categoryIds);
  if (errorCategoryIds.result) return errorCategoryIds;

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

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
};
