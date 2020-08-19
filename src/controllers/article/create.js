const Article = require('../../models/Article');
const User = require('../../models/User');
const handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');

module.exports = async (req, res) => {
  try {
    const { title, content, userId, photo, name, tags } = req.body;
    const user = await User.findById(userId);
    if (!user) throwError(404, 'No user found with this ID');
    // if (!listTitles.length || !listContent.length)
    //   throwError(400, 'Must include at least one article title and one content section');
    // if (listTitles.length !== listContent.length)
    //   throwError(400, 'Must have a title and content for each section');

    const article = new Article({
      user: user._id,
      title,
      content,
      photo,
      name,
      tags,
    });
    
    const savedArticle = await article.save();
    handlers.success(res, 201, { article: savedArticle });
  } catch(e) {
    handlers.error(res, e, 'createArticle');
  }
};
