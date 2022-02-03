const wordPos = require('wordpos');
const fetch = require('node-fetch');

const wordpos = new wordPos();

async function feature(query) {
    await wordpos.isNoun(query)
        .then(async (wasItANoun) => {
            if (!wasItANoun) {
                console.log('not a noun');
            } else {
                console.log('it was a noun');
                await fetch('https://api.npms.io/v2/search?q=' + query)
                    .then(async res => await res.json())
                    .then(async (out) => {
                        let data = await out.total;
                        if (data > 0) {
                            console.log(data + ' too many results');
                            return data;
                        } else {
                            console.log(data + ' no results');
                            return data;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        }
        );
}

feature(process.argv[2]);