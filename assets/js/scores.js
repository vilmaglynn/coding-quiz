var clearScoresButton = document.getElementById('clear');

document.addEventListener('DOMContentLoaded', function () {
	// Get the high scores from local storage
	var highScores = JSON.parse(localStorage.getItem('scores')) || [];
  
	// Sort the high scores by score in descending order
	highScores.sort(function (a, b) {
	  return b.score - a.score;
	});
  
	// Display the high scores in the HTML
	var highScoresList = document.getElementById('highScoresList');
  
	highScores.forEach(function (score) {
	  var li = document.createElement('li');
	  li.textContent = score.initials + ': ' + score.score;
	  highScoresList.appendChild(li);
	});



  // Event listener for the "Clear Scores" button
  clearScoresButton.addEventListener('click', function () {
    clearHighScores();
    // Refresh the page or update the high scores display 
    highScoresList.innerHTML = '<p>High scores cleared!</p>';
  });

  function clearHighScores() {
    // Clear the high scores from local storage
    localStorage.removeItem('scores');
  }
  });
