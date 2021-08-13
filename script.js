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
    anagram.innerHTML = "Anagram hint: help a ten"
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
    key = Object.keys(response)[0];
    value = response[key];
    img.src = value
    imgDiv.appendChild(img);
    game.appendChild(imgDiv);
}
