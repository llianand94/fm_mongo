const Task = require ('../models/task');


module.exports.getMethod = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    next(error);
  }
};
module.exports.postMethod = async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await Task.create(body);
    res.status(201).send(newTask);
  } catch (error) {
    next(error);
  }
};
module.exports.updateMehtod = async (req, res, next) => {
  try {
    const {
      body,
      params: { taskId },
    } = req;
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, body, {
      returnDocument: 'after',
    });
    res.status(200).send(updatedTask);
  } catch (error) {
    next(error);
  }
};
module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;
    const deleteTask = await Task.findByIdAndRemove(taskId);
    if (deleteTask) {
      res.status(200).send(deleteTask);
    }
    res.status(404).send();
  } catch (error) {
    next(error);
  }
};