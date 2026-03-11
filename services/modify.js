const Saved = require('../models/Upload')

module.exports = {
    deletePostById: async (postId) => {

        return await Saved.findByIdAndDelete(postId)
    }
}