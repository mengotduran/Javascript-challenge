  //Challange 1; Your Age in Days.
 
function ageInDays() {
    var birthYear = prompt('what year where You Born... Good Friend?'); 
    var ageInDayss = (2020 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are' + ageInDayss + 'Days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

//Challange 2: generate Cat
const url = "https://api.thecatapi.com/v1/images/search"
const button = document.getElementById('cat-generator');
const section = document.getElementById('flex-cat-gen');

button.addEventListener("click", getRandomCats);
 randomCatPhoto = (json) => {
    let photo = json[0].url

    section.classList.add('cats')
    let image = document.createElement('img');
    image.src=photo;
    image.alt = photo;
    section.appendChild(image);
 }

 async function getRandomCats() {
    section.innerHTML = ""
    try {
        const response = await fetch(url)
        const json = await response.json()
        console.log('JSON:', json);
        return randomCatPhoto(json)
    } catch (error){
        console.log("this is an error")
        console.log(error)
    }
 }


  
// Challange 3: Rock, Paper, Scissors.
function rpsGame(yourChoice) {
    console.log(yourChoice); 
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('computer choice:', botChoice);
    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost | bot won 
    console.log(results);
    message = finalMessage(results); // '{message: 'you Won!, 'color': 'green'}
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock':1, 'paper':0.5, 'scissors':0},
        'scissors': {'paper':1, 'scissors':0.5, 'rock':0}

    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];  
    var computerScore = rpsDatabase[computerChoice][yourChoice]; 

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    } else {
        return {'message': 'you won', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
      }
      //lets remove all the images
      document.getElementById('rock').remove();
      document.getElementById('paper').remove();
      document.getElementById('scissors').remove();

      var humanDiv = document.createElement('div');
      var botDiv = document.createElement('div');
      var messageDiv = document.createElement('div');

      humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1);'>"
      messageDiv.innerHTML = "<h1 style='color: " +finalMessage['color'] + "; font-size:60px; padding:30px; '>" + finalMessage['message'] + "</h1>"
      botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(243, 38, 24, 1);'>"

      document.getElementById('flex-box-rps-div').appendChild(humanDiv);
      document.getElementById('flex-box-rps-div').appendChild(messageDiv); 
      document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

//Challange 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

// console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed(); 
    }else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i = 0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

// Challange 5: Blackjack
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box','score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box','score': 0},
    'cards': [ '2', '3', '4','5', '6', '7', '8', '9', '10', 'k', 'q', 'a', 'j'], 
    'cardsMap': { '2':2, '3':3, '4':4,'5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'k':10, 'q':10, 'j':10, 'a':[1,11]},
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function blackjackHit() {
    let card = randomCard;
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
}

function showCard(card, activePlayer) {
    let cardImage = document.createElement('img');
    cardImage.src = 'images/Game/j.png';
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();

}

function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0; i < yourImages.length; i++)
    {
        yourImages[i].remove();
    }

    for (i=0; i < dealerImages.length; i++)
    {
        dealerImages[i].remove();
    }
} 

function updateScore(card, activePlayer) {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function updateScore(card, activePlayer) {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function showScore(activePlayer) {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']; 
}