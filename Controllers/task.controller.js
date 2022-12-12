const {
  getTaskInfo,
  postTaskInfo,
  pinTaskInfo,
  completeTaskInfo,
  deleteTaskInfo,
  updateTaskInfo,
} = require("../Services/task.service");

exports.getTask = async (req, res, next) => {
  try {
    const pageCount = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    let queryObjectFilter = { ...req.query };
    const excludeField = ["sort", "page", "limit"];
    excludeField.forEach((field) => delete queryObjectFilter[field]);

    let result;
    let queries = {};
    const { limit = size } = req.query;
    if (pageCount > 0) {
      const skip = (pageCount - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
      result = await getTaskInfo(queryObjectFilter, queries);
    } else {
      queries.limit = parseInt(limit);
      result = await getTaskInfo(queryObjectFilter, queries);
    }

    res.status(200).json({
      status: "success",
      message: "task get successfully",
      // count: count,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get Task an error occurred",
      error: error.message,
    });
  }
};
exports.postTask = async (req, res, next) => {
  try {
    const result = await postTaskInfo(req.body);

    res.status(200).json({
      status: "success",
      message: "task post successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't post Task an error occurred",
      error: error.message,
    });
  }
};
exports.updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await updateTaskInfo(req.body, id);

    res.status(200).json({
      status: "success",
      message: "task updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't updated Task an error occurred",
      error: error.message,
    });
  }
};
exports.pinTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pin = { pin: true };
    const result = await pinTaskInfo(pin, id);

    res.status(200).json({
      status: "success",
      message: "task pinned successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't pinned Task an error occurred",
      error: error.message,
    });
  }
};
exports.unPinTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const unpin = { pin: false };
    const result = await pinTaskInfo(unpin, id);

    res.status(200).json({
      status: "success",
      message: "task Un pinned successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't Un pinned Task an error occurred",
      error: error.message,
    });
  }
};
exports.completeTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const unpin = { complete: true, pin: false };
    const result = await completeTaskInfo(unpin, id);

    res.status(200).json({
      status: "success",
      message: "task completed successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't completed Task an error occurred",
      error: error.message,
    });
  }
};
exports.deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteTaskInfo(id);

    res.status(200).json({
      status: "success",
      message: "task deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't deleted Task an error occurred",
      error: error.message,
    });
  }
};
