import { Router } from 'express';
const router = Router();
import BlogController from '../controllers/BlogController';
import CommentController from '../controllers/CommentController';
import Blog from '../models/Blog';
import Comment from '../models/Comment';

const blogController = new BlogController();
const commentController = new CommentController();

router.get('/', async (req, res) => {
    const blogs = await blogController.getAll();

    res.render('index', {
        blogs
    });
});

router.get('/blogs/:id', async (req, res) => {
    const blogData = await blogController.getById(req.params.id);
    const blog = {
        _id: req.params.id,
        title: blogData.title,
        description: blogData.description,
        comments: blogData.comments,
        date: blogData.date
    }

    const comments = await Promise.all(blogData.comments.map(async comment => {
        const newCommentsData = await commentController.getById(comment);
        const newComment = {
            firstName: newCommentsData.firstName,
            lastName: newCommentsData.lastName,
            email: newCommentsData.email,
            comment: newCommentsData.comment,
            blogId: newCommentsData.blogId,
            date: newCommentsData.date
        };
        return newComment;
    }));

    res.render('blog', {
        blog,
        comments
    });
});

router.post('/blogs', async (req, res) => {
    const newComment = new Comment({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        comment: req.body.comment,
        blogId: req.body._blogId,
        date: req.body.date
    });

    await blogController.addComment(req.body._blogId, newComment);

    res.redirect(`/blogs/${req.body._blogId}`);
});

router.get('/addBlog', (req, res) => {
    res.render('addBlog', {
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

router.get('/updateBlog/:id', async (req, res) => {
    const blogData = await blogController.getById(req.params.id);
    const blog = {
        _id: req.params.id,
        title: blogData.title,
        description: blogData.description,
        comments: blogData.comments,
        date: blogData.date
    }

    res.render('updateBlog', {
        title: 'Update Blog',
        isUpdate: true,
        blog
    });
});

router.post('/updateBlog', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description
    });

    const updatedBlog = await blogController.update(req.body._id, blog);

    res.redirect(`/blogs/${req.body._id}`);
});

router.get('/deleteBlog/:id', async (req, res) => {
    const deletedBlog = await blogController.delete(req.params.id);
    deletedBlog.comments.map(async comment => {
        await commentController.delete(comment);
    });
    res.redirect('/');
});

export default router;