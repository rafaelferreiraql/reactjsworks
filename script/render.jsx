let React = require('react');
let ReactDOM = require('react-dom');

let subjectList = require('./subjects.json');

let App = require('./components/wrapper.jsx');

ReactDOM.render(
    <App subjects={subjectList} minCreds={16} maxCreds={32}/>,
    document.getElementById("reaction")
);
