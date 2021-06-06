const jokes = require("../Source/Plugins/jokes");
console.log(jokes.randomJoke());
console.log(jokes.jokeType('general', 3));
console.log(jokes.getJokeById(1))