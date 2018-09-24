const Post = require('../models/post');
const Category = require('../models/category');

const Middleware = {
    Error: function(error, request, result, next) {
        result.status(error.status || 500);
        result.json({
            message: error.message,
            error: error
        });
    },
    NotAllowed: function(request, result, next) {
        result.status(405).json('Method not allowed');
    },
    NotFound: function(request, result, next) {
        result.status(404).json('Resource not found');
    },
    FindPost: function(request, result, next) {
        Post.findById(request.params.postId, (error, post) => {
            if (error) {
                result.status(404).send('Resource not found');
            }
            else {
                request.post = post;
                next();
            }
        })
    },
    FindCategory: function(request, result, next) {
        Category.findById(request.params.postId, (error, category) => {
            if (error) {
                result.status(404).send('Resource not found');
            }
            else {
                request.category = category;
                next();
            }
        })
    }
}

module.exports = Middleware;