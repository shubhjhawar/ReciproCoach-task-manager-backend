const Task = require("../models/tasks");
const Column = require("../models/columns");
const { isTaskInColumnTimeFrame } = require("../services/common");

const updateColumnsInTasks = async () => {
    try {
        const tasks = await Task.find({ complete: false });
        if(tasks.length === 0) return;
        const boards = await Column.find().lean(true);
        tasks.forEach(async (task) => {
            const dueDate = task.fixed_dueDate;
            const currentDate = Date.now();
            if(dueDate < currentDate) {
                task.taskExpired = true;
            } else {
                task.repeat = true;
                if (!dueDate) return; // Skip tasks with no due date
                for (const column of boards) {
                    if (isTaskInColumnTimeFrame(task, column)) {
                        task.columnId = column._id;
                        await task.save();
                        break;
                    }
                }
            } 
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    updateColumnsInTasks
}