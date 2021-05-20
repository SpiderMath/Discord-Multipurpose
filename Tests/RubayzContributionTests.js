const hi = require("../Source/Plugins/RubayzContributions");// require the package with its name in the README.md file, not like me.
let config = require("../config.json");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";
const img2 = "https://cdn.discordapp.com/embed/avatars/4.png";
let FirstUser = "Spiderbro";
let lastUser = "DrTime";
let hexCodefirst = "#2856F2";
let hexCodeSecond = "#5A76D6";
let main = "Hi!";
let rep = "Hello!";
hi.reply(img, img2, FirstUser, lastUser, hexCodefirst, hexCodeSecond, main, rep);

hi.rankcard("https://cdn.discordapp.com/embed/avatars/0.png", 375, 500, "online", "#2856F2", "DrTime", "8298"); //if you are using it for discord.js then use some kind of data base like: mongodb, quick.db etc for current xp and required  xp and the other stuffs can be added using basic discord.js.
hi.rip('https://cdn.discordapp.com/embed/avatars/0.png');
hi.trigger('https://cdn.discordapp.com/embed/avatars/0.png');
hi.youtubeComment("DrTime", "hey defective detective, your videos are awesome", 'https://cdn.discordapp.com/embed/avatars/0.png', true);
hi.fakeQuote('https://cdn.discordapp.com/embed/avatars/0.png', 'Bangladesh is the biggest country in the world', 'DrTime', 'RED');
hi.resizeAnImage('https://cdn.discordapp.com/embed/avatars/0.png', 100, 50);