const { Client, Collection, MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const {stripIndent} = require("common-tags");
const {printRules, checkMemberRule} = require("./functions.js")

const randomPuppy = require('random-puppy');

const client = new Client({
});


client.commands = new Collection();
client.aliases = new Collection();


config({
    path: __dirname + "/.env"
});



["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})



client.on("ready", () => {
    console.log("Online");
    client.user.setPresence({ activity: { name: 'exp.run' }, status: 'online' }); 

});



client.on("channelCreate", channel => {
    if(channel.name && channel.name.includes("rules")) {
        const img = client.server_icon;
        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("By clicking the green checkmark you accept the rules and conditions that apply on this server")
            .setThumbnail(img)
            .setFooter(img)
            .setTimestamp()
        
        printRules(channel);

        channel.send(embed).then(message => {
            message.react("✅")
            message.pin()
        }).catch(() => console.log("somethings went wrong"));
    }
});



client.on("raw", event =>{
    if(event.t === "MESSAGE_REACTION_ADD" && event.d.message_id === "694266650454917233"){
        const memberRole = "408999254552608768";

        const guild = client.guilds.cache.get(event.d.guild_id);
        
        const member = event.d.user_id;
        const roles = event.d.member.roles;

        const hasRole = roles.includes(memberRole);
        
        const guildMember = guild.members.cache.get(member)

        if(!hasRole && checkMemberRule(roles)){
            guildMember.roles.add(memberRole).then(res => guildMember.send(`Welcome to RDS <@${event.d.member.user.id}>. If you need help, you can use the !help command.`));
        }

    }
}); 



client.on("message", async message => {
    const prefix = "!";

    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if(!cmd) return;
    
    let command = client.commands.get(cmd);

    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command) command.run(client, message, args);
});




async function sendMemesAuto(){
    const subReddits = ["dankmeme", "PrequelMemes", "meme", "CrappyDesign", "ProgrammerHumor"];
    let random = subReddits[Math.floor(Math.random() * subReddits.length)];
    
    const img = await randomPuppy(random).then();
    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle("From r/" + random)
        .setURL("https://reddit.com/r/" + random)
    
        client.guilds.cache.get("408995795413762048").channels.cache.get("694287054980251778").send(embed);
}



let inter = setInterval(() =>{
    sendMemesAuto();
}, 900000);



client.login(process.env.TOKEN)