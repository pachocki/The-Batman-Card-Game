import {getDiceRollArray,getDicePlaceHolderHtml} from "./diceRoll.js"


function Character(data){
    Object.assign(this,data)

    this.diceArray=getDicePlaceHolderHtml(this.diceCount)
    //Sending RollArray to the Html
    this.getDiceHtml = function(){
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map(function(num){
            return `<div class="dice">${num}</div>`
        }).join(" ")
        }

    this.takeDamage = function(attackScoreArray){
        const totalAttack = attackScoreArray.reduce(function(total,num){return total+num})
        this.health-=totalAttack
        if(this.health<=0){
            this.dead = true
            this.health=0

        }
    }
    

    this.getCharacterHtml = function(){
    //destruction
    const {elementId,model,style,name,health,diceCount,diceArray} = this
    
    const diceHtml= this.getDiceHtml(diceCount)
    
    return `
        <div class="top-card">
            <img class="model" src=${model} alt="" srcset="">
        </div>
        <div class="bottom-card ${style} js-tilt">
            <h1 class="name transform">Name : ${name}</h1>
            <h2 class="health transform">Health : ${health}</h2>
        <div class="dice-container ${style} transform">
            ${diceArray}
        </div>
        </div>
            `
    }
}

export default Character