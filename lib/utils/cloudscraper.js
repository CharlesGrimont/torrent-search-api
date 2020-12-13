let cloudscraper;
try {
  cloudscraper = require('cloudflare-scraper');
} catch (e) {
  console.log("why");
  //cloudscraper = require('cloudscraper');
}

module.exports = cloudscraper;
