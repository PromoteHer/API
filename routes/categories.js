const Express = require('express');
const Category = require('../models/category');
const Middleware = require('./middleware');
const CategoryRouter = Express.Router();

CategoryRouter.use('/:categoryId', Middleware.FindCategory);

CategoryRouter.route('/')
.get((request, result) => {
    Category.find({}, (error, categories) => {
        result.json(categories);
    });
})
.post((request, result) => {
    let category = new Category(request.body);
    
    category.save()
    .then(category => {
        result.status(201).json(category);
    })
    .catch(error => {
        if (error.name == 'ValidationError') result.status(400).json('Incorrect input');
        else result.status(500).json('Error creating category');
    });
});

CategoryRouter.route('/:categoryId')
.put((request, result) => {
    request.category.name = request.body.name;
    request.category.label = request.body.label;

    request.category.save()
    .then(category => {
        result.status(201).json(category);
    })
    .catch(error => {
        if (error.name == 'ValidationError') result.status(400).json('Incorrect input');
        else result.status(500).json('Error writing category');
    });
})
.patch((request, result) => {
    if (request.body._id) delete request.body._id;

    for (let property in request.body) {
        request.category[property] = request.body[property];
    }
    
    request.category.save()
    .then(category => {
        result.status(204).json(category);
    })
    .catch(error => {
        if (error.name == 'ValidationError') result.status(400).json('Incorrect input');
        else result.status(500).json('Error updating category');
    });
})
.delete((request, result) => {
    request.category.remove()
    .then(() => {
        result.status(204).json('Removed');
    })
    .catch(error => {
        result.status(500).json('Error deleting category');
    });
});

CategoryRouter.use(Middleware.NotAllowed);

module.exports = CategoryRouter;