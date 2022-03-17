const mongoose = require("mongoose");

const NUM_OF_ARTICLES = 1000000;
const NUM_OF_LOOPS = 10000;

async function connectToDB(db) {
  await mongoose.connect(`mongodb://localhost:27017/${db}`);
}

async function closeConnection() {
  await mongoose.connection.close();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loopify(func) {
  let n;
  let start = Date.now();

  for (let i = 1; i <= NUM_OF_LOOPS; i++) {
    await func();
  }

  let end = Date.now();
  console.log(`Execution time: ${end - start} ms`);
}

module.exports = {
  NUM_OF_ARTICLES,
  NUM_OF_LOOPS,
  connectToDB,
  closeConnection,
  getRandomInt,
  loopify,
};
