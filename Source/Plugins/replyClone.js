const canvacord = require("canvacord");
module.exports = {
  reply: async function (img, img2, userOne, userTwo, hexOne, hexTwo, main, rep) {
    canvacord.Canvas.reply({
      avatar1: img,
      avatar2: img2,
      user1: userOne,
      user2: userTwo,
      hex1: hexOne,
      hex2: hexTwo,
      mainText: main,
      replyText: rep,
    }).then((img) => canvacord.write(img, "reply.png"));
  },
};
