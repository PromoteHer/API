const Express = require('express');
const Logger = require('morgan');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Middleware = require('./routes/middleware');

const App = Express();
const Port = process.env.PORT || 3001;
const Database = Mongoose.connect('mongodb://localhost:27017/promoteHer', { useNewUrlParser: true });

Database.then(() => { console.log('Connected to Database'); }).catch((error) => { console.warn('Database connection error: ', error); });

App.use(Logger('combined'));

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));

let postRouter = require('./routes/posts');
App.use('/posts', postRouter);

let categoryRouter = require('./routes/categories');
App.use('/categories', categoryRouter);

App.listen(Port, () => {
    console.log(`Listening on port ${Port}:`);
});

App.use(Middleware.Error);
App.use(Middleware.NotFound);

module.exports = App;