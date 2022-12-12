const taskInfoSchema = require("../Models/taskInfoSchema");
const ObjectId = require("mongodb").ObjectId;
exports.getTaskInfo = async (queryObjectFilter, queries) => {
  console.log(queryObjectFilter, queries);
  const result = await taskInfoSchema
    .find({})
    .skip(queries.skip)
    .limit(queries.limit)
    .sort({ $natural: -1 });

  const totalTask = await taskInfoSchema.countDocuments();
  const pageCount = Math.ceil(totalTask / queries.limit);
  return { totalTask, pageCount, result };
};
exports.postTaskInfo = async (data) => {
  const result = await taskInfoSchema.create(data);
  return result;
};
exports.updateTaskInfo = async (data, id) => {
  const query = { _id: ObjectId(id) };
  const result = await taskInfoSchema.updateMany(query, data);
  return result;
};
exports.pinTaskInfo = async (data, id) => {
  const query = { _id: ObjectId(id) };
  const result = await taskInfoSchema.updateOne(query, data);
  return result;
};
exports.completeTaskInfo = async (data, id) => {
  const query = { _id: ObjectId(id) };
  const result = await taskInfoSchema.updateOne(query, data);
  return result;
};
exports.deleteTaskInfo = async (id) => {
  const query = { _id: ObjectId(id) };
  const result = await taskInfoSchema.deleteOne(query);
  return result;
};
