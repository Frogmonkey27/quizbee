
const highScoresList = document.querySelector('#high-scores-list');
const clearScoresButton = document.querySelector('#clear-scores');
const goBackButton = document.querySelector('#go-back');

const highScores = JSON.parse(localStorage.getItem('scores')) || [];

highScores.forEach((score, index) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
  highScoresList.appendChild(listItem);
});

clearScoresButton.addEventListener('click', () => {
  localStorage.removeItem('scores');
  highScoresList.innerHTML = '';
});

goBackButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});