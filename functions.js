const {randomPuppy} = require("random-puppy");
const {MessageEmbed} = require("discord.js");

module.exports = {
    getMember: (message, toFind = '') => {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);

        if(!target && message.mentions.members) target = message.mentions.members.first();

        if(!target && toFind){
            target = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(toFind)||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }

        if(!target) target = message.member;

        return target;
    },

    formatDate: date => {
        return new Intl.DateTimeFormat('de-DE', {day: 'numeric', month: 'long', year: 'numeric'}).format(date);
    },


    checkMemberRule: roles => {
        roles.sort();
        return roles[0] == roles[roles.lenght -1]; 
    },


    printRules: channel => {
        channel.send("General\n" + 
                     "The following rules apply on all of the RDS community Servers. The rules specified may be subject to change at any time." + 
                     "If you fail to comply with the stated rules, admins, mods and bots may demote or kick you. Repeated misbehaviour will result" +
                     "in a permanent ban from the community\n\n\n" + 
                     "Rules\n" +
                     "•    Please use the proper channels for the posts you want to share i.e. images in to the memes and pics channel ect...\n" + 
                     "•    Please be nice to eachother.\n" + 
                     "•    Respect the decisions made by admins or mods, they recieved the roles for a reason.\n" +
                     "•    NSW Content wiill result in a kick or permanent ban.\n" +
                     "•    Don't ask about becoming an admin, only trusted member will obtain this role.\n" + 
                     "•    The moderator role is obtained by leveling up and is limited to longtime members of the server.\n" + 
                     "•    Spam will result in a cooldown for your messages or temporary demote to no role.\n" +
                     "•    Mention people only when it makes sense, don't over do it.\n" +
                     "•    Unless specifically permitted, advertising will result in a kick the first time and in a ban the second time.\n" +
                     "•    Any one is allowed to advertise community related projects ect.\n" +
                     "•    Once the website is online, the above stated rules apply\n\n\n" +
                     "Leveling\n" +
                     "•    As of yet, the leveling system has not been implemented, any features related to the leveling system are in development.\n" +
                     "•    If you get upvotes you get xp.\n" +
                     "•    Once you gathered enough XP you'll level up and unlock further features in the community.\n\n\n" +
                     "How do I become a registered member?\n" +
                     "•    Click the green checkmark on the comment below, to register your user and accept the rules and guidelines.\n" +
                     "•    That's it you are now free to roam the lands of the community.\n\n"+
                     "Have fun exploring the server and other parts of the community.\n\n");

    }
}