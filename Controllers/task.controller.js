const { getTaskInfo } = require("../Services/task.service");

exports.getTask = async (req, res, next) => {
  try {
    const result = await getTaskInfo(req.body);

    res.status(200).json({
      status: "success",
      message: "task get successfully",
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
