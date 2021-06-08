const fetch = require("node-fetch");
module.exports = async function Github(name) {
    if (!name) throw new TypeError('Provide A Valid User To Search.');
    const url = `https://api.github.com/users/${name}`;
    let response
		try {
			response = await fetch(url).then(res => res.json())
		}
		catch (e) {
			return 'An Error Occured, Try Again Later.';
		}
        return `Name:- ${response.login}(${response.id}) \n Link:-${response.html_url} \n Avatar:- ${response.avatar_url} \n ${response.bio ? response.bio : 'No Bio'} \n Public Repositories:- ${response.public_repos.toLocaleString()} \n Followers:- ${response.followers.toLocaleString()} \n Following:- ${response.following.toLocaleString()} \n Email:- ${response.email ? response.email : 'No Email'} \n Company:- ${response.company ? response.commands : 'No Company'} \n Location:- ${response.location ? response.location : 'No Location'}`
}