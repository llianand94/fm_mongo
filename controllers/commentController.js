const Comment = require('../models/comments');

module.exports.postComment = async (req, res, next) => {
  try {
    const {
      body,
      params: { taskId },
    } = req;
    const newComment = await Comment.create({ ...body, taskLink: taskId });
    res.status(200).send(newComment);
  } catch (error) {
    next(error);
  }
};
module.exports.getAllComments = async (req, res, next) => {
  try {
    Comment.find()
      .populate('taskLink')
      .exec((error, comments) => {
        if (error) {
          throw error;
        }
        res.send(comments);
      });
  } catch (error) {
    next(error);
  }
};