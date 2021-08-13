let request = new XMLHttpRequest();
request.open("GET", "http://flip3.engr.oregonstate.edu:3480/search/street", false);
request.send(null);
response = JSON.parse(request.responseText);
console.log(response);

phrase = document.getElementById("phrase");
phrase.textContent = response;