const canvacord = require("canvacord");
module.exports = {
  reply: async function (
    img,
    img2,
    userOne,
    userTwo,
    hexOne,
    hexTwo,
    main,
    rep
  ) {
    if (!img) throw new TypeError("No image1 was specified!");
    if (!img2) throw new TypeError("No image2 was specified!");
    if (!userOne) throw new TypeError("No user-1 was specified!");
    if (!userTwo) throw new TypeError("No user-2 was specified!");
    if (!hexOne) throw new TypeError("No hexcode-1 was specified!");
    if (!hexTwo) throw new TypeError("No hexcode-2 was specified!");
    if (!main) throw new TypeError("No main text was specified!");
    if (!rep) throw new TypeError("No reply text was specified!");
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
