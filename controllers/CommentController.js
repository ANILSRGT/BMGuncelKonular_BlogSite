const Comment = require('../models/Comment');

class CommentController {
    async create(comment) {
        const newComment =await Comment.create(comment);
        return newComment;
    }

    async getAll() {
        const comments = await Comment.find();
        return comments;
    }

    async getById(id) {
        const comment = await Comment.findById(id);
        return comment;
    }

    async update(id, comment) {
        const updatedComment = await Comment.findByIdAndUpdate(id, comment, {new: true});
        return updatedComment;
    }

    async delete(id) {
        const deletedComment = await Comment.findByIdAndDelete(id);
        return deletedComment;
    }
}

module.exports=CommentController;