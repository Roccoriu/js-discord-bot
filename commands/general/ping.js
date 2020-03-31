module.exports = {
    name: "ping",
    category: "info",
    descriprion: "returns latency of bot",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 pinging...`);
        msg.edit(`🏓 Pong\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}`);
    }
}