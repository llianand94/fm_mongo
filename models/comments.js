const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    taskLink: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Comment = mongoose.model('Comment', commentsSchema);
