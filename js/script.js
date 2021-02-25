// If you only want to test the game and are not familiar with the Moomins,
// the correct word is displayed in the console!

const wordList = ['Mymlan', 'Lilla My', 'Sniff', 'Snusmumriken', 'Snorkfröken', 'Snorken',
    'Too Ticki', 'Filifjonka', 'Hattifnattar', 'Hemulen', 'Mårran', 'Bisamråttan', 'Förfadern',
'Dronten Edward', 'Fredrikson', 'Gafsan', 'Homsan', 'Hunden Ynk', 'Isfrun']

let messageContainer = document.querySelector("#house");
let startGameBtn = document.querySelector('.start');
let letterBoxContainer = document.querySelector('#letterBoxes');
let letterBoxUl = letterBoxContainer.getElementsByTagName("ul");
const letterButtonEls = document.querySelectorAll(".alphabet");
let stinky = document.querySelector("#stinky");
let messages = document.querySelector("#messages");
let wrongGuesses = 0;
let guessedWord = " ";
let restartButton;
let stinkyMoves = 20;
let selectedWord = undefined;


letterButtonEls.forEach((button) => {
    button.disabled = true;
})


function startGame() {
    // enable alphabet and disable startgame button
    letterButtonEls.forEach((button) => {
        button.disabled = false;
    })

    startGameBtn.disabled = true;
    // generate random word
    let randomNumber = Math.floor(Math.random() * (wordList.length - 1));
    let randomWord = wordList[randomNumber];
    selectedWord = randomWord.toUpperCase();
    console.log(selectedWord);

    for (y = 0; y < selectedWord.length; y += 1) {
        //create blank spaces for the word
        let letterBox = document.createElement("li");
        let letter = selectedWord.substr(y, 1);
        let input = document.createElement("input");

        //if a randomword contains more than one word, space between can be styled with css
        if (letter === " ") {
            input.setAttribute("id", "blank");
            guessedWord += " ";
        }

        input.setAttribute("type", "text");
        input.setAttribute("value", " ");
        input.disabled = true;
        input.setAttribute("class", "letterBox");
        letterBox.appendChild(input);
        letterBoxContainer.appendChild(letterBox);
    }

    // remove selectedword from wordList. selectedword is uppercase, so randomword the way to go
    let index = wordList.indexOf(randomWord);
    wordList.splice(index, 1);
}


startGameBtn.addEventListener('click', startGame);


function restartGame() {
    //deleting the previous word
    let letterBoxes = document.querySelectorAll(".letterBox");
    letterBoxes.forEach((box) => {
        box.remove();
    });
    //just resetting everything
    selectedWord = undefined;
    wrongGuesses = 0;
    guessedWord = " ";
    messages.innerText = "";
    restartButton.remove();

    letterButtonEls.forEach((button) => {
        button.disabled = true;
    })

    startGameBtn.disabled = false;
    stinky.style.display = "initial";
    stinkyMoves = 20;
    stinky.style.left = "300px";
    if (wordList.length === 0) {
        messages.innerText = "Du har gissat dig genom allt! Ladda om sidan för att spela igen.";
    }
    startGame();
}


function createRestartButton() {
    let restart = document.createElement("button");
    restart.innerText = "Börja Om";
    restart.setAttribute("id", "restart");
    messageContainer.appendChild(restart);

    restartButton = document.querySelector("#restart");
    restartButton.addEventListener('click', restartGame);
}


function guessLetter(l) {
    let input = letterBoxContainer.querySelectorAll("input");
    let letterValue = l.target.value;
    let x = 300;
    let containsLetter = selectedWord.includes(letterValue);

    // checks every letter of selectedword if it matches the lettervalue. 
    // if yes, it shows them at the right place, even if they occur multiple times
    for (n = 0; n < selectedWord.length; n += 1) {
        if (letterValue === selectedWord[n]) {
            input[n].setAttribute("value", `${letterValue}`);
            input[n].innerText = `${letterValue}`;
            guessedWord += this.value;
        }

    }

    if (containsLetter === false) {
        messages.innerText = `Fel gissat: ${wrongGuesses += 1} av 6`;
        stinkyMoves += 10;
        stinky.style.left = `${stinkyMoves}vw`;
    }

    if (wrongGuesses >= 6) {
        messages.innerText = "Nu har Stinky försvunnit, du förlorade!";

        letterButtonEls.forEach((button) => {
            button.disabled = true;
        })

        createRestartButton();
        stinky.style.display = "none";
    }

    if ((guessedWord.length - 1) === selectedWord.length) {
        messages.innerText = `Bra jobbat, helt rätt!`;

        letterButtonEls.forEach((button) => {
            button.disabled = true;
        })

        createRestartButton();
    }

    this.disabled = true;
}


letterButtonEls.forEach((button) => {
    button.addEventListener('click', guessLetter);
})
