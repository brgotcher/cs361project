// let request = new XMLHttpRequest();
// request.open("GET", "http://flip3.engr.oregonstate.edu:3480/search/street", false);
// request.send(null);
// response = JSON.parse(request.responseText);
// console.log(response);

// phrase = document.getElementById("phrase");
// phrase.textContent = response;

const axios = require('axios');
const cheerio = require('cheerio');

let str = "street"
axios.get('http://flip3.engr.oregonstate.edu:3480/search/' + str).then((response) => {
    const html = response.data;
    console.log(html);
}).catch((error) => {
    console.log(error);
});

