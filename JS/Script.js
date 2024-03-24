// Initialize variables
let randomNumber;
let guessInput = document.getElementById("guess");
let result;
let attempts = 0;
let score = 0;
let button = document.getElementById('validate');
guess = parseFloat(guess);

// Call generateRandomNumber function when the page loads
onload = generateRandomNumber;
guessInput.focus();  //When the page loads, set the focus on the input field named guessInput,

// Event listener for key presses
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
    let guess = Number(guessInput.value); // Getting value from input field (empty "" is now redred as 0 instead of NaN)
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
        button.focus(); // set focus on the buton when the inputfield is disabled
        guessInput.disabled = true;// disables input field
        attempts = 0; // Reset attempts to zero
        document.getElementById('validate').innerText = "Next Game"; 
        button.removeEventListener('click', playGame); // Remove playGame event listener
        button.addEventListener('click', replay); // Add replay event listener

    } else {
        result = "Invalid input! Please enter a number between 1 and 100.";
        attempts++; // Increment attempts if the input is invalid
    }

    if (attempts === 10) {
        result = "You have reached the maximum number of attempts. You lose!";
        document.getElementById('result').style.color = "red";
        guessInput.disabled = true;
        button.innerText = "Replay";
        button.focus(); // set focus on the buton when the inputfield is disabled
        button.addEventListener('click', reloadPage);
    }

    
    guessInput.value = ""; // Clear the input field after each guess
    document.getElementById('previous-guesses').innerText += " " + guess + " "; // Display all previous guesses
    document.getElementById('result').innerText = result;
    document.getElementById('attempts').innerText = "Failed attempts : " + attempts;
    document.getElementById('score').innerText = "score : " + score;
}

// Function to Next Game
function replay() {
    document.getElementById('result').style.color = "black";
    guessInput.disabled = false; // enables input field
    attempts = 0; // Reset attempts to zero
    randomNumber = null; // Reset the random number
    generateRandomNumber(); // Generate a new random number for the next round
    document.getElementById('result').innerText = "Result"; // Reset result
    document.getElementById('previous-guesses').innerText = "Previous guesses"; // Clear previous guesses
    document.getElementById('attempts').innerText = "Attempts"; // Reset attempts display
    document.getElementById('validate').innerText = "Validate"; // Change button text back to "Validate"
    document.getElementById('validate').removeEventListener('click', replay); // Remove replay event listener
    document.getElementById('validate').addEventListener('click', playGame); // Add playGame event listener
}

// Function to reload the page
function reloadPage() {
    window.location.reload(); // Reload the page
}
