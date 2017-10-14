let bot = require("../bot.js");
let insults = [
    "@, Away, you starvelling, you elf-skin, you dried neat’s-tongue, bull’s-pizzle, you stock-fish!",
    "@: a most notable coward, an infinite and endless liar, an hourly promise breaker, the owner of no one good quality.",
    "@, away, you starvelling, you elf-skin, you dried neat’s-tongue, bull’s-pizzle, you stock-fish!",
    "@, away, you three-inch fool! ",
    "@, come, come, you froward and unable worms!",
    "@, go, prick thy face, and over-red thy fear, Thou lily-liver’d boy.",
    "@'s wit’s as thick as a Tewkesbury mustard.",
    "@, Thou art pigeon-liver’d and lack gall.",
    "I am sick when I do look on @.",
    "@, I must tell you friendly in your ear, sell when you can, you are not for all markets.",
    "I’ll beat thee, @, but I would infect my hands.",
    "I scorn you, @, scurvy companion. ",
    "@ Me think’st thou art a general offence and every man should beat thee.",
    "@, more of your conversation would infect my brain.",
    "@'s wife’s a hobby horse!",
    "Peace, @, ye fat guts!",
    "@ Poisonous bunch-backed toad!",
    "@ is the rankest compound of villainous smell that ever offended nostril.",
    "The tartness of @'s face sours ripe grapes.",
    "There’s no more faith in @ than in a stewed prune.",
    "@, thine face is not worth sunburning.",
    "@. This woman’s an easy glove, my lord, she goes off and on at pleasure.",
    "@, thou art a boil, a plague sore.",
    "@, thou art as fat as butter.",
    "@ is like the toad; ugly and venomous.",
    "@, thou art unfit for any place but hell.",
    "@, thou cream faced loon.",
    "@, thou clay-brained guts, thou knotty-pated fool, thou whoreson obscene greasy tallow-catch!",
    "@, thou damned and luxurious mountain goat.",
    "@, thou elvish-mark’d, abortive, rooting hog!",
    "@, thou leathern-jerkin, crystal-button, knot-pated, agatering, puke-stocking, caddis-garter, smooth-tongue, Spanish pouch!",
    "@, thou lump of foul deformity",
    "@, that poisonous bunch-back’d toad!",
    "@, thou sodden-witted lord! Thou hast no more brain than I have in mine elbows ",
    "@, thou subtle, perjur’d, false, disloyal man!",
    "@, thou whoreson zed, thou unnecessary letter!",
    "@'s sin’s not accidental, but a trade.",
    "@'s tongue outvenoms all the worms of Nile.",
    "Would that @ wert clean enough to spit upon.",
    "Would that @ wouldst burst!",
    "@, you poor, base, rascally, cheating lack-linen mate!",
    "@, you are as a candle, the better burnt out.",
    "@, you scullion! You rampallian! You fustilarian! I’ll tickle your catastrophe!",
    "@, you starvelling, you eel-skin, you dried neat’s-tongue, you bull’s-pizzle, you stock-fish–O for breath to utter what is like thee!-you tailor’s-yard, you sheath, you bow-case, you vile standing tuck!",
    "@, your brain is as dry as the remainder biscuit after voyage.",
    "@, villain, I have done thy mother",
    "@, fuck thee.",
    "@, up thine!"
];

let dbConnection = bot.dbConnection;
let table = "insults";
let columns = ["insult"];

let getRandomInsult = function(user) {
    return insults[Math.floor(Math.random()*insults.length)].replace("@", user);
}

let sendMessage = function(message) {
    if (!message.content.includes("insult")) return false;
    
    if (message.content.includes("insult add")) {
        addInsult();
        return true;
    }

    if (message.content.includes("insult getall")) {
        getInsults();
        return true;
    }

    let isDM = message.channel.type === 'dm';

    let mentionedUsers = message.mentions.users;

    if (mentionedUsers.size === 0) {
        let username = message.content.replace(/.*insult/, "").trim();
        let user = bot.utils.getUser(username);

        if (user) mentionedUsers.set(user.id, user);
        else if (!isDM) mentionedUsers.set(0, username); //don't add strings if we're going to DM
    }

    if (isDM) {
        mentionedUsers.forEach( user => user.send(getRandomInsult(user)) );
    } else {
        mentionedUsers.forEach( user => { message.channel.send(getRandomInsult(user)); });
    }

    return true;
}

let addInsult = function(insult) {
    let values = ["@New Insult"];
    dbConnection.add(table, columns, values)
}

let getInsults = function() {
    dbConnection.getAll(table, columns)
        .then( rows => console.log(rows));
}

module.exports = {
    sendMessage: function(message) {
        return sendMessage(message);
    }
}