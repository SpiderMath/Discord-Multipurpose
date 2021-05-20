const canvacord = require("canvacord");
const { color } = require("canvacord/src/Canvacord");
let fetch = require("node-fetch");
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
  rankcard: async function (
    img,
    currentXp,
    requiredXP,
    status,
    hexColor,
    username,
    discriminator
  ) {
    if (!img) throw new TypeError("No image was specified!");
    if (!currentXp) throw new TypeError("No current xp was specified!");
    if (!requiredXP) throw new TypeError("No required xp was specified!");
    if (!status) throw new TypeError("No status was specified!");
    if (!hexColor)
      throw new TypeError("No html hex code of color was specified!");
    if (!username) throw new TypeError("No username was specified!");
    if (!discriminator) throw new TypeError("No discriminator was specified!");
    const rank = new canvacord.Rank()
      .setAvatar(img)
      .setCurrentXP(currentXp)
      .setRequiredXP(requiredXP)
      .setStatus(status)
      .setProgressBar(hexColor, "COLOR")
      .setUsername(username)
      .setDiscriminator(discriminator);

    rank.build().then((buffer) => {
      canvacord.write(buffer, "RankCard.png");
    });
  },
  rip: function(image) {
    canvacord.Canvas.rip(image)
    .then(buffer => {
      canvacord.write(buffer, './rip.png');
    })
    .catch(console.error);
  },
  trigger: function(image) {
    canvacord.Canvas.trigger(image)
    .then(buffer => {
      canvacord.write(buffer, './triggered.gif');
    })
    .catch(console.error);
  },
  youtubeComment: function(name, content, avatar, isDarkMode) {
    canvacord.Canvas.youtube({
      username: name,
      content: content,
      avatar: avatar,
      dark: isDarkMode
    }).then((img) => canvacord.write(img, 'youtube.png'));    
  },
  fakeQuote: function(image, message, name, color) {
    canvacord.Canvas.quote({
      image: image,
      message: message, 
      username: name,
      color: color
    }).then((img) => canvacord.write(img, 'fakequote.png'));
  },
  resizeAnImage: function(image, width, height) {
    canvacord.Canvas.resize(image, width, height)
    .then(buffer => {
      canvacord.write(buffer, './resizedImage.png');
    })
    .catch(console.error);
  }
};
