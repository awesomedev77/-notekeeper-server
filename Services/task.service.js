const taskInfoSchema = require("../Models/taskInfoSchema");
exports.getTaskInfo = async (queryObjectFilter, queries) => {
  /*  const result = await taskInfoSchema.find().skip().sort({ $natural: -1 });
  // let task;
  const countRes = await taskInfoSchema.find().sort({ $natural: -1 }).count();
  console.log(countRes, page, size);
  return result; */
  const result = await taskInfoSchema
    .find({ queryObjectFilter })
    .select(queries.fields)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort({ $natural: -1 });
  console.log(queries.sortBy);

  const totalTask = await taskInfoSchema.countDocuments();
  const pageCount = Math.ceil(totalTask / queries.limit);
  return { totalTask, pageCount, result };
};
exports.postTaskInfo = async (data) => {
  const result = await taskInfoSchema.create(data);
  return result;
};

/* 
task> get,post,
task/update/:id > put
pin/task/:id > put
unpin/task/:id > put
complete/task/:id > put
task/:id > delete
*/
