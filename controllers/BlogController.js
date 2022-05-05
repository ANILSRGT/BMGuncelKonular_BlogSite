const { default: mongoose } = require('mongoose');
const Blog = require('../models/Blog');
const CommentController = require('../controllers/CommentController');
const commentController = new CommentController();

class BlogController {
    async create(blog) {
        const newBlog =await Blog.create(blog);
        return newBlog;
    }

    async getAll() {
        const blogs = await Blog.find().lean();
        return blogs;
    }

    async getById(id) {
        const blog = await Blog.findById(id);
        return blog;
    }

    async update(id, blog) {
        const newvalues = { $set: {title: blog.title, description: blog.description , date:Date.now()} };
        const updatedBlog = await Blog.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, newvalues, {new: true});
        return updatedBlog;
    }

    async addComment(id, comment) {
        const newComment = await commentController.create(comment);
        const blog = await Blog.findById(id);
        blog.comments.push(newComment);
        await blog.save();
        return newComment;
    }

    async delete(id) {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        return deletedBlog;
    }
}

module.exports=BlogController;