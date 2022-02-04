const wordPos = require(`wordpos`);
const fetch = require(`node-fetch`);

const wordpos = new wordPos();


const makeupmind = async (input, query, text) => {
    let word = (text === "adverb" || text === "adjective" ) ? `an ${text}`: `a ${text}`;
    if (input) {
        console.log(`${query} is ${word}`);
        return searchNPM(query);
    }
}


const getWordType = async (query) => {
    try {
        const wasItANoun = await wordpos.isNoun(query);

        if (wasItANoun) {
            return makeupmind(wasItANoun, query, `noun`);
        }
        console.log(`${query} is not a noun`);
        const wasItAVerb = await wordpos.isVerb(query);

        if (wasItAVerb) {
            return makeupmind(wasItAVerb, query, `verb`);
        }
        console.log(`${query} is not a verb`);
        const wasItAnAdjective = await wordpos.isAdjective(query);

        if (wasItAnAdjective) {
            return makeupmind(wasItAnAdjective, query, `adjective`);
        }
        console.log(`${query} is not an adjective`);
        const wasItAnAdverb = await wordpos.isAdverb(query);

        if (wasItAnAdverb) {
            return makeupmind(wasItAnAdverb, query, `adverb`);
        }
        console.log(`${query} is not an adverb`);
    } catch (err) {
        console.log(err);
    }
}

const searchNPM = async (query) => {
    const response = await fetch(`https://api.npms.io/v2/search?q=${query}`);
    const out = await response.json();
    var data = out.total;
    if (data > 0) {
        console.log(`${data} too many results`);
        return data;
    } else {
        console.log(`${data} no results`);
        return data;
    }
}


//getWordType(process.argv[2]);
module.exports = getWordType;