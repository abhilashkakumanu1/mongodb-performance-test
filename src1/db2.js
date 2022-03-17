const mongoose = require("mongoose");

const {
  DOMAIN,
  NUM_OF_ARTICLES,
  connectToDB,
  closeConnection,
  getRandomInt,
  loopify,
} = require("../common");

const DOMAIN = "https://www.digital-exchange.com/articles/";

// Schema
const article = new mongoose.Schema({
  url: { type: String, index: true },
});
const Article = mongoose.model("Article", article);

async function populateDB(NUM_OF_ARTICLES) {
  let domain = "https://www.digital-exchange.com/articles/";

  let url, url1, url2, url3;
  for (let i = 1; i <= NUM_OF_ARTICLES; i++) {
    if (i % 100 == 0) {
      url1 = domain + `${i}a`;
      url2 = domain + `${i}b`;
      url3 = domain + `${i}c`;

      await new Article({ url: url1 }).save();
      await new Article({ url: url2 }).save();
      await new Article({ url: url3 }).save();
    } else {
      url = domain + i;
      await new Article({ url }).save();
    }
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
  await loopify(readArticle, NUM_OF_ARTICLES);

  // Close DB connection
  await closeConnection();
})();
