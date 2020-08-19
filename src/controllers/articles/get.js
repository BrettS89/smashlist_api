const Article = require('../../models/Article');
const handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const getArticlesService = require('../../services/articles/get');

module.exports = async (req, res) => {
  try {
    let user = null;
    try {
      user = await userAuth(req.header('authorization'));
    } catch(e) {}

    const { offset } = req.params;
    // let articles = user
    //   ? await getArticlesService.getArticlesSignedIn(user._id, Number(offset) || 0)
    //   : await Article
    //     .find()
    //     .sort({ _id: -1 })
    //     .skip(Number(offset) || 0)
    //     .limit(20);

    const articles = await Article
      .find()
      .sort({ _id: -1 })
      .skip(Number(offset) || 0)
      .limit(20);
    
    // articles = articles.map(a => {
    //   return a.favorited.length
    //     ? { ...a, favorited: true }
    //     : { ...a, favorited: false };
    // });

    handlers.success(res, 201, { articles });
  } catch(e) {
    handlers.error(res, e, 'getArticles');
  }
};
