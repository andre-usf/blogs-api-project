module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
    underscored: true,
    tableName: 'blog_posts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return BlogPost;
};