const fetch = require("node-fetch")
module.exports = async function Wikipedia(searchQuery) {
    if(!searchQuery) throw new TypeError("No search query is specified!");
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchQuery)}` // From Here BOT Will Search For It

		let response
		try {
			response = await fetch(url).then(res => res.json())
		}
		catch (e) {
			return "Something wrong. Beep!";
		}

		try {
			if (response.type === 'disambiguation') { // If Their Are Many Results With Same Seached Topic
				// const embed = new MessageEmbed()
				// 	.setColor('RANDOM')
				// 	.setTitle(response.title)
				// 	.setURL(response.content_urls.desktop.page)
				// 	.setDescription([`
                // ${response.extract}
                // Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`]) // If Their Are Many Results With Same Seached Topic
				// message.channel.send(embed)
                return `Title:- ${response.title} \n Link:- ${response.content_urls.desktop.page} \n Description:- ${response.extract}`
			}
			else { // If Only One Result
				// const embed = new MessageEmbed()
				// 	.setColor('#F8F5F4')
				// 	.setTitle(response.title)
				// 	.setThumbnail(response.thumbnail.source)
				// 	.setURL(response.content_urls.desktop.page)
				// 	.setDescription(response.extract)
				// 	.setTimestamp()
				// 	.setFooter("Wikipedia: wikipedia.org")
				return `Title:- ${response.title} \n Thumbnail:- ${response.thumbnail.source} \n Link:- ${response.content_urls.desktop.page} \n Description:- ${response.extract}`
			}
		}
		catch {
			return 'Provide A Valid Query To Search.'; // If Searched Query Is Not Available
		}
}   