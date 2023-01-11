import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const website = new URL('https://memegen-link-examples-upleveled.netlify.app/');

const response = await fetch(website);
const body = await response.text();

// console.log(body);

const $ = cheerio.load(body);

// console.log($);

const htmlContent = $.html();

// console.log(htmlContent);

const matchingElements = $.html('img');

console.log(matchingElements);
