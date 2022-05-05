const {Router} = require('express');
const router = Router();
const BlogController = require('../controllers/BlogController');
const CommentController = require('../controllers/CommentController');
const Blog = require('../models/Blog');
const Comment= require('../models/Comment');

const blogController = new BlogController();
const commentController = new CommentController();

router.get('/', async (req, res) => {
    const blogs = await blogController.getAll();

    res.render('index', {
        blogs
    });
});

router.get('/blogs/:id', async (req, res) => {
    const blog = await blogController.getById(req.params.id);
    const comments = await commentController.getByBlogId(req.params.id);

    res.render('blog', {
        blog,
        comments
    });
});

router.post('/blogs/:id', async (req, res) => {
    const comment = req.body;
    comment.blogId = req.params.id;
    const newComment = await commentController.create(comment);

    res.redirect(`/blogs/${req.params.id}`);
});

router.get('/addBlog', (req, res) => {
    res.render('addBlog',{
        title: 'Add Blog',
        isCreate: true
    });
});

router.post('/addBlog', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description
    });

    const newBlog = await blogController.create(blog);

    res.redirect('/');
});

router.put('/updateBlog/:id', async (req, res) => {
    const blog = {
        title: req.body.title,
        description: req.body.description,
        date: Date.now(),
    };

    const updatedBlog = await blogController.update(req.params.id, blog);
    
    res.redirect(`/blogs/${req.params.id}`);
});

router.delete('/deleteBlog/:id', async (req, res) => {
    const deletedBlog = await blogController.delete(req.params.id);
    res.redirect('/');
});

module.exports = router;