// let request = new XMLHttpRequest();
// request.open("GET", "http://flip3.engr.oregonstate.edu:3480/search/street", false);
// request.send(null);
// response = JSON.parse(request.responseText);
// console.log(response);

// phrase = document.getElementById("phrase");
// phrase.textContent = response;

const axois = require('axios');
const cheerio = require('cheerio');

axois.get('http://flip3.engr.oregonstate.edu:3480/search/street').then(response => {
    const html = response.data;
})

console.log(html)