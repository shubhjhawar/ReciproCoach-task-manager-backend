const dateUtils = require("../utils/date");

const isTaskInColumnTimeFrame = (task, column) => {
  const dueDate = new Date(task.fixed_dueDate);
  switch (column.name) {
    case "Today":
      return dateUtils.isToday(dueDate);
    case "Tomorrow":
      return dateUtils.isTomorrow(dueDate);
    case "This Week":
      return dateUtils.isThisWeek(dueDate);
    case "Next Week":
      return dateUtils.isNextWeek(dueDate);
    case "This Month":
      return dateUtils.isThisMonth(dueDate);
    case "Next Month":
      return dateUtils.isNextMonth(dueDate);
    case "This Quarter":
      return dateUtils.isThisQuarter(dueDate);
    case "Next Quarter":
      return dateUtils.isNextQuarter(dueDate);
    case "This Year":
      return dateUtils.isThisYear(dueDate);
    case "Next Year":
      return dateUtils.isNextYear(dueDate);
    default:
      return false;
  }
};

module.exports = {
    isTaskInColumnTimeFrame
};
