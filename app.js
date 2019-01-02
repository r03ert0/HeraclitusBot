/*
    HeraclitusBot
    Roberto Toro, Decembre 2018
*/

/* global Buffer, require, __dirname */
/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const ghGot = require('gh-got');
const phantom = require('phantom');
const Twit = require('twit');

const keys = JSON.parse(fs.readFileSync("keys.json").toString());

async function tweet(rand) {
    // Encode a picture
    var b64content = fs.readFileSync("fragment.png", { encoding: 'base64' });

    // Post the media to Twitter
    var T = new Twit(keys);
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // Reference the media and post a tweet (media will attach to the tweet)
        const mediaIdStr = data.media_id_string;
        const params = {
            status: `Fragment ${rand}.\nContribute at https://github.com/r03ert0/Heraclitus-Fragments\n#HeraclitusFragments`,
            media_ids: [mediaIdStr]
        };
        T.post('statuses/update', params, function (err, data, response) {
            console.log("Tweet successful.")
        });
    });
}
async function render() {
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.property('viewportSize', { width: 1024, height: 512 });
    const p = path.join(__dirname, "fragment.html");
    await page.open(p);
    await page.render('fragment.png');
    await instance.exit();
}

async function fragment(rand) {
    let res

    console.log("rendering fragment", rand);

    try {
        res = await ghGot(`repos/r03ert0/Heraclitus-Fragments/contents/fragment-${rand}.greek.txt`);
    } catch(err) {
        console.error("ERROR: No greek");
        throw new Error(err);
    }
    const gr = Buffer.from(res.body.content, 'base64').toString();
    console.log(gr);
    let en = "[Contribute a translation]"
    try {
        res = await ghGot(`repos/r03ert0/Heraclitus-Fragments/contents/fragment-${rand}.english.txt`);
        en = Buffer.from(res.body.content, 'base64').toString();
    } catch(err) {
        console.error("ERROR: No english");
    }
    console.log(en);
    const svg = `
<html>
<meta charset="UTF-8">
<style>
html {
    background: black;
    width:100%;
    height:100%;
}
p {
    font-family:sans-serif;
    font-size:32px;
    color: white;
}
#text {
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
}
</style>
<div id="text">
    <p>${gr}</p>
    <p>${en}</p>
</div>
</html>`;
    fs.writeFileSync("fragment.html", svg)
    await render();
}

(async () => {
    const rand = (129*Math.random())|0;
    try {
        await fragment(rand);
    } catch(err) {
        console.error(err);
        return;
    }

    try {
        await tweet(rand);
    } catch(err) {
        console.error(err);
        return;
    }

    try {
        fs.unlinkSync('fragment.html');
        fs.unlinkSync('fragment.png');
    } catch(err) {
        console.error(err);
    }
})()
