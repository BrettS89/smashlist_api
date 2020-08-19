const mongoose = require('mongoose');
const keys = require('./src/config');
const app = require('./src/app');

mongoose.connect(keys.mongoURI);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
