// select elements from the DOM
const startButton = document.querySelector('#start-button');
const quizSection = document.querySelector('#quiz');
const gameOverSection = document.querySelector('#game-over');
const scoreDisplay = document.querySelector('#score');
const initialsInput = document.querySelector('#initials');
const timerDisplay = document.querySelector('#timer');

// add a click event listener to the start button
startButton.addEventListener('click', startQuiz);

// set up variables
let timerInterval;
let timer = 120; // in seconds
let currentQuestionIndex = 0;
let score = 0;

// define the quiz questions and answers
const questions = [
    {
        question: 'What is the difference between "undefined" and "null" in JavaScript?',
        answers: ['"Undefined" and "null" are the same in JavaScript.', '"Undefined" represents no value or no object, while "null" means a variable has been declared but has not yet been assigned a value.', 'There is no difference between "undefined" and "null" in JavaScript, "Undefined" means a variable has been declared but has not yet been assigned a value, while "null" is an assignment value that represents no value or no object.'],
        correctAnswerIndex: 3
    },
    {
        question: 'What is a closure in JavaScript?',
        answers: ['A closure is a function that has access to its parent function scope even after the parent function has closed.', 'A closure is a function that has access to global scope.', 'A closure is a function that is defined inside another function.', 'A closure is a variable that is declared outside a function.'],
        correctAnswerIndex: 0
        },
        {
        question: 'What is event bubbling in JavaScript?',
        answers: ['Event bubbling is the process where an event starts at the most specific element and moves up through its ancestors in the DOM tree.', 'Event bubbling is the process where an event starts at the least specific element and moves down through its children in the DOM tree.', 'Event bubbling is the process where an event is triggered multiple times.', 'Event bubbling is the process where an event is not triggered at all.'],
        correctAnswerIndex: 0
        },
    {
        question: 'Which of the following is a valid way to add a new element to the end of an array in JavaScript?',
        answers: ['myArray.push(newElement)', 'myArray.unshift(newElement)', 'myArray.concat(newElement)', 'myArray.splice(myArray.length, 0, newElement)'],
        correctAnswerIndex: 0
    },
    {
        question: 'What is the difference between "const" and "let" in JavaScript?',
        answers: ['"const" is used to declare a constant variable whose value cannot be changed, while "let" is used to declare a block-scoped variable whose value can be changed.', '"const" is used to declare a block-scoped variable whose value can be changed, while "let" is used to declare a constant variable whose value cannot be changed.', '"const" and "let" are the same in JavaScript.', 'There is no difference between "const" and "let" in JavaScript.'],
        correctAnswerIndex: 0
        }
     ];

function startQuiz() {
    // hide the start screen
    document.querySelector('#start-screen').style.display = 'none';
    // show the quiz section
    quizSection.style.display = 'block';
    // start the timer
    // Set a variable to hold the interval ID returned by setInterval
    timerInterval = setInterval(function () {
        // Decrement the timer variable by 1
        timer--;
        // Update the text content of the timerDisplay element to display the updated timer value
        timerDisplay.textContent = `Time: ${timer}`;
        // If the timer reaches 0 or below, stop the interval and call the endGame function
        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);

    // present the first question
    presentQuestion();
}

function presentQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    // get the current question from the questions array
    document.querySelector('#quiz h2').textContent = `Question ${currentQuestionIndex + 1}:`;
    // update the question number in the DOM
    document.querySelector('#quiz p').textContent = currentQuestion.question;
    // update the question text in the DOM
    const answerButtons = document.querySelectorAll('#quiz button');
    // get all answer buttons from the DOM
    answerButtons.forEach((button, i) => {
        button.textContent = currentQuestion.answers[i];
        button.dataset.index = button.getAttribute("data-ans");
        // set the text for each answer button
        button.removeEventListener('click', answerButtonClickHandler);
        // remove the click event listener for each button
        button.addEventListener('click', answerButtonClickHandler);
        // add the click event listener for each button
    });
}


function answerButtonClickHandler() {
    const isCorrect = checkAnswer(this.dataset.index); // check if the clicked answer is correct
    if (isCorrect) {
        score += 10; // if the answer is correct, add 10 points to the score
    } else {
        subtractTime(); // if the answer is incorrect, subtract 10 seconds from the timer
        displayMessage('Incorrect!', 1000); // display an "Incorrect!" message for 1 second
    }
    currentQuestionIndex++; // move on to the next question
    if (currentQuestionIndex < questions.length) {
        presentQuestion(); // if there are more questions, present the next question
    } else {
        endGame(); // if all questions have been answered, end the game
    }
}

function displayMessage(message, duration) {
    // Create a div element to display the message
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.bottom = '20px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.padding = '10px';
    messageDiv.style.backgroundColor = 'red';
    messageDiv.style.color = 'white';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.textAlign = 'center';

    // Append the div to the body
    document.body.appendChild(messageDiv);

    // Remove the div after the specified duration
    setTimeout(() => {
        messageDiv.remove();
    }, duration);
}


// This function checks if the selected answer is correct.
function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex]; // get the current question
    //return answer === currentQuestion.correctAnswerIndex; // check if the selected answer index is equal to the correct answer index
    if (parseInt(answer) === currentQuestion.correctAnswerIndex) {
        return true;
    } else {
        return false;
    }
}

// This function subtracts 10 seconds from the timer.
function subtractTime() {
    timer -= 10; // subtract 10 seconds from the timer
    timerDisplay.textContent = `Time: ${timer}`; // update the timer display in the DOM
}

// This function ends the game and displays the game over screen.
function endGame() {
    clearInterval(timerInterval); // stop the timer
    quizSection.style.display = 'none'; // hide the quiz section
    gameOverSection.style.display = 'block'; // show the game over section
    scoreDisplay.textContent = score; // display the final score
    // add a submit event listener to the form
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        const initials = initialsInput.value.trim().toUpperCase(); // get the initials input and convert to uppercase
        // validate the initials input
        if (initials.length > 0 && initials.length <= 3) {
            // save the score and initials to local storage
            const scores = JSON.parse(localStorage.getItem('scores')) || [];
            scores.push({ initials, score });
            localStorage.setItem('scores', JSON.stringify(scores));
            // redirect to the high scores page
            window.location.href = 'highscore.html';
        }
    });
}

function saveScore(initials, score) {
    // Get existing scores from local storage, or create an empty array if none exist
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Add the new score to the array
    scores.push({ initials, score });

    // Sort the scores array in descending order of score
    scores.sort((a, b) => b.score - a.score);

    // Save the scores back to local storage
    localStorage.setItem('scores', JSON.stringify(scores));
}


// Select the "High Scores" button from the DOM
const highScoresButton = document.querySelector('#high-scores-button');

// Add a click event listener to the "High Scores" button
highScoresButton.addEventListener('click', () => {
    window.location.href = 'highscore.html';
});

