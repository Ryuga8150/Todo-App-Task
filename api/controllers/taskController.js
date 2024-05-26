const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");

let tasks = [];

exports.getTasks = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
};

exports.getTask = async (req, res) => {
  const taskId = req.params.id;

  const task = tasks.filter((task) => task.id === taskId);
  if (!task.length) throw new Error("No such Tasks exists");

  res.status(200).json({
    status: "success",
    data: {
      task: task[0],
    },
  });
};

exports.createTask = catchAsync(async (req, res) => {
  const taskId = crypto.randomBytes(6).toString("hex").substring(0, 6);
  const task = { id: taskId, ...req.body };

  tasks.push(task);

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.updateTask = catchAsync(async (req, res) => {
  const taskId = req.params.id;

  tasks = tasks.filter((task) => task.id !== taskId);

  tasks.push({ id: taskId, ...req.body });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteTask = catchAsync(async (req, res) => {
  const taskId = req.params.id;

  tasks = tasks.filter((task) => task.id !== taskId);

  res.status(200).json({
    status: "success",
  });
});
