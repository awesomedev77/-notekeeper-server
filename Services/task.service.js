const taskInfoSchema = require("../Models/taskInfoSchema");
exports.getTaskInfo = async (data) => {
  const result = await taskInfoSchema.create(data);
  return result;
};
