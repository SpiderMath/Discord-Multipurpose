module.exports = async function Ejected(name, isImp, crewmateColor) {
    if(!name) throw new TypeError("Please provide a name!");
    if(!isImp) throw new TypeError("Please provide if the person is an impostor");
    if(!crewmateColor) throw new TypeError("Please put any one of the crewmate colors:- black|blue|brown|cyan|darkgreen|lime|orange|pink|purple|red|white|yellow");
    let url = `https://vacefron.nl/api/ejected?name=${name}&impostor=${isImp}&crewmate=${crewmateColor}`;
    return url;
}