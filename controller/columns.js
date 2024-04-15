const httpStatus = require("http-status");
const Column = require("../models/columns");
const Task = require("../models/tasks");

const createColumn = async (req, res) => {
  try {
    const { name, inbuilt } = req.body;

    const newColumn = await Column.create(req.body);
    return res
      .status(httpStatus.OK)
      .json({ createdColumn: newColumn, msg: "Column has been created!" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const getColumns = async (req, res) => {
  try {
    const columns = await Column.find({}).sort({ heading: "asc" }).lean(true);
    for(let value of columns) {
      value.tasks = await Task.find({ columnId: value._id, complete: false }).lean(true).sort({ index: 1 });
    }
    return res
      .status(httpStatus.OK)
      .json({ columns, msg: "All columns have been fetched!" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const getColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await Column.findById({ _id: id });

    if (!column) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Column not found" });
    }

    return res.status(httpStatus.OK).json({ column, msg: "Success" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const updateColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedColumn = await Column.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedColumn) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Column not found" });
    }

    return res
      .status(httpStatus.OK)
      .json({ column: updatedColumn, msg: "Column has been updated" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedColumn = await Column.findByIdAndDelete({ _id: id });

    if (!deletedColumn) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Column not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ column: deletedColumn, msg: "Column has been deleted" });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err, msg: "Something went wrong!" });
  }
};

module.exports = {
    createColumn,
    getColumns,
    getColumn,
    updateColumn,
    deleteColumn,
}