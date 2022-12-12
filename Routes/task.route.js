const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/task.controller");

//get all task
router.route("/").get(taskController.getTask).post(taskController.postTask);

//updte task
// router.route("/update/:id").put(taskController.updateTask);

//pin task
router.route("/pin/:id").put(taskController.pinTask);

//unpin task
router.route("/unpin/:id").put(taskController.unPinTask);

/*//complete task
router.route("/complete/:id").put(taskController.completeTask);

//delete task
router.route("/:id").delete(taskController.deleteTask); */

module.exports = router;
