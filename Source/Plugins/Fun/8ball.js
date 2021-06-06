// const fs = require('fs');
let json = require("../../../Assets/JSON/8ballResponses.json")
module.exports = function EightBall(question) {
    const answers = json.responses;
    const randomIndex = answers[Math.floor(Math.random() * answers.length)];
    return `Queston:- ${question} Answer:-${randomIndex}`
}