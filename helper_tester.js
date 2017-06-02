let helper = require("./script/helpers.js");

console.log("false?",helper.compareSchedule(
    { "wed":"8-10", "fri":"8-10" },
    { "fri": { _10: true } }
)); // Precisa retornar false pois 8h ta na schedule ja

console.log("true?",helper.compareSchedule(
    { "wed":"8-10" },
    { "wed": { _13: true } }
)); // Precisa retornar true pois não há conflito!

console.log("true?",helper.compareSchedule(
    { "wed":"8-10" },
    { "wed": { _8: false } }
)); // Retornar true pois não há conflito também!

console.log("false?",helper.compareSchedule(
    { "wed":"8-10" },
    { "wed": { _8: false, _9: true } }
)); // Retorna false
