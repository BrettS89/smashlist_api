const Favorite = require('../../models/Favorite');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const favorites = await Favorite.find({ user: _id })
      .populate('article', ['title', 'name', 'photo'])
      .sort({ _id: -1 });
    Handlers.success(res, 200, { favorites });
  } catch(e) {
    Handlers.error(res, e, 'getFavorites');
  }
};
