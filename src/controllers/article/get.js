const Article = require('../../models/Article');
const Favorite = require('../../models/Favorite');
const handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    let user = null;
    try {
      user = await userAuth(req.header('authorization'));
    } catch(e) {}

    const { articleId } = req.params;
    let article = await Article.findById(articleId)
      .populate('user', ['_id', 'firstName', 'lastName', 'photo']);

    if (!article) throwError(404, 'Article not found');

    if (user) {
      const favorite = await Favorite.find({ user: user._id, article: article._id });
      if (favorite.length) {
        article = {
          ...article.toObject(),
          favorited: true,
        }
      }
    }

    handlers.success(res, 200, { article });
  } catch(e) {
    handlers.error(res, e, 'getArticle');
  }
};
