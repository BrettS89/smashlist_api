const router = require('express').Router();
const Controllers = require('../controllers/articles');

router.get('/:offset', Controllers.getArticles);

module.exports = router;
