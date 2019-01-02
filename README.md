# HeraclitusBot

A bot tweeting random fragments from the [Heraclitus-Fragments](https://github.com/r03ert0/Heraclitus-Fragments) repository.

A fragment number is randomly selected from 1 to 129,
the greek and english versions of the fragment are
downloaded from [Heraclitus-Fragments](https://github.com/r03ert0/Heraclitus-Fragments),
the layout of the tweet is done using HTML,
then rendered as a `.png` file,
and finally sent to Twitter.

The code is all inside `app.js`. Twitter requires a set of 4 keys to allow a bot to tweet.
You can get your own by registering for a developer account at https://developer.twitter.com,
and then creating an app. Replace the values you will obtain there in the file `keys.json`
(removing the `_example`).

To run the code manually, and produce a tweet, type `node start`. That will call `app.js` and
run the script.

To make the code run automatically, use a [`cron` job](https://www.ostechnix.com/a-beginners-guide-to-cron-jobs/).

### How to contribute
What would be nice to do next?

* Hopefully, the translation of the fragments will improve through time.
It would be nice to collect all the reactions to each fragment and add
them to their "Issue" thread?
* If translations to languages other than english become available,
tweet those as well?
* Add audio files with community-curated greek pronounciation for each fragment?
* Change the black background for appropriate images?
