import { default as mongoose } from 'mongoose';
import { create as _create, find, findById, findOneAndUpdate, findByIdAndDelete } from '../models/Blog';
import CommentController from '../controllers/CommentController';
const commentController = new CommentController();

class BlogController {
    async create(blog) {
        const newBlog = await _create(blog);
        return newBlog;
    }

    async getAll() {
        const blogs = await find().lean();
        return blogs;
    }

    async getById(id) {
        const blog = await findById(id);
        return blog;
    }

    async update(id, blog) {
        const newvalues = { $set: { title: blog.title, description: blog.description, date: Date.now() } };
        const updatedBlog = await findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, newvalues, { new: true });
        return updatedBlog;
    }

    async addComment(id, comment) {
        const newComment = await commentController.create(comment);
        const blog = await findById(id);
        blog.comments.push(newComment);
        await blog.save();
        return newComment;
    }

    async delete(id) {
        const deletedBlog = await findByIdAndDelete(id);
        return deletedBlog;
    }
}

export default BlogController;