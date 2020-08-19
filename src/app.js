const express = require('express');
const cors = require('cors');
const app = express();

const articleRoutes = require('./routes/article');
const articlesRoutes = require('./routes/articles');
const favoriteRoutes = require('./routes/favorite');
const userRoutes = require('./routes/user');

app.use(cors());

app.use(express.json());
app.use('/api/article', articleRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/favorite', favoriteRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
