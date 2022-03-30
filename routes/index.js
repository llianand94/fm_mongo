const { Router } = require('express');
const { taskController, commentController } = require('../controllers');

const  router  = Router();

router.post('/', taskController.postMethod);
router.get('/', taskController.getMethod);
router.patch('/:taskId', taskController.updateMehtod);
router.delete('/:taskId', taskController.deleteTask);

router.post('/:taskId/comments/', commentController.postComment);
router.get('/comments/', commentController.getAllComments);

module.exports = router;