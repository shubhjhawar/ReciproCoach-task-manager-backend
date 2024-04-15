exports.isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};

exports.isTomorrow = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.getDate() === tomorrow.getDate() &&
           date.getMonth() === tomorrow.getMonth() &&
           date.getFullYear() === tomorrow.getFullYear();
};

exports.isThisWeek = (date) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
    return date >= startOfWeek && date <= endOfWeek;
};

exports.isNextWeek = (date) => {
    const today = new Date();
    const startOfNextWeek = new Date(today);
    startOfNextWeek.setDate(startOfNextWeek.getDate() - startOfNextWeek.getDay() + 7);
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(endOfNextWeek.getDate() + 6);
    return date >= startOfNextWeek && date <= endOfNextWeek;
};

exports.isThisMonth = (date) => {
    const today = new Date();
    return date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
};

exports.isNextMonth = (date) => {
    const today = new Date();
    const nextMonth = (today.getMonth() + 1) % 12;
    const nextYear = today.getFullYear() + (nextMonth === 0 ? 1 : 0);
    return date.getMonth() === nextMonth && date.getFullYear() === nextYear;
};

exports.isThisQuarter = (date) => {
    const today = new Date();
    const currentQuarter = Math.floor(today.getMonth() / 3);
    return Math.floor(date.getMonth() / 3) === currentQuarter &&
           date.getFullYear() === today.getFullYear();
};

exports.isNextQuarter = (date) => {
    const today = new Date();
    const currentQuarter = Math.floor(today.getMonth() / 3);
    const nextQuarter = (currentQuarter + 1) % 4;
    const nextYear = today.getFullYear() + (nextQuarter === 0 ? 1 : 0);
    return Math.floor(date.getMonth() / 3) === nextQuarter && date.getFullYear() === nextYear;
};

exports.isThisYear = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear();
};

exports.isNextYear = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() + 1;
};
