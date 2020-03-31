const {getMember, formatDate} = require("../../functions.js");
const { MessageEmbed} = require("discord.js");
const {stripIndent} = require("common-tags");


module.exports = {
    name: "info",
    aliases: ["userinfo", "user"],
    category: "info",
    descriprion: "returns latency of bot",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(""));

        const joined = formatDate(member.joinedAt);
        const role = member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || "none";

        const created = formatDate(member.user.createdAt);
        let img = member.user.displayAvatarURL();
        
        const embed = new MessageEmbed()
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .setTitle(member.displayName)
            .setThumbnail(img)
            .addFields(
                {name: "Member Information", value: stripIndent`**> Display name: ${member.displayName}**
                                                                **> Joined at: ${joined}**
                                                                **> Roles: ${role}**`, inline: true},

                {name: "User Information", value: stripIndent`**> ID: ${member.user.id}**
                                                              **> Discord Tag: ${member.user.tag}**
                                                              **> Created: ${created}**`, inline: true},
            )
            .setFooter(member.displayName, img)
            .setTimestamp()

        message.channel.send(embed).then(message.delete());
    }
}