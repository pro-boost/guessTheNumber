// Initialize variables to be able to use them in functions
let randomNumber;
let guessInput = document.getElementById("guess");
let result;
let attempts = 0;
let score = 0;
let button = document.getElementById("validate");
guess = parseFloat(guess);


onload = generateRandomNumber;// Call generateRandomNumber function when the page loads
guessInput.focus();  //When the page loads, set the focus on the input field named guessInput,

// fucntion to read playGame(), replay() and reloadPage() when pressing "Enter" key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        if (button.innerText === "Replay") {
            reloadPage();
        }
        if (button.innerText === "Next Game") {
            replay();
        }
        playGame();
    }
}

// Function to generate a random number between 1 and 100
function generateRandomNumber() {
    if (!randomNumber) {
        randomNumber = Math.floor(Math.random() * 100) + 1;
    }
}


// Function to compare the player's guess with the random number
function playGame() {    
    let guess = Number(guessInput.value); // Using Number() to have the value of 0 instead of NaN when input is empty "" 
    console.log(randomNumber);
    guessInput.focus(); 
    button.innerText = "Validate";

    if (0 < guess && guess < randomNumber) {
        result = "Wrong! your guess was low!";
        attempts++;

    } else if (100 >= guess && guess > randomNumber) {
        result = "Wrong! your guess was high!";
        attempts++;

    } else if (guess === randomNumber) {
        result = "Congratulations! you got it right!";
        document.getElementById('result').style.color = "Green";
        score++;
        button.focus(); // set focus on the buton because the inputfield is disabled
        guessInput.disabled = true;// disables input field to not let player add a guess
        attempts = 0; // Reset attempts to zero because the player won
        document.getElementById('validate').innerText = "Next Game"; 
        button.removeEventListener('click', playGame); // Remove playGame event listener to read replay() when clicking
        button.addEventListener('click', replay); 

    } else {
        result = "Invalid input! Please enter a number between 1 and 100.";
        guess="";
    
    }

    if (attempts === 10) {
        result = "You have reached the maximum number of attempts. You lose!";
        document.getElementById('result').style.color = "red";
        guessInput.disabled = true;
        button.innerText = "Replay";
        button.focus(); 
        button.addEventListener('click', reloadPage);
    }

    
    guessInput.value = ""; // Clear the input field after each guess
    document.getElementById('previous-guesses').innerText += " " + guess + " "; // Display all previous guesses by using += 
    document.getElementById('result').innerText = result;
    document.getElementById('attempts').innerText = "Failed attempts : " + attempts;
    document.getElementById('score').innerText = "score : " + score;
}

// Function to replay the game when the player wins
function replay() {
    document.getElementById('result').style.color = "black";
    guessInput.disabled = false; 
    guessInput.focus(); 
    attempts = 0; 
    randomNumber = null; // Reset the random number
    generateRandomNumber(); // Generate a new random number for the next round
    document.getElementById('result').innerText = "Result"; 
    document.getElementById('previous-guesses').innerText = "Previous guesses"; 
    document.getElementById('attempts').innerText = "Attempts"; 
    document.getElementById('validate').innerText = "Validate"; 
    document.getElementById('validate').removeEventListener('click', replay);
    document.getElementById('validate').addEventListener('click', playGame); 
}

// Function to reload the page when the player looses
function reloadPage() {
    window.location.reload(); 
}
