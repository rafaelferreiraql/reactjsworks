let React = require('react');
let ReactDOM = require('react-dom');

let helpers = require('../helpers.js');
let parseSchedule = helpers.parseSchedule;
let compareSchedule = helpers.compareSchedule;
let scheduleBuilder = helpers.scheduleBuilder;
let toggleHour = helpers.toggleHour;
let clearHour = helpers.clearHour;
let showConflict = helpers.showConflict;
let conflictWarn = helpers.conflictWarn;

let Stats = require("./stats.jsx");
let Subject = require("./subject.jsx");

/*
    Inherited props from instantiation:
    subjects / minCreds / maxCreds
*/
module.exports = class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedSubjects: (() => {
                let obj = {}
                this.props.subjects.forEach(function(subject) {
                    obj[subject.name] = false;
                })
                return obj;
            })(),
            conflict: "",
        };

        this.credits = 0;
        this.schedule = { // Just making sure every day is already a property here
            mon: {},
            tue: {},
            wed: {},
            thu: {},
            fri: {},
        };

        this.addSubject = this.addSubject.bind(this);
        this.removeSubject = this.removeSubject.bind(this);

    }

    addSubject(subject) {
        // If there's no schedule conflict
        if(compareSchedule(subject.sched,this.schedule)) {
            this.setState(function(prevState) {
                return {
                    selectedSubjects: (() => {
                        prevState.selectedSubjects[subject.name] = true;
                        return prevState.selectedSubjects;
                    })(),
                }
            })
            this.credits = this.credits + subject.credits;
            this.schedule = toggleHour(subject, this.schedule);
        }
        else {
            this.setState({
                conflict: showConflict(subject, this.schedule),
            });
            conflictWarn(document.getElementById("conflict"));
        }
    }

    removeSubject(subject) {
        this.setState(function(prevState) {
            return {
                selectedSubjects: (() => {
                    prevState.selectedSubjects[subject.name] = false;
                    return prevState.selectedSubjects;
                })(),
            }
        });
        this.credits = this.credits - subject.credits;
        this.schedule = clearHour(subject, this.schedule);
    }

    render() {
        return (
            <div>
                <Stats
                    schedule={this.schedule}
                    minCreds={this.props.minCreds}
                    maxCreds={this.props.maxCreds}
                    credits={this.credits}
                    subjects={this.state.selectedSubjects}/>
                <div className="subjects">
                    {this.props.subjects.map((subject,i) => {
                        return (
                            <Subject key={i} subject={subject}
                            add={this.addSubject.bind(null,subject)}
                            remove={this.removeSubject.bind(null,subject)}
                            active={this.state.selectedSubjects[subject.name]} />
                        )
                    })}
                </div>
                <p id="conflict">{this.state.conflict} is already occupying this schedule!</p>
            </div>
        )
    }
}
