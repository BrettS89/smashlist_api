const Favorite = require('../../models/Favorite');
const User = require('../../models/User');
const Article = require('../../models/Article');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { articleId } = req.params;
    const [user, article, existingFavorite] = await Promise.all([
      User.findById(_id),
      Article.findById(articleId),
      Favorite.find({ user: _id, article: articleId }),
    ]);

    if (existingFavorite.length) throwError(400, 'You already favorited this article');
    if (!user) throwError(404, 'User not found');
    if (!article) throwError(404, 'Article not found');
    const fav = new Favorite({
      user: user._id,
      article: article._id,
    });
    const favorite = await fav.save();
    const fullFavorite = await Favorite.findById(favorite._id)
      .populate('article', ['title', 'name', 'photo']);
    Handlers.success(res, 200, { favorite: fullFavorite });
  } catch(e) {
    Handlers.error(res, e, 'createFavorite');
  }
}
