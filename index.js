import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const website = new URL('https://memegen-link-examples-upleveled.netlify.app/');

const response = await fetch(website);
const body = await response.text();

// console.log(body);

const $ = cheerio.load(body);

const html = $(`img`).html('src'); // get first src attribute from img

// console.log(html);

// push first 10 image urls to array:
const imageUrls = [];

for (let i = 0; i <= 9; i++) {
  imageUrls.push(html[i].attribs.src);
}

console.log(imageUrls);

// console.log($);

// const htmlContent = $.html();

// console.log(htmlContent);

// const matchingElements = $.html('img');

// console.log(matchingElements);

// const imageUrls = new Array();
