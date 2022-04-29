//Js tilt Library
$('.js-tilt').tilt({
    glare: true,
    maxGlare: .5,
    scale: 1.1
})


//Batman Card Game 

import characterData from "./data.js"
import Character from "./Character.js"

function playAudio(url) {
    new Audio(url).play();
  }


function attack(){
    batman.getDiceHtml()
    joker.getDiceHtml()
    batman.takeDamage(joker.currentDiceScore)
    joker.takeDamage(batman.currentDiceScore)
    render()
    playAudio("music/punch.mp3")
    if(batman.dead || joker.dead ){
        endGame()
    }
}
function endGame(){
    const batmanWin =batman.health>0
    const renderModel = batman.health===0 && joker.health===0 ? "No victourious all are dead":
    batmanWin ? batman.model:
    joker.model 
    const renderText = batman.health>0 ? "Batman":
    "Joker"

    document.body.innerHTML=

    `<div class="end-game">
<div class="col1">
    <h1>${renderText}</h1>
</div>
<div class="col2">
    <img src="${renderModel}" alt="" class="winner">
</div>
<div class="col3">
    <h1>Win !</h1>
    <a href="game.html" class="button" id="button-3">
    <div id="slide"><img src="/images/bat-silhouette.png" alt="logo" class="logo-btn"></div>
    <p class="start-game">Back !</p>
</a>
</div>
    <video src="./video/Game-background.mp4" autoplay muted loop type="mp4"></video>
<audio autoplay loop>
    <source src="music/batman_theme.mp3"  type="audio/mpeg">
</audio>
</div>`

}

function render(){
    document.getElementById(batman.elementId).innerHTML=batman.getCharacterHtml()
    document.getElementById(joker.elementId).innerHTML=joker.getCharacterHtml()
    

}

document.getElementById("atack").addEventListener("click" , attack)
const batman = new Character(characterData.hero)
const joker = new Character(characterData.monster)
const batmanSound = new Audio('./music/batman.mp3');
const jokerSound = new Audio('./music/joker.mp3');
document.querySelector("#hero"). addEventListener ("mouseover", function() {
    batmanSound.play();
});
document.querySelector("#monster"). addEventListener ("mouseover", function() {
    jokerSound.play();
    
});
render()



