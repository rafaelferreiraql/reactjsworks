let React = require('react');
let ReactDOM = require('react-dom');
let classSet = require('classnames');

let helpers = require('../helpers.js');
let statusCompare = helpers.statusCompare;

/*
    Inherited props from App class:
    schedule / minCreds / maxCreds / credits / subjects
*/
module.exports = class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.creditStatus = this.creditStatus.bind(this);
    }

    creditStatus() {
        return statusCompare(
            this.props.minCreds,
            this.props.maxCreds,
            this.props.credits
        )
    }

    render() {
        return (
            <div className="stats">
                <div className="schedule">
                    <table>
                        <thead>
                            <tr>
                                <th className="day"></th>
                                <th>8h</th>
                                <th></th>
                                <th>10h</th>
                                <th></th>
                                <th>12h</th>
                                <th>13h</th>
                                <th></th>
                                <th>15h</th>
                                <th></th>
                                <th>17h</th>
                                <th></th>
                                <th>19h</th>
                            </tr>
                        </thead>
                        <tbody>
                            {["mon","tue","wed","thu","fri"].map((day,i) => {
                                let days = [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday"
                                ];
                                return <tr key={i}>
                                    <td className={day}>{days[i]}</td>
                                    {[8,9,10,11,12,13,14,15,16,17,18,19].map((h,i) => {
                                        let marked = this.props.schedule[day][h];
                                        return <td className={classSet({marked: marked})} key={h}></td>
                                    })}
                                </tr>
                            })}

                        </tbody>

                    </table>
                </div>
                <div className="credits">
                    <span className="minimum">{this.props.minCreds}</span>
                    <span className={classSet("userCredits", this.creditStatus())}>{this.props.credits}</span>
                    <span className="maximum">{this.props.maxCreds}</span>
                </div>
                <div className="label">
                    <span className="minimum">minimum credits</span>
                    <span className={classSet("userCredits", this.creditStatus())}>credits</span>
                    <span className="maximum">maximum credits</span>
                </div>
            </div>
        )
    }
}
