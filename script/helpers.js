// Changes depending on how many credits you have.
// Returns a class name to be used on the Stats component.
function statusCompare(min, max, status) {
    if(status > max) return "maxcolor";
    else if(status < min) return "mincolor";
    else return null;
};

// Converts something like { "wed": "8-10", "fri": "13-17" } to
//                         { "wed": [8,9], "fri": [13,14,15,16] }
function parseSchedule(clss) {
    let obj = {};
    Object.keys(clss).forEach(function(day) {
        obj[day] = [];
        let limits = clss[day].split("-");
        let length = parseInt(limits[1]) - parseInt(limits[0]);
        for(let i = parseInt(limits[0]); i < parseInt(limits[1]); i++) {
            obj[day].push(i);
        }
    })

    return obj;
};

function scheduleBuilder(clss) {
    const prsclass = parseSchedule(clss);
    let obj = {};
    Object.keys(prsclass).forEach(function(day) {
        obj[day] = {};
        prsclass[day].forEach(function(hour) {
            obj[day][hour] = true;
        })
    })
    return obj;
}

// returns true if there's no schedule conflict
function compareSchedule(clss, schedule) {
    // prsClass is the class (subject) I chose, already parsed by parseSchedule
    const prsclass = parseSchedule(clss);

    // I want to compare prsclass to my current schedule
    // prsclass is in the form { day1: ["_h1", "_h2", _h3], day2: ["_h4","_h5"] }
    // schedule is in the form { day1: { _h1: true, _h3: false }, day2: { _h4: false } }

    // For every day this class happens
    return Object.keys(prsclass).every(function(day) {
        // For every hour this class takes in this day
        return prsclass[day].every(function(hour) {
            // If there's already something this day,
            // although the state is making sure every weekday has an object,
            // so this is more for clarity than anything
            if(schedule.hasOwnProperty(day)) {
                // If this particular hour is marked (as true or false)
                if(schedule[day].hasOwnProperty(hour)) {
                    // If 'true', means the hour is already taken!
                    // If 'false', returns true cause the hour is open
                    return (!schedule[day][hour])
                }
                // If the hour isn't marked (therefore it's free)
                return true;
            }
            // If the day isn't marked (therefore it's free)
            return true;
        })
    })
}

// Returns an updated version of 'schedule' filled with hours taken by 'clss'
function toggleHour(subject, schedule) {
    const name = subject.name;
    // Parse string format in data to the form
    const prsclass = parseSchedule(subject.sched);
    // For every period the class takes
    Object.keys(prsclass).forEach(function(day) {
        // For every hour the class takes
        prsclass[day].forEach(function(hour) {

            schedule[day][hour] = subject.name;
        })
    })

    return schedule;
}

function clearHour(subject, schedule) {
    const name = subject.name;
    const prsclass = parseSchedule(subject.sched);
    // For every period the class takes
    Object.keys(prsclass).forEach(function(day) {
        // For every hour the class takes
        prsclass[day].forEach(function(hour) {
            schedule[day][hour] = false;
        })
    })
    return schedule;
}

function showConflict(subject, schedule) {
    const prsclass = parseSchedule(subject.sched);
    let conflict;
    // For every period the class takes
    Object.keys(prsclass).some(function(day) {
        // For every hour the class takes
        prsclass[day].some(function(hour) {
            if(schedule[day][hour]) {
                conflict = schedule[day][hour];
                return conflict;
            }
        })
    })
    return conflict;
}

function conflictWarn(node) {
    node.style.opacity = 1;
    setTimeout(function() {
        node.style.opacity = 0;
    },2000)
}

module.exports.statusCompare = statusCompare;
module.exports.parseSchedule = parseSchedule;
module.exports.compareSchedule = compareSchedule;
module.exports.scheduleBuilder = scheduleBuilder;
module.exports.toggleHour = toggleHour;
module.exports.clearHour = clearHour;
module.exports.showConflict = showConflict;
module.exports.conflictWarn = conflictWarn;
