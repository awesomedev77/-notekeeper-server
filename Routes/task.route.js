const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/task.controller");

//get all task
router.route("/").get(taskController.getTask);

//updte task .post(taskController.postTask)
/* router.route("/update/:id").put(taskController.updateTask);

//pin task
router.route("/pin/:id").put(taskController.pinTask);

//unpin task
router.route("/unpin/:id").put(taskController.unpinTask);

//complete task
router.route("/complete/:id").put(taskController.completeTask);

//delete task
router.route("/:id").delete(taskController.deleteTask); */

module.exports = router;
