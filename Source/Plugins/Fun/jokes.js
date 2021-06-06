let json = require("../../../Assets/JSON/jokesforfun.json");
module.exports = {
    randomJoke: function() {
        const allJokes = json.jokes;
        const randomJokes = allJokes[Math.floor(Math.random() * allJokes.length)];
        return `${randomJokes.setup} \n ${randomJokes.punchline}`;
    },
    jokeType: function(type, number) {
        const typesJokesAll = json.jokes;
        // const randomTypesJokes = typesJokesAll[Math.floor(Math.random() * typesJokesAll.length)];
        const noOfJokes = json.jokes.filter(jokes => jokes.type == type).slice(0, number);
        return noOfJokes;
    },
    getJokeById: function(id) {
        const jokeId = json.jokes;
        // const randomJokeId = jokeId[Math.floor(Math.random() * jokeId.length)];
        const noOfIdJoke = json.jokes.filter(jokes => jokes.id == id);
        return noOfIdJoke;
    }
} 
