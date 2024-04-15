const { Router } = require("express");
const taskController = require("../../controller/tasks");

const router = Router();

router.route("/complete").get(taskController.getCompleteTasks);

router.route("/").post(taskController.createTask).get(taskController.getTasks);

router
  .route("/:id")
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

router.route("/drag/task").put(taskController.updateTaskIndices);

router.route("/drag/:id").put(taskController.updateColumnIdInTasks);

module.exports = router;
