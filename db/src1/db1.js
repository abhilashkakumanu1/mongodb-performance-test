const mongoose = require("mongoose");
const {
  NUM_OF_ARTICLES,
  connectToDB,
  closeConnection,
  getRandomInt,
  loopify,
} = require("../common");

const DOMAIN = "https://www.digital-exchange.com/articles/";

// Schema for DB1
const article = new mongoose.Schema({
  urls: { type: [String], index: true },
});
const Article = mongoose.model("Article", article);

async function populateDB() {
  let urls;
  for (let i = 1; i <= NUM_OF_ARTICLES; i++) {
    if (i % 100 == 0) {
      urls = [DOMAIN + `${i}a`, DOMAIN + `${i}b`, DOMAIN + `${i}c`];
    } else {
      urls = [DOMAIN + i];
    }
    await new Article({ urls }).save();
  }
}

function getRandomUrl() {
  n = getRandomInt(1, NUM_OF_ARTICLES);
  return DOMAIN + n;
}

async function readArticle() {
  url = getRandomUrl();
  const article = await Article.findOne({ urls: url });
  // console.log(article);
}

(async () => {
  // Connect to DB
  await connectToDB("db1");

  // Populate DB
  // populateDB();

  // Read Articles
  await loopify(readArticle);

  // Close DB connection
  await closeConnection();
})();
