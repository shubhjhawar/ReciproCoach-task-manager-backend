const httpStatus = require("http-status");
const Task = require("../models/tasks");
const Column = require("../models/columns");
const { isTaskInColumnTimeFrame } = require("../services/common");

const createTask = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const boards = await Column.find().lean(true);
      const prevTask = await Task.findOne({ columnId: req.body.columnId, complete: false }).sort({ index: -1 }).select("_id index");
      let index = prevTask? prevTask.index: 0;
      req.body.forEach((task) => {
        const dueDate = task.fixed_dueDate;
        task.repeat = true;
        task.index = index+1;
        if (!dueDate) return; // Skip tasks with no due date
        for (const column of boards) {
          if (isTaskInColumnTimeFrame(task, column)) {
            task.columnId = column._id;
            index++;
            break;
          }
        }
      });
    } else {
      const prevTask = await Task.findOne({ columnId: req.body.columnId, complete: false }).sort({ index: -1 }).select("_id index");
      req.body.index = prevTask? prevTask.index + 1: 0;
    }
    const newTask = await Task.create(req.body);
    return res
      .status(httpStatus.OK)
      .json({ createdTask: newTask, msg: "Task has been created!" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ heading: "asc" });

    return res
      .status(httpStatus.OK)
      .json({ tasks, msg: "All tasks have been fetched!" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const getCompleteTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ complete: true }).sort({ heading: "asc" });

    return res
      .status(httpStatus.OK)
      .json({ tasks, msg: "All tasks have been fetched!" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById({ _id: id });

    if (!task) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Task not found" });
    }

    return res.status(httpStatus.OK).json({ task, msg: "Success" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Task not found" });
    }

    return res
      .status(httpStatus.OK)
      .json({ task: updatedTask, msg: "Task has been updated" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete({ _id: id });

    if (!deletedTask) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Task not found" });
    }

    return res
      .status(httpStatus.OK)
      .json({ task: deletedTask, msg: "Task has been deleted" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const updateColumnIdInTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const { previousColumnName, newColumnName } = req.body;
    const prevColumnId = (await Column.findOne({ name: previousColumnName }).lean(true).select('_id'))._id;
    if(!prevColumnId) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Invalid Previous columnId" });
    }
    const newColumnId = (await Column.findOne({ name: newColumnName }).lean(true).select('_id'))._id;
    if(!newColumnId) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Invalid New columnId" });
    }

    const prevTask = await Task.findOne({ columnId: newColumnId, complete: false }).sort({ index: -1 }).select("_id index");
    const updatedTask = await Task.findByIdAndUpdate({ _id: id }, { columnId: newColumnId, index: prevTask? prevTask.index + 1: 0 }, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Task not found" });
    }

    return res
      .status(httpStatus.OK)
      .json({ task: updatedTask, msg: "Task has been updated" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const updateTaskIndices = async (req, res) => {
  try {
    const { columnName, dataIds } = req.body;
    const columnId = (await Column.findOne({ name: columnName }).lean(true).select('_id'))._id;
    if(!columnId) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Invalid columnId" });
    }

    dataIds.forEach(async (id, index) => {
      await Task.findByIdAndUpdate({ _id: id }, { index: index }, { new: true });
    })

    return res
      .status(httpStatus.OK)
      .json({ task: {}, msg: "Task has been updated" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getCompleteTasks,
  getTask,
  updateTask,
  deleteTask,
  updateColumnIdInTasks,
  updateTaskIndices
};
