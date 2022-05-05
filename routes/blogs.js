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
    const comments = await commentController.getById(req.params.id);

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

router.get('/updateBlog/:id',async (req, res) => {
    const blogData = await blogController.getById(req.params.id);
    const blog={
        _id: req.params.id,
        title: blogData.title,
        description: blogData.description,
        comments: blogData.comments,
        date: blogData.date
    }

    res.render('updateBlog',{
        title: 'Update Blog',
        isUpdate: true,
        blog
    });
});

router.post('/updateBlog', async (req, res) => {
    const blog =new Blog({
        title: req.body.title,
        description: req.body.description
    });

    const updatedBlog = await blogController.update(req.body._id, blog);
    
    res.redirect(`/blogs/${req.body._id}`);
});

router.delete('/deleteBlog/:id', async (req, res) => {
    const deletedBlog = await blogController.delete(req.params.id);
    res.redirect('/');
});

module.exports = router;