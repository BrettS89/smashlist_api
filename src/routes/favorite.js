const router = require('express').Router();
const Controllers = require('../controllers/favorite');

router.post('/create/:articleId', Controllers.createFavorite);
router.get('/get', Controllers.getFavorites);

module.exports = router;
