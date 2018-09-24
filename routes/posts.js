const Express = require('express');
const Post = require('../models/post');
const Middleware = require('./middleware');
const PostRouter = Express.Router();

PostRouter.use('/:postId', Middleware.FindPost);

PostRouter.route('/')
.get((request, result) => {
    Post.find({}, (error, posts) => {
        result.json(posts);
    });
})
.post((request, result) => {
    let post = new Post(request.body);

    post.save()
    .then(post => {
        result.status(201).json(post);
    })
    .catch(error => {
        if (error.name == 'ValidationError') result.status(400).json('Incorrect input');
        else result.status(500).json('Error creating post');
    });
});

PostRouter.route('/:postId')
.get((request, result) => {
    result.json(request.post);
})
.put((request, result) => {
    request.post.content = request.body.content;
    request.post.email = request.body.email;
    request.post.location = request.body.location;
    request.post.approved = request.body.approved;
    request.post.categories = request.body.categories;

    request.post.save()
    .then(post => {
        result.status(201).json(post);
    })
    .catch(error => {
        if (error.name == 'ValidationError') result.status(400).json('Incorrect input');
        else result.status(500).json('Error writing post');
    });
})
.patch((request, result) => {
    if (request.body._id) delete request.body._id;

    for (let property in request.body) {
        request.post[property] = request.body[property];
    }
    
    request.post.save()
    .then(post => {
        result.status(204).json(post);
    })
    .catch(error => {
        if (error.name == 'ValidationError') result.status(400).json('Incorrect input');
        else result.status(500).json('Error updating post');
    });
})
.delete((request, result) => {
    request.post.remove()
    .then(() => {
        result.status(204).json('Removed');
    })
    .catch(error => {
        result.status(500).json('Error deleting post');
    });
});

PostRouter.use(Middleware.NotAllowed);

module.exports = PostRouter;