import {getDiceRollArray,getDicePlaceHolderHtml,getPercentage} from "./diceRoll.js"



function Character(data){
    Object.assign(this,data)
    

    this.diceArray=getDicePlaceHolderHtml(this.diceCount)
    this.maxHealth = this.health
    //Sending RollArray to the Html
    this.getDiceHtml = function(){
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map((num)=>`<div class="dice">${num}</div>`).join("")
        }
        

    this.takeDamage = function(attackScoreArray){
        const totalAttack = attackScoreArray.reduce((total,num)=>total+num)
        this.health-=totalAttack
        if(this.health<=0){
            this.dead = true
            this.health=0

        }
    }
    this.getHealthBarHtml = function () {
        const percent = getPercentage(this.health, this.maxHealth)
        
        return `
        <div class="health-bar-outer">
            <div class="js-tilt health-bar-inner ${percent < 26 ? "danger" : ""} " 
            style="width: ${percent}%;">
            </div>
        </div>`
    }

   


    this.getCharacterHtml = function(){
    //destruction
    const {elementId,model,style,name,health,diceCount,diceArray} = this
    
    const diceHtml= this.getDiceHtml(diceCount)
    const healthBar = this.getHealthBarHtml()
    
    return `
        <div class="top-card">
            <img class="model" src=${model} alt="" srcset="">
        </div>
        <div class="bottom-card ${style} js-tilt">
            <h1 class="name transform">Name : ${name}</h1>
            <h2 class="health transform">Health : ${health}</h2>
            ${healthBar}
        <div class="dice-container ${style} transform">
            ${diceArray}
        </div>
        </div>
            `
    }
}

export default Character