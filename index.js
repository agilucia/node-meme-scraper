import fetch from 'node-fetch';

const website = new URL('https://memegen-link-examples-upleveled.netlify.app/');

const response = await fetch(website);
const body = await response.text();

console.log(body);
