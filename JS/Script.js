let randomNumber;
let guessInput = document.getElementById("guess");
let result;
let attempts = 0;
let score = 0;

// Function to generate a random number between 1 and 100
function generateRandomNumber() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Function to compare the player's guess with the random number;
function playGame(){    
    let guess = parseInt(guessInput.value); // Getting value from input field
    console.log(randomNumber);

    if (0 < guess && guess < randomNumber) {
        result = "Wrong! your guess was low!";
        attempts++;
    } else if (100 >= guess && guess > randomNumber) {
        result = "Wrong! your guess was high!";
        attempts++;
    } else if (guess === randomNumber) {
        result = "Congratulations! you got it right!";
        score++;
        attempts = 0; // Reset attempts to zero
        randomNumber = null; // Reset the random number
        generateRandomNumber(); // Generate a new random number for the next round
    } else {
        result = "Invalid input! Please enter a number between 1 and 100.";
    
    }
    if (attempts === 10) {
        result = "You have reached the maximum number of attempts. You lose!";
        score = 0;
        generateRandomNumber(); // Generate a new random number for the next round
        document.getElementById('previous-guesses').innerText = "Previous guesses : " ; // Reset previous guesses
        document.getElementById('attempts').innerText; // Reset attempts
        attempts = 0; // Reset attempts to zero
    }
    
    
    document.getElementById('previous-guesses').innerText += " "+ guess + " "; // displaying all previous guesses
    document.getElementById('result').innerText = result;
    document.getElementById('attempts').innerText = "Failed attempts : " + attempts;
    document.getElementById('score').innerText = "The score is " + score;
}

// Call generateRandomNumber function when the page loads
window.onload = generateRandomNumber;

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        playGame();
    }
}
