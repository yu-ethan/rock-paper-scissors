const CHOICES = ["rock", "paper", "scissors"];
const titleMsg = document.querySelector('#title-msg');
const roundNumber = document.querySelector("#round-num");
const compImg = document.querySelector('#comp-img');
const userScore = document.querySelector('#player-score');
const compScore = document.querySelector('#computer-score');
const buttons = document.querySelectorAll('.playerbutton');
const container = document.querySelector('#game-container');
const roundMsg = document.createElement('div');
const compMove = document.querySelector('#comp-move-text');
const resetButton = document.querySelector('#reset');
const scoreResult = document.createElement('div');
let roundNum = 0;
let playerScore = 0;
let computerScore = 0;
let playerChoice = '';
let winningMsg;
roundMsg.setAttribute('id', 'roundMsg');
scoreResult.setAttribute('id', 'scoreResult');

function reset(){
    roundNum = 0;
    playerScore = 0;
    computerScore = 0;
    playerChoice = '';
    titleMsg.textContent = "ROCK, PAPER, SCISSORS";
    roundNumber.textContent = roundNum;
    userScore.textContent = playerScore;
    compScore.textContent = computerScore;
    compImg.src = "https://i.dlpng.com/static/png/6732904_preview.png"; // reset back to question mark
    if(document.contains(roundMsg)){
        roundMsg.remove();
    }
    if(document.contains(scoreResult)){
        scoreResult.remove();
    }
    buttons.forEach((button) => {
        button.disabled = false;
    });
    removeClasses();
}

function removeClasses(){
    if(document.body.classList.contains('winner')){
        document.body.classList.remove('winner');
    }
    if(document.body.classList.contains('loser')){
        document.body.classList.remove('loser');
    }
}


function computerPlay(){
    return CHOICES[Math.floor(Math.random()*CHOICES.length)]
}

function playRound(playerSelection, computerSelection){
    if(playerSelection == computerSelection){
        winningMsg = "This round was a tie.";
    }
    else if(playerSelection == "rock"){
        if(computerSelection == "paper"){
            winningMsg = `You lost; ${computerSelection} beats ${playerSelection}.`;
            computerScore++;
        }
        else{
            winningMsg = `You won; ${playerSelection} beats ${computerSelection}.`;
            playerScore++;
        }
    }
    else if(playerSelection == "paper"){
        if(computerSelection == "scissors"){
            winningMsg = `You lost; ${computerSelection} beats ${playerSelection}.`;
            computerScore++;
        }
        else{
            winningMsg = `You won; ${playerSelection} beats ${computerSelection}.`;
            playerScore++;
        }
    }
    else if(playerSelection == "scissors"){
        if(computerSelection == "rock"){
            winningMsg = `You lost; ${computerSelection} beats ${playerSelection}.`;
            computerScore++;
        }
        else{
            winningMsg = `You won; ${playerSelection} beats ${computerSelection}.`;
            playerScore++;
        }
    }
    else{
        winningMsg = "Something went terribly wrong";
    }

    roundNum++;
    roundNumber.textContent = roundNum;
    computerImgSelector(computerSelection);
    compMove.textContent = `Computer selected: ${computerSelection}!`;
    userScore.textContent = playerScore;
    compScore.textContent = computerScore;
    roundMsg.textContent = winningMsg;
    container.appendChild(roundMsg);
    if(roundNum == 5){
        buttons.forEach((button) => {
            button.disabled = true;
        })
        gameOver();
    }
}

function gameOver(){
    let resultMsg;
    if(playerScore > computerScore){
        resultMsg = `You won the game! ${playerScore} - ${computerScore}!`;
        document.body.classList.add('winner');
    }
    else if(playerScore == computerScore){
        resultMsg = `You tied the game! ${playerScore} - ${computerScore}!`;
    }
    else {
        resultMsg = `You lost the game! ${computerScore} - ${playerScore}!`;
        document.body.classList.add('loser');
    }
    scoreResult.textContent = resultMsg;
    titleMsg.textContent = "GAME OVER";
    container.appendChild(scoreResult);
}

function computerImgSelector(computerSelection){
    if(computerSelection == 'rock'){
        compImg.src = 'https://icon-library.com/images/rock-paper-scissors-icon/rock-paper-scissors-icon-14.jpg';
    }
    else if(computerSelection == 'paper'){
        compImg.src = 'https://library.kissclipart.com/20180918/aoq/kissclipart-papel-higienico-icono-clipart-paper-computer-icons-fd00b8f5bccd3074.png';
    }
    else{
        compImg.src = 'https://www.jing.fm/clipimg/full/289-2896724_cutting-free-clipart-scissors.png';
    }
}

reset();


buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        playerSelection = button.id;
        playRound(playerSelection, computerPlay());
    });
});

resetButton.addEventListener('click', () => {
    reset();
});