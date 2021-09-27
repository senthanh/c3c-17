module.exports = async function onLoad(loadData) {
	
	const fetch = await loadData.require("node-fetch");
	const Discord = await loadData.require("discord.js");
	
	return {
		shibeFunc: async (msgData) => {
			var rawMessage = msgData.rawData.rawMessage;
			let imgUrl = (await fetch(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false`).then(res => res.json()))[0];
			let embed = new Discord.MessageEmbed()
				.setTitle("RANDOM SHIBE IMAGE")
				.setColor("RANDOM")
				.setImage(imgUrl)
				.setTimestamp(Date.now())
				.setAuthor(rawMessage.author.username, rawMessage.author.displayAvatarURL())
				.toJSON();
				
			rawMessage.reply({
				embed
			});
		}
	}
}
