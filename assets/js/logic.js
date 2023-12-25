// Wait for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
	// Get the necessary HTML elements
	var startBtn = document.getElementById('start');
	var questionTitle = document.getElementById('question-title');
	var choicesContainer = document.getElementById('choices');
	var timeElement = document.getElementById('time');
	var finalScoreElement = document.getElementById('final-score');
	var initialsInput = document.getElementById('initials');
	var submitBtn = document.getElementById('submit');
	var startScreen = document.getElementById('start-screen');
	var questionsScreen = document.getElementById('questions');
	var endScreen = document.getElementById('end-screen');
	var feedbackElement = document.getElementById('feedback');
  
	// Quiz state variables
	var currentQuestionIndex = 0;
	var timeLeft = 60; // Initial time in seconds
	var timer;
  
	// Event listener for the start button
	startBtn.addEventListener('click', startQuiz);
  
	// Event listener for answer buttons (delegated to the choices container)
	choicesContainer.addEventListener('click', function (event) {
	  if (event.target.matches('button')) {
		checkAnswer(event.target.textContent);
	  }
	});
  
	// Event listener for the submit button on the end screen
	submitBtn.addEventListener('click', function () {
	  saveScore();
	});
  
	// Array to store quiz questions (assumed to be defined in questions.js)
	var quizQuestions = getQuizQuestions();
  
	function startQuiz() {
	  // Hide the start screen and show the questions screen
	  startScreen.classList.add('hide');
	  questionsScreen.classList.remove('hide');
	
  
	  // Start the timer
	  startTimer();
  
	  // Display the first question
	  displayQuestion();
	}
  
	function displayQuestion() {
	  var currentQuestion = quizQuestions[currentQuestionIndex];
  
	  // Display the question title
	  questionTitle.textContent = currentQuestion.question;
  
	  // Clear previous choices
	  choicesContainer.innerHTML = '';
  
	  // Display answer choices
	  currentQuestion.choices.forEach(function (choice) {
		var choiceBtn = document.createElement('button');
		choiceBtn.textContent = choice;
		choicesContainer.appendChild(choiceBtn);
	  });
	}
  
	function checkAnswer(selectedChoice) {
	  var currentQuestion = quizQuestions[currentQuestionIndex];
  
	  // Check if the selected choice is correct
	  if (selectedChoice === currentQuestion.correctAnswer) {
		// Correct answer, move to the next question
		showFeedback('Correct!', 'green');
		currentQuestionIndex++;
		if (currentQuestionIndex < quizQuestions.length) {
		  // Display the next question after a short delay
		  setTimeout(displayQuestion, 1000);
		} else {
		  // End the quiz if all questions are answered
		  endQuiz();
		}
	  } else {
		// Incorrect answer, subtract time from the clock
		showFeedback('Wrong!', 'red');
		timeLeft -= 10; // You can adjust the penalty time as needed
		currentQuestionIndex++;
		// Check if time has run out
		if (timeLeft <= 0) {
		  endQuiz();
		}
	  }
	}
  
	function startTimer() {
	  // Update the timer every second
	  timer = setInterval(function () {
		timeLeft--;
		timeElement.textContent = timeLeft;
  
		// Check if time has run out
		if (timeLeft <= 0) {
		  endQuiz();
		}
	  }, 1000);
	}
  
	function endQuiz() {
	  // Stop the timer
	  clearInterval(timer);
  
	  // Hide the questions screen and show the end screen
	  questionsScreen.classList.add('hide');
	  endScreen.classList.remove('hide');
  
	  // Display the final score
	  finalScoreElement.textContent = timeLeft;
	}
  
	function showFeedback(message, color) {
	  feedbackElement.textContent = message;
	  feedbackElement.style.color = color;
	  feedbackElement.classList.remove('hide');
  
	  // Hide the feedback after a short delay
	  setTimeout(function () {
		feedbackElement.classList.add('hide');
	  }, 1000);
	}
  
	function saveScore() {
		var initials = initialsInput.value.trim();

		// Validate initials
		if (initials === '') {
		  alert('Please enter your initials.');
		  return;
		}
	  
		// Get the existing scores from local storage or initialize an empty array
		var scores = JSON.parse(localStorage.getItem('scores')) || [];
	  
		// Add the current score to the array
		scores.push({ initials: initials, score: timeLeft });
	  
		// Save the updated scores array back to local storage
		localStorage.setItem('scores', JSON.stringify(scores));
	  
		// Optional: Display a confirmation message to the user
		alert('Score saved! Initials: ' + initials + ', Score: ' + timeLeft);
	  }
  });
