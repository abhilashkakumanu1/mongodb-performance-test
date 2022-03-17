const mongoose = require("mongoose");
const publishers = require("../publishers");
const {
  NUM_OF_ARTICLES,
  connectToDB,
  closeConnection,
  getRandomInt,
  loopify,
} = require("../common");

const NUM_OF_PUBLISHERS = publishers.length;
const NUM_OF_ARTICLES_PER_PUBLISHER = Math.floor(
  NUM_OF_ARTICLES / NUM_OF_PUBLISHERS
);

// Schema
const article = new mongoose.Schema({
  urls: { type: [String], index: true },
});
const Article = mongoose.model("Article", article);

async function populateDB() {
  let urls, domain;
  for (let i = 0; i < NUM_OF_PUBLISHERS; i++) {
    domain = `https://${publishers[i]}/`;
    for (let j = 1; j <= NUM_OF_ARTICLES_PER_PUBLISHER; j++) {
      if ((i * NUM_OF_ARTICLES_PER_PUBLISHER + j) % 100 == 0) {
        urls = [domain + `${j}a`, domain + `${j}b`, domain + `${j}c`];
      } else {
        urls = [domain + j];
      }
      await new Article({ urls }).save();
    }
  }
}

function getRandomUrl() {
  publisherNumber = getRandomInt(0, NUM_OF_PUBLISHERS - 1);
  articleNumber = getRandomInt(1, NUM_OF_ARTICLES_PER_PUBLISHER);
  return `https://${publishers[publisherNumber]}/${articleNumber}`;
}

async function readArticle() {
  url = getRandomUrl();
  const article = await Article.findOne({ urls: url });
  // console.log(article);
}

(async () => {
  // Connect to DB
  await connectToDB("db3");

  // Populate DB
  // await populateDB();

  // Read Articles
  await loopify(readArticle);

  // Close DB connection
  await closeConnection();
})();
