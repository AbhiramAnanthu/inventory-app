require('dotenv').config();
const express = require('express');
const categoryRouter = require('./routes/categoryRoutes');
const indexRouter = require('./routes/indexRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/category', categoryRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
