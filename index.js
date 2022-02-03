const wordPos = require('wordpos');
const fetch = require('node-fetch');

const wordpos = new wordPos();


async function feature(query) {
    console.log(query + ' is ');
    try {
        const wasItANoun = await wordpos.isNoun(query)
        const wasItAVerb = await wordpos.isVerb(query)
        const wasItAnAdjective = await wordpos.isAdjective(query)
        const wasItAnAdverb = await wordpos.isAdverb(query)

        if (!wasItANoun) {
            console.log('not a noun,');

        } else
            console.log('a noun,');
        if (!wasItAVerb) {
            console.log('not a verb,');

        } else
            console.log('a verb,')
        if (!wasItAnAdjective) {
            console.log('not an adjective,');

        } else
            console.log('an adjective,')
        if (!wasItAnAdverb) {
            console.log('not an adverb,');

        } else
            console.log('an adverb,')

        const response = await fetch('https://api.npms.io/v2/search?q=' + query)
        const out = await response.json();
        var data = out.total;
        if (data > 0) {
            console.log(data + ' too many results');
            return data;
        } else {
            console.log(data + ' no results');
            return data;
        }
    } catch (err) {
        console.log(err);
    }
}

feature(process.argv[2]);