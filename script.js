console.log("script started");
body = document.getElementsByTagName("body")[0];
playButton = document.getElementById("play");
playButton.addEventListener("click", start);
rightDiv = document.getElementById("speed");
bottomDiv = document.createElement("div");
body.appendChild(bottomDiv);
game = document.getElementById("game");
guessAgain = document.createElement("p")
guessAgain.textContent = "Guess again!";
title = document.getElementById("title");
gameWon = false;
console.log("end of assignment block");
word = "";
hint = "";

function start() {
    console.log("start() function started");
    playButton.remove();
    startSpeed = checkSpeed();
    title.textContent = "Guess the word or phrase as quickly as you can!";
    play();
}

function play() {
    rightDiv.innerHTML = "";
    game.innerHTML = "";
    bottomDiv.innerHTML = "";
    timer = document.createElement("p");
    timer.innerHTML = "Time remaining: " + startSpeed;
    rightDiv.appendChild(timer);
    newText = document.createElement("p");
    newText.textContent = "To start over with a new image, click New";
    rightDiv.appendChild(newText);
    newButton = document.createElement("button");
    newButton.textContent = "New";
    rightDiv.appendChild(newButton);
    newButton.addEventListener("click", play);
    quitText = document.createElement("p");
    quitText.textContent = "To end the current game and go back to the main screen, click quit";
    rightDiv.appendChild(quitText);
    quitButton = document.createElement("button");
    quitButton.textContent = "Quit";
    quitButton.onclick = function() {location.reload();}
    rightDiv.appendChild(quitButton);
    getImage();
//    imgDiv = document.createElement("div");
//    imgDiv.id = "imgDiv";
//    img = document.createElement("img");
//    img.src = "https://images.theconversation.com/files/230552/original/file-20180803-41366-8x4waf.JPG?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip";
//    imgDiv.appendChild(img);
//    game.appendChild(imgDiv);
    obfuscator = document.createElement("div");
    obfuscator.id = "obfuscator";
    game.appendChild(obfuscator);
    game.position = "relative";
    animationstr = "reveal " + (startSpeed+10) + "s";
    obfuscator.style.animation = animationstr;
    anagram = document.createElement("p");
    hint = getHint(word);
    anagram.innerHTML = "Anagram hint: " + hint;
    anagram.style.textAlign = "center";
    bottomDiv.appendChild(anagram);
    guess = document.createElement("input")
    guess.setAttribute("type", "text");
    bottomDiv.appendChild(guess);
    submit = document.createElement("button");
    submit.textContent = "submit";
    submit.addEventListener("click", checkAnswer);
    bottomDiv.appendChild(submit);

    runTimer();
}

function checkSpeed() {
    if (document.getElementById("slow").checked) {
        return 25
    }
    else if (document.getElementById("fast").checked) {
        return 15
    }
    else {
        return 20
    }
}

function runTimer() {
    speed = startSpeed;
    setInterval(function() {
        if (speed > 0) {
            speed = speed - 1;
            timer.innerHTML = "Time remaining: " + speed;
        }
        else {
            clearInterval();
            if (!gameWon) {
                loseGame();
            }

        }
    }, 1000);

}

function checkAnswer() {
    textInput = guess.value;
    if (textInput.toLowerCase() == "elephant") {
        time = speed;
        gameWon = true;
        winGame();
    }
    else {
        body.appendChild(guessAgain);
        setTimeout(function() {
            guessAgain.remove();
        }, 2000);
    }
}

function winGame() {
    game.innerHTML = "";
    youWin = document.createElement("h1");
    youWin.textContent = "You win! Your time: " + time + " seconds"
    game.appendChild(youWin);
}

function loseGame() {
    game.innerHTML = "";
    tryAgain = document.createElement("h1");
    tryAgain.textContent = "Try again! click New to try another image, or Quit to return to the start screen";
    game.appendChild(tryAgain);
}

function getImage() {
    imgDiv = document.createElement("div");
    imgDiv.id = "imgDiv";
    img = document.createElement("img");
    let request = new XMLHttpRequest();
    request.open("GET", "https://cs361projectapi.herokuapp.com", false);
    request.send(null);
    response = JSON.parse(request.responseText);
    word = Object.keys(response)[0].toLowerCase();
    value = response[word];
    img.src = value
    imgDiv.appendChild(img);
    game.appendChild(imgDiv);
}

function getHint(word) {
    // send the word in a get request to the anagram microservice
    let req = new XMLHttpRequest();
    req.open("GET", "http://flip3.engr.oregonstate.edu:3480/search/" + word, false);
    req.send(null);
    out = req.responseText;
    console.log(out);
    console.log(word);
    // if the anagram service does not find an anagram, just scramble the letters
    if (out.length != word.length || out == word) {
        out = scramble(out);
    }
    return out;
}

function scramble(str) {
    console.log("Pre scramble: " + str);
    arr = str.split('');
    len = arr.length;
    for (i = 0; i < str.length-1; i++) {
        j = Math.floor(Math.random() * len);
        temp = arr[i];
        arr[i] = arr[j]
        arr[j] = temp; 
    }
    str = arr.join('');
    console.log("Post scramble: " + str);
    return str;
}