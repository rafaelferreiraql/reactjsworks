let React = require('react');
let ReactDOM = require('react-dom');

let classSet = require('classnames');

/*
    Inherited props from App class:
    subject / add / remove / active
 */
module.exports = class Subject extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSubject = this.toggleSubject.bind(this);
    }

    toggleSubject(e) {
        (!this.props.active ? this.props.add() : this.props.remove());
    }

    render() {
        return (
            <div className={classSet("subj",{active: this.props.active})} onClick={this.toggleSubject}>
                <p className="subjName">{this.props.subject.name}</p>
                <p className="subjCreds">Credits: {this.props.subject.credits}</p>
                <p className="subjSched">
                    { Object.keys(this.props.subject.sched).map((day) => {
                        return (
                            <span key={day}>
                                {day} {this.props.subject.sched[day]}
                            </span>
                        )
                    }) }
                </p>
            </div>
        )
    }
}
