const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const Utils = require("./utils.js");
const utils = new Utils(this, client, config);
const DBConnection = require("./dbConnection.js");
const dbConnection = new DBConnection(config.connection);

module.exports.client = client;
module.exports.utils = utils;
module.exports.dbConnection = dbConnection;

let defaultResponder = require("./onMessageListeners/confused.js");

let onMesageListeners = [
    require("./onMessageListeners/say.js"),
    require("./onMessageListeners/help.js"),
    require("./onMessageListeners/games.js"),
    require("./onMessageListeners/gifme.js"),
    require("./onMessageListeners/insults.js"),
    require("./onMessageListeners/compliments.js"),
];

let onPresenceUpdateListeners = [
    require("./presenceUpdate/partyBroadcaster.js"),
];

let onReady = function () {
    console.log(config.bot.name + " Online!");
}

let botRegex = new RegExp(config.bot.regexp, "i");

let notifyOnMessageListeners = function(message) {

    if (!botRegex.test(message.content) || message.author.bot) return;

    utils.removeBotName(message.content);
    utils.resolveToMentions(message);

    let responded = false;
    onMesageListeners.forEach(listener => { 
        if (listener.sendMessage(message)) {
            responded = true; 
        }
    });

    if (!responded){
        defaultResponder.sendMessage(message);
    } 
}

let notifyOnPressenceUpdateLisenters = function(oldGuildMember, newGuildMember) {
    onPresenceUpdateListeners.forEach(listener => { listener.sendMessage(oldGuildMember, newGuildMember); });
}

client.on("ready", () => { onReady(); });
client.on("message", (message) => { notifyOnMessageListeners(message); });
client.on("presenceUpdate", (oldGuildMember, newGuildMember) => { notifyOnPressenceUpdateLisenters });

client.login(config.discordToken);