let request = new XMLHttpRequest();
request.open("GET", "https://cs361projectapi.herokuapp.com", false);
request.send(null);
response = JSON.parse(request.responseText);
console.log(response);

key = Object.keys(response)[0];
value = response[key]

image = document.getElementById("image");
phrase = document.getElementById("phrase");
pic = document.createElement("img");
pic.src = value;
image.appendChild(pic);
phrase.textContent = key;
pic.style.maxHeight = "500px";
pic.style.maxWidth = "500px";
