const mongoose = require('mongoose');
const Article = require('../../models/Article');

exports.getArticlesSignedIn = (userId, offset) => {
  const userIdObj = mongoose.Types.ObjectId(userId);
  return Article.aggregate([
    {
      $lookup: {
        from: 'favorites',
        let: { 'id': "$_id" },
        pipeline: [
          { $match:
             { $expr:
                { $and:
                   [
                     { $eq: [ "$article",  "$$id" ] },
                     { $eq: [ "$user", userIdObj ] }
                   ]
                }
             }
          },
       ],
        as: "favorited",
      },
    },
    {
      $match: { 'favorited': { '$ne': [] } }
    },
    { $sort: { '_id': -1 } },
    { $skip: offset },
    { $limit: 20 },
  ]);
}
