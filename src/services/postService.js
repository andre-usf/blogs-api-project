const Sequelize = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');
const config = require('../config/config');
const validatePostFields = require('./validations/validatePostFields');

const { Op } = Sequelize;

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const ERRO_INTERNO = 'Erro interno';

const getAllPosts = async () => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    
    return { type: 200, result: posts };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const getPostById = async (id) => {
  try {
    const post = await BlogPost.findOne({ 
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!post) return { type: 404, result: { message: 'Post does not exist' } };

    return { type: 200, result: post };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const getPostBySearch = async (search) => {
  try {
    const posts = await BlogPost
    .findAll({ 
      where: { [Op.or]: [
      { title: { [Op.like]: `%${search}%` } }, { content: { [Op.like]: `%${search}%` } },
    ] },
      include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
    
    return { type: 200, result: posts };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const validateCategoryIds = async (categoryIds) => {
  try {
    const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
    
    if (count !== categoryIds.length) {
      return { type: 400, result: { message: 'one or more "categoryIds" not found' } };
    }

    return { type: null, result: '' };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const transactionCall = async (title, content, categoryIds, userToken) => sequelize
  .transaction(async (transaction) => {
  const { id: userId } = userToken;

  const createdPost = await BlogPost
  .create({ title, content, userId, categoryIds }, { transaction });

  await PostCategory
  .bulkCreate(categoryIds.map((categoryId) => ({ postId: createdPost.id, categoryId })), 
  { transaction });

  return createdPost;
});

const createPost = async ({ body, userToken }) => {
  try {
    const { title, content, categoryIds } = body;
    
    const errorPostFields = validatePostFields(body);
    if (errorPostFields.type) return errorPostFields;

    const errorCategoryIds = await validateCategoryIds(categoryIds);
    if (errorCategoryIds.type) return errorCategoryIds;

    const transactionResult = await transactionCall(title, content, categoryIds, userToken);

    return { type: 201, result: transactionResult };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const updatePost = async ({ body, userToken, params }) => {
  try {
    const { id: userId } = userToken;
    
    const errorPostFields = validatePostFields(body);
    if (errorPostFields.type) return errorPostFields;

    const { result: { userId: postUserId } } = await getPostById(params.id);

    if (userId !== postUserId) return { type: 401, result: { message: 'Unauthorized user' } };

    const { title, content } = body;
    await BlogPost.update({ title, content }, { where: { id: params.id } });
    
    const updatedPost = await getPostById(params.id);

    return { type: 200, result: updatedPost.result };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

const deletePost = async ({ userToken, params }) => {
  try {
    const { id: userId } = userToken;
  
  const response = await getPostById(params.id);

  if (response.type === 404) return { type: response.type, result: response.result };
  
  if (userId !== response.result.userId) {
    return { type: 401, result: { message: 'Unauthorized user' } };
  }

  await BlogPost.destroy({ where: { id: params.id } });

  return { type: 204, result: '' };
  } catch (error) {
    return { type: 500, result: { message: ERRO_INTERNO, error } };
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostBySearch,
  createPost,
  updatePost,
  deletePost,
};
