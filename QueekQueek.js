	const Discord = require('discord.js');
	// const config = require('./_QQ_config.json');
	const config = require('./config.json');
	const bot = new Discord.Client();

	bot.login(config.token);

	bot.on('ready', () => {
		console.log('QueekQueek ready!');
	});

	var fs = require('fs');
	var DB = JSON.parse(fs.readFileSync("./db.json", "utf8"));
	var IMAGE_URL = "https://allcards.skylords.eu/cards/";
	var WIKI_URL = "http://battleforge.wikia.com/wiki/Card:";
	var banned = [];

	bot.on('message', message => {
		if (message.content == "!QueekQueek") {
			message.channel.send(`
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	I'm QueekQueek...

	Made by: ` + config.author + `
	Version: ` + config.version + `
	Commands:

		!QueekQueek : Show this Information
		!Queek : Show a random Card
		!Queek all : Summons an UR card (1x Usage in Life)
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`
			)
		} else if (message.content == "!Queek") {
			var RNG = getRandomIntInclusive(0, 539);
			var SELECTED = DB[RNG];
			var AFFINITY = SELECTED.Name.indexOf("promo") != -1 ? "-promo" : SELECTED.Affinity;
			var WIKI_ENTRY = WIKI_URL + SELECTED.Name.replace("(promo)", "").replace(/ /g, "_");

			message.channel.send(
				"I've selected this card for you...\n" + 
				IMAGE_URL + (SELECTED.Name.replace("(promo)", "").replace(/ /g, "-").replace(/'/g, "").replace("(", "").replace(")", "")).replace("--", "-") + AFFINITY + ".jpg" + 
				"\nWiki: <" + WIKI_ENTRY + ">"
			)
		} else if (message.content == "!Queek all") {
			var User = message.author.id;
			if (!banned[User]) {
				banned[User] = true;
			} else {
				message.channel.send("You already set all on one card " + message.author.username);
				return;
			}
			var UR = [];

			for (var i = DB.length - 1; i >= 0; i--) {
				var entry = DB[i];
				if (entry.Rarity == "UR") {
					UR.push(entry);
				}
			}

			var RNG = getRandomIntInclusive(0, UR.length);
			var SELECTED = UR[RNG];
			var AFFINITY = SELECTED.Name.indexOf("promo") != -1 ? "-promo" : SELECTED.Affinity;
			var WIKI_ENTRY = WIKI_URL + SELECTED.Name.replace("(promo)", "").replace(/ /g, "_");

			message.channel.send(
				"Heart of the cards i trust on you!!!!!!!!!!!!!!!!\n" + 
				IMAGE_URL + (SELECTED.Name.replace("(promo)", "").replace(/ /g, "-").replace(/'/g, "").replace("(", "").replace(")", "")).replace("--", "-") + AFFINITY + ".jpg" + 
				"\nWiki: <" + WIKI_ENTRY + ">"
			)
		}
	});

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
