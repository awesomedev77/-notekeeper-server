const {
  getTaskInfo,
  postTaskInfo,
  pinTaskInfo,
} = require("../Services/task.service");

exports.getTask = async (req, res, next) => {
  try {
    const pageCount = req.query.page;
    const size = parseInt(req.query.size);

    let queryObjectFilter = { ...req.query };
    const excludeField = ["sort", "page", "limit"];
    excludeField.forEach((field) => delete queryObjectFilter[field]);

    let queries = {};
    if (req.query.page) {
      const { page = pageCount || 1, limit = size || 6 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const result = await getTaskInfo(queryObjectFilter, queries);
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
