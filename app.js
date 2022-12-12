const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

// route
const taskRoute = require("./Routes/task.route");

app.use("/api/task", taskRoute);

app.get("/", (req, res) => {
  res.send(`
    <h1> Todo App server is running </h1>
    `);
});

module.exports = app;
