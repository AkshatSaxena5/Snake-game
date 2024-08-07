//game constants and variables
let inputDir={x:0,y:0};
const foodSound=new Audio("food.mp3");
const gameOverSound=new Audio("gameover.wav");
const moveSound=new Audio("direction.wav");
const musicSound=new Audio("backgroundmusic.mp3");
let speed=10;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7};
//game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(sarr){
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0){
        return true;
    }
}
function gameEngine(){
    //updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over. Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }
    //if you have eaten the food increment the score and regenerate the food
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="HiScore: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    //moving the snake
    for (let i=snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //displaying the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //displaying the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//main logic starts here
musicSound.play();
let hiscore=localStorage.getItem("hiscore");
if(hiscore==null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="HiScore: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};  //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})