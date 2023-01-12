import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as fs from 'node:fs';

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

// console.log(imageUrls);

// for each loop to get jpeg data for each list item of imageUrls

const memeFolder = './memes';

fs.access(memeFolder, (error) => {
  if (error) {
    fs.mkdir(memeFolder, (err) => {
      if (err) {
        console.log('Something went wrong!');
      } else {
        console.log('Directory created.');
      }
    });
  } else {
    console.log('Meme folder already exists.');
  }
});
