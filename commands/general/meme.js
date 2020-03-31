const {MessageEmbed} = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
    name: "meme",
    category: "fun",
    descriprion: "returns latency of bot",
    run: async (client, message, args) => {
        const subReddits = ["dankmeme", "PrequelMemes", "meme", "CrappyDesign", "ProgrammerHumor"];
        let random = subReddits[Math.floor(Math.random() * subReddits.length)];
        
        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
        
        message.channel.send(embed);
    }
}