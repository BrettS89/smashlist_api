const router = require('express').Router();
const Controllers = require('../controllers/article');

router.post('/create', Controllers.createArticle);
router.get('/:articleId', Controllers.getArticle);

module.exports = router;
