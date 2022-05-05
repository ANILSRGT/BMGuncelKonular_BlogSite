const Blog = require('../models/Blog');

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
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true});
        return updatedBlog;
    }

    async delete(id) {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        return deletedBlog;
    }
}

module.exports=BlogController;