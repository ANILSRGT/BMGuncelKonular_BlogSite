const {Router} = require('express');
const { model } = require('mongoose');
const router = Router();
const BlogController = require('../controllers/BlogController');
const CommentController = require('../controllers/CommentController');

const blogController = new BlogController();
const commentController = new CommentController();

router.get('/','/blogs', blogController.getAll, (req, res) => {
    res.render('index', {
        title:"Blogs",
        isIndex: true,
        blogs
    });
});

router.get('/blogs/:id', blogController.getById, commentController.getAll,(req, res) => {
    res.render('blog', {
        title: "Blog",
        isBlog: true,
        blog: req.blog,
        comments: req.comments
    });
});

router.post('/addBlog', blogController.create, (req, res) => {
    res.redirect('/');
});

router.put('/updateBlog/:id', blogController.update, (req, res) => {
    res.redirect('/');
});

router.delete('/blogs/:id', blogController.delete, (req, res) => {
    res.redirect('/');
});

router.post('/blogs/:id/comments', commentController.create, (req, res) => {
    res.redirect('/blogs/' + req.params.id);
});

module.exports = router;