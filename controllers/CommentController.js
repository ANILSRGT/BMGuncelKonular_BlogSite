import { create as _create, find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/Comment';

class CommentController {
    async create(comment) {
        const newComment = await _create(comment);
        return newComment;
    }

    async getAll() {
        const comments = await find();
        return comments;
    }

    async getById(id) {
        const comment = await findById(id);
        return comment;
    }

    async update(id, comment) {
        const updatedComment = await findByIdAndUpdate(id, comment, { new: true });
        return updatedComment;
    }

    async delete(id) {
        const deletedComment = await findByIdAndDelete(id);
        return deletedComment;
    }
}

export default CommentController;