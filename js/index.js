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

let monstersArray = ["scarecrow","pingwin","joker"]

function getNewMonster(){
    const nextMonster = characterData[monstersArray.shift()]
    return nextMonster ? new Character(nextMonster) : {}
}

function attack(){
    batman.getDiceHtml()
    monster.getDiceHtml()
    batman.takeDamage(monster.currentDiceScore)
    monster.takeDamage(batman.currentDiceScore)
    render()
    playAudio("music/punch.mp3")
    if(batman.dead){
        endGame()
    }
    else if(monster.dead){
        if(monstersArray.length > 0){
            monster = getNewMonster()
            render()
        }
        else{
            endGame()
        }
    }

}
function endGame(){
    const batmanWin =batman.health>0
    const renderModel = batman.health===0 && monster.health===0 ? "./images/batman-joker.jpg":
    batmanWin ? batman.model:
    monster.model 
    const renderText = batman.health>0 ? "Batman":
    monster.health>0 ? "Joker":
    "No one"
    playAudio("./music/batman-theme.mp3")
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
    <div id="slide"><img src="./images/bat-silhouette.png" alt="logo" class="logo-btn"></div>
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
    document.getElementById(monster.elementId).innerHTML=monster.getCharacterHtml()
    playAudio("./music/batman-theme.mp3")
    
}

document.getElementById("atack").addEventListener("click" , attack)
const batmanSound = new Audio('./music/batman.mp3');
const jokerSound = new Audio('./music/joker.mp3');
const bodyMusic = new Audio('./music/batman-game-music.mp3')
document.querySelector("#hero"). addEventListener ("mouseover", function() {
    batmanSound.play();
});
document.querySelector("#monster"). addEventListener ("mouseover", function() {
    jokerSound.play();
    
});
document.querySelector("body").addEventListener ("mouseover", function() {
    bodyMusic.play();
    
});
const batman = new Character(characterData.hero)
let monster = getNewMonster()
render()



