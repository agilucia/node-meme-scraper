import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as fs from 'node:fs';
import https from 'node:https';

const website = new URL('https://memegen-link-examples-upleveled.netlify.app/');

const response = await fetch(website);
const body = await response.text();

// loading the html with cheerio
const $ = cheerio.load(body);

// extracting src from html
const html = $(`img`).html('src');

// push first 10 image urls to array:
const imageUrls = [];

for (let i = 0; i <= 9; i++) {
  imageUrls.push(html[i].attribs.src);
}

// creating a memes folder or accessing it if it already exists
const memeFolder = './memes';

fs.access(memeFolder, (error) => {
  if (error) {
    fs.mkdir(memeFolder, (err) => {
      if (err) {
        console.log('Something went wrong!');
      } else {
        console.log('Memes saved to new folder.');
      }
    });
  } else {
    console.log('Memes saved to existing folder.');
  }
});

// creating function to download the images
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`),
        );
      }
    });
  });
}

// saving image data to new files in memes folder
for (let i = 0; i < imageUrls.length; i++) {
  if (i < 9) {
    downloadImage(imageUrls[i], `./memes/0${i + 1}.jpg`)
      .then(console.log(`downloaded image 0${i + 1}.jpg`))
      .catch(console.error);
  } else {
    downloadImage(imageUrls[i], `./memes/${i + 1}.jpg`)
      .then(console.log(`downloaded image ${i + 1}.jpg`))
      .catch(console.error);
  }
}
