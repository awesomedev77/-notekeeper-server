const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

//database connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`Todo App Backend is connected with database successfully`);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Todo App is listening on port", port);
});
