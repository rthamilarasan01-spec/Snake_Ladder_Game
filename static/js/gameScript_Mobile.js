
class snakeLadder{
    constructor(player,card,dice_value){
        this.dice_value = dice_value;
        this.player = player;
        this.player1 = false;
        this.coin = document.createElement('img');
        this.coin.src = player;
        this.coin.style.width = '30px';
        this.coin.style.height = '30px'
        this.container = document.querySelector(card);
        this.container.appendChild(this.coin);

        this.b1 = document.createElement('img');
        this.b1.src = this.coin.src;
        this.bottom = document.querySelector('.bottom');
        this.bottom.append(this.b1);

        this.left1 = document.querySelector('.players.left');
    
        this.gameStart = false;
        this.endGame = false;
        this.diceCount = 0;
        this.marginTopMax = 86;
        this.marginLeftMax = 388;
        this.marginPlusH = 10;
        this.marginPlusV = 500;
        this.movingPixelH = 40;
        this.movingPixelV = 46;
        this.pixel = 'px';

        this.ladderStartH = [330,90,170,290,170,290,170,50];
        this.ladderStartV = [500,454,408,408,270,224,178,178];
        this.ladderEndH = [250,130,250,370,130,290,130,10];
        this.ladderEndV = [408,362,270,270,224,132,86,86];

        this.snakeHeadH = [170,50,90,250,250,290,210,50];
        this.snakeHeadV = [454,270,224,224,132,86,86,86];
        this.snakeTailH = [250,130,50,370,130,330,210,130];
        this.snakeTailV = [500,454,454,408,408,224,178,178];

    }
         
        addLeft(){
            let winner1 = document.createElement('img');
            winner1.src = this.coin.src;
            return winner1;
        }

        gameOver(){
            this.left1.append(this.addLeft());
            this.playerCoin.remove();
            document.getElementById(this.dice_value).innerHTML = `<p style="color:green; font-size:22px;">WIN</p>`
            return true;
        }

        addCoin(){
            this.playerCoin = document.createElement('img');
            this.playerCoin.src = this.player;
            this.playerCoin.style.width = '25px';
            this.playerCoin.style.height = 'auto';
            this.playerCoin.style.position = 'absolute';
            this.playerCoin.style.transition = "left 0.5s linear, top 0.5s linear";
            document.querySelector('.board').append(this.playerCoin);
            this.playerCoin.style.top = this.marginPlusV+this.pixel;
            this.playerCoin.style.left = this.marginPlusH+this.pixel;
        }

        dice(){
            let diceValue = Math.floor(Math.random() * 6) + 1;
            return diceValue;
        }
        
        plusHOne(){
            this.marginPlusH = this.marginPlusH + this.movingPixelH;
            this.playerCoin.style.left = this.marginPlusH + this.pixel;
        }

        minusVOne(){
            this.marginPlusV = this.marginPlusV - this.movingPixelV;
            this.playerCoin.style.top = this.marginPlusV + this.pixel;
        }

        minusHOne(){
            this.marginPlusH = this.marginPlusH - this.movingPixelH;
            this.playerCoin.style.left = this.marginPlusH + this.pixel;
        }

        async checkLadder(){
            for (let i=0; i<this.ladderStartH.length; i++){
                if (this.ladderStartH[i] == this.marginPlusH && this.ladderStartV[i] == this.marginPlusV){
                    
                    ladder.play();
                    document.getElementById('music').pause();
                    this.marginPlusH = this.ladderEndH[i];
                    this.marginPlusV = this.ladderEndV[i];
                    this.playerCoin.style.left = this.marginPlusH + this.pixel;
                    this.playerCoin.style.top = this.marginPlusV + this.pixel;
                    await sleep(2500);
                    document.getElementById('music').play();
                    break;
                }
            }
        }

        checkLast(position){
            if (this.marginPlusH < position && this.marginPlusV == 86){
                return false;
            }
            else{
                return true;
            }
        }

        async checkSnake(){
            for (let i=0; i<this.snakeHeadH.length; i++){
                if (this.snakeHeadH[i] == this.marginPlusH && this.snakeHeadV[i] == this.marginPlusV){
                    
                    snake.play();
                    document.getElementById('music').pause();
                    this.marginPlusH = this.snakeTailH[i];
                    this.marginPlusV = this.snakeTailV[i];
                    this.playerCoin.style.left = this.marginPlusH + this.pixel;
                    this.playerCoin.style.top = this.marginPlusV + this.pixel;
                    await sleep(2500);
                    document.getElementById('music').play();
                    break;
                }
            }
        }


        async rollDice(){
            let diceResult = this.dice();
            document.getElementById(this.dice_value).innerHTML = `<img src="/static/images/${diceResult}face.png" alt="" width="50px">`;
            if (diceResult == 1 && this.gameStart == false){
                this.gameStart = true;
                this.bottom.removeChild(this.b1);
                this.addCoin();
            }
            if (this.gameStart){
                this.diceCount += 1;
                if (diceResult == 1 && this.diceCount != 1){
                    if ([500,408,316,224,132].includes(this.marginPlusV) && this.marginPlusH < 370){
                    this.plusHOne();
                    await new Promise(resolve => {
                    setTimeout(()=>{
                        this.checkLadder();
                        this.checkSnake();
                        resolve();
                    },1000);
                    });
                    }
                    else{
                        if ((this.marginPlusV == 500 && this.marginPlusH == 370) || (this.marginPlusV == 454 && this.marginPlusH == 10) || (this.marginPlusV == 408 && this.marginPlusH == 370) || (this.marginPlusV == 362 && this.marginPlusH ==10) || (this.marginPlusV == 316 && this.marginPlusH ==370) || (this.marginPlusV == 270 && this.marginPlusH ==10) || (this.marginPlusV == 224 && this.marginPlusH == 370) || (this.marginPlusV == 178 && this.marginPlusH ==10) || (this.marginPlusV == 132 && this.marginPlusH ==370))
                    {
                    this.minusVOne();
                    }
                    else{
                    this.minusHOne();
                    await new Promise(resolve => {
                    setTimeout(()=>{
                        this.checkLadder();
                        this.checkSnake();
                        resolve();
                    },1000);
                    });
                    }
                    }
                }
                else if (diceResult == 2){
                    for (let i=0; i<2; i++){
                        if ([500,408,316,224,132].includes(this.marginPlusV) && this.marginPlusH < 370){
        
                            this.plusHOne();
                        }
                        else{
                            if ([454,362,270,178,86].includes(this.marginPlusV) && this.marginPlusH !=10){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 10 && this.marginPlusV == 86){
                                    this.endGame = true;
                                    break;
                                }
                                else{
                                    this.minusVOne();
                                }
                            }
                        }
                    }
                    await new Promise(resolve => {
                    setTimeout(()=>{
                        this.checkLadder();
                        this.checkSnake();
                        resolve();
                    },1000);
                    });
                } 
                else if (diceResult == 3){
                    if (this.checkLast(130)){
                    for (let i=0; i<3; i++){
                        if ([500,408,316,224,132].includes(this.marginPlusV) && this.marginPlusH < 370){
        
                            this.plusHOne();
                        }
                        else{
                            if ([454,362,270,178,86].includes(this.marginPlusV) && this.marginPlusH !=10){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 10 && this.marginPlusV == 86){
                                    this.endGame = true;
                                    break;
                                }
                                else{
                                    this.minusVOne();
                                }
                            }
                        }
                    }
                    await new Promise(resolve => {
                    setTimeout(()=>{
                        this.checkLadder();
                        this.checkSnake();
                        resolve();
                    },1000);
                    });
                }

                }
                else if (diceResult == 4){
                    if (this.checkLast(170)){
                    for (let i=0; i<4; i++){
                        if ([500,408,316,224,132].includes(this.marginPlusV) && this.marginPlusH < 370){
        
                            this.plusHOne();
                        }
                        else{
                            if ([454,362,270,178,86].includes(this.marginPlusV) && this.marginPlusH !=10){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 10 && this.marginPlusV == 86){
                                    this.endGame = true;
                                    break;
                                }
                                else{
                                    this.minusVOne();
                                }
                            }
                        }
                    }
                    await new Promise(resolve => {
                    setTimeout(()=>{
                        this.checkLadder();
                        this.checkSnake();
                        resolve();
                    },1000);
                    });
                }
                }
                else if (diceResult == 5){
                    if (this.checkLast(210)){
                    for (let i=0; i<5; i++){
                        if ([500,408,316,224,132].includes(this.marginPlusV) && this.marginPlusH < 370){
        
                            this.plusHOne();
                        }
                        else{
                            if ([454,362,270,178,86].includes(this.marginPlusV) && this.marginPlusH !=10){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 10 && this.marginPlusV == 86){
                                    this.endGame = true;
                                    break;
                                }
                                else{
                                    this.minusVOne();
                                }
                            }
                        }
                    }
                    await new Promise(resolve => {
                    setTimeout(()=>{
                        this.checkLadder();
                        this.checkSnake();
                        resolve();
                    },1000);
                    });
                }
                }
                else if (diceResult == 6){
                    if (this.checkLast(210)){
                    for (let i=0; i<6; i++){
                        if ([500,408,316,224,132].includes(this.marginPlusV) && this.marginPlusH < 370){
        
                            this.plusHOne();
                        }
                        else{
                            if ([454,362,270,178,86].includes(this.marginPlusV) && this.marginPlusH !=10){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 10 && this.marginPlusV == 86){
                                    this.endGame = true;
                                    break;
                                }
                                else{
                                    this.minusVOne();
                                }
                            }
                        }
                    }
                    await new Promise(resolve => {
                    setTimeout(()=>{
                        this.checkLadder();
                        this.checkSnake();
                        resolve();
                    },1000);
                    });
                }
                }
            }
        }
    async startRollDice(){
        let roll = document.getElementById('roll');

    if (this.marginPlusH != 10 || this.marginPlusV != 86){
        await this.rollDice();
    }

    if ((this.marginPlusH == 10 && this.marginPlusV == 86) && this.gameStart){
        this.endGame = this.gameOver();
    }
    }

}

function gameMenu(){
    let menu = document.createElement('div');
    menu.classList.add('gamemenu');
    menu.style.position = 'absolute';
    menu.style.width = '300px';
    menu.style.height = '380px';
    menu.style.border = '10px solid rgb(121, 34, 34)';
    menu.style.borderRadius = '20px';
    menu.style.borderStyle = 'groove';
    menu.style.backgroundColor = 'bisque';
    menu.style.left = '15%';
    menu.style.top = '20%';
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.justifyContent = 'space-around';
    menu.style.alignItems = 'center';
    menu.style.zIndex = '2';
    document.body.appendChild(menu);

    let playerCount = document.createElement('div');
    playerCount.classList.add('playercount');
    playerCount.style.display = 'flex';
    playerCount.style.flexDirection ='column';
    playerCount.style.alignItems = 'center';
    playerCount.style.justifyContent = 'space-around';
    playerCount.style.gap = '20px';
    menu.appendChild(playerCount);

    let playerCountH3 = document.createElement('h3');
    playerCountH3.innerText = 'Select No. Of Players';
    playerCount.appendChild(playerCountH3);

    let select = document.createElement('select');

    let option1 = document.createElement('option');
    option1.value = '2';
    option1.text = '2 Players';

    let option2 = document.createElement('option');
    option2.value = '3';
    option2.text = '3 Players';

    let option3 = document.createElement('option');
    option3.value = '4';
    option3.text = '4 Players';

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);

    playerCount.appendChild(select);

    let selectPlayer = document.createElement('div');
    selectPlayer.classList.add('selectplayer');
    selectPlayer.style.display = 'flex';
    selectPlayer.style.flexDirection = 'column';
    selectPlayer.style.position = 'relative';
    selectPlayer.style.gap = '20px';
    selectPlayer.style.justifyContent = 'space-around';
    selectPlayer.style.alignItems = 'center';
    menu.appendChild(selectPlayer);

    let selectPlayerH3 = document.createElement('h3');
    selectPlayerH3.textContent = 'Player 1 (You)';
    selectPlayer.appendChild(selectPlayerH3);

    let playerDp = document.createElement('img');
    playerDp.classList.add('playerdp');
    playerDp.src = '/static/images/player1.png';
    playerDp.style.width = '50px';
    selectPlayer.appendChild(playerDp);

    let selectPlayerButton = document.createElement('button');
    selectPlayerButton.classList.add('menu-button');
    selectPlayerButton.style.width = '200px';
    selectPlayerButton.style.padding = '10px';
    selectPlayerButton.style.textAlign = 'center';
    selectPlayerButton.innerText = 'Select Player DP';
    selectPlayerButton.style.background = 'linear-gradient(135deg, #fff3d6, #ffe0b2';
    selectPlayer.appendChild(selectPlayerButton);

    let startGame = document.createElement('button');
    startGame.innerText = 'Start Game';
    startGame.classList.add('menu-button');
    startGame.style.width = '180px';
    startGame.style.padding = '10px';
    startGame.style.textAlign = 'center';
    startGame.style.background = 'linear-gradient(135deg, #fff3d6, #ffe0b2';
    menu.appendChild(startGame);

    let playerGrid = document.createElement('div');
    playerGrid.classList.add('dropdown');
    selectPlayer.appendChild(playerGrid);

    let grid = document.createElement("div");
    grid.classList.add("grid");
    playerGrid.appendChild(grid);

    let items = [
    "/static/images/player1.png",
    "/static/images/player5.png",
    "/static/images/player6.png",
    "/static/images/player7.png",
    "/static/images/player8.png",
    "/static/images/player9.png",
];

items.forEach(src => {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add("item");
    grid.appendChild(img);

    img.addEventListener("click", () => {
        playerDp.src = img.src;
        playerGrid.style.display = "none";
    });
});

selectPlayerButton.addEventListener("click", () => {
    playerGrid.style.display =
        playerGrid.style.display === "block" ? "none" : "block";
});

startGame.addEventListener("click", () => {

        menu.style.display = "none";
    });

    document.getElementById('roll').style.display = 'none';

}

gameMenu();

function tossButton(){
    let btn = document.createElement('button');
    btn.innerText = 'Toss';
    btn.style.fontSize = '30px';
    btn.classList.add('toss','menu-button');
    btn.style.position = 'absolute';
    btn.style.background = 'linear-gradient(135deg, #fff3d6, #ffe0b2)';
    btn.style.top = '50%';
    btn.style.left = '40%';
    btn.style.width = '100px';
    btn.style.height = '100px';
    btn.style.padding = '10px';
    btn.style.borderRadius = '50%';
    btn.style.border = '10px solid rgb(121, 34, 34)';
    btn.style.borderStyle = 'groove';
    btn.style.fontWeight = '600';
    btn.style.zIndex = '1';
    document.body.appendChild(btn);
}
tossButton();

function reStart(){
    window.location.reload();
}

let playerList;
let game;
let game1;
let game2;
let game3;
let ts = document.querySelector('.toss');

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}


ts.addEventListener('click', async ()=> {
    let music = document.createElement('audio');
    music.id = 'music';
    music.src = '/static/audio/game_music.mp3';
    music.loop = 'true';
    document.body.appendChild(music);
    music.play();

    let ladder = document.createElement('audio');
    ladder.src = '/static/audio/ladder.mp3';
    ladder.id = 'ladder';
    document.body.appendChild(ladder);

    let snake = document.createElement('audio');
    snake.src = '/static/audio/snake.mp3';
    snake.id = 'snake';
    document.body.appendChild(snake);

    sound.style.visibility = 'visible';

    let playerdp = document.querySelector('.playerdp');
    let select = document.querySelector('select');
    playerList = Number(select.value);
    let toss = Math.floor(Math.random() * playerList) + 1;
    ts.style.display = 'none';
    game = new snakeLadder(playerdp.src,'.first','dice_value1');
    game1 = new snakeLadder('/static/images/player2.png', '.second','dice_value2');
    if (playerList == 3){
        game2 = new snakeLadder('/static/images/player3.png','.third','dice_value3');
        document.querySelector('.player.three').style.visibility = 'visible';
    }
    if (playerList == 4){
        game2 = new snakeLadder('/static/images/player3.png','.third','dice_value3');
        document.querySelector('.player.three').style.visibility = 'visible';

        game3 = new snakeLadder('/static/images/player4.png','.fourth','dice_value4');
        document.querySelector('.player.four').style.visibility = 'visible';
    }

    switch (toss){
        case 2:
            {
                    document.querySelector('.player.two').style.backgroundColor = 'rgb(41, 246, 41)';
                    await sleep(2500);
                    game1.startRollDice();
                    document.querySelector('.player.two').style.backgroundColor = '';

                    if (playerList == 2){
                        document.querySelector('.player.one').style.backgroundColor = 'rgb(41, 246, 41)';
                        break;
                    }

                    document.querySelector('.player.three').style.backgroundColor = 'rgb(41, 246, 41)';
                    await sleep(2500);
                    game2.startRollDice();
                    document.querySelector('.player.three').style.backgroundColor = '';

                    if (playerList == 3){
                        document.querySelector('.player.one').style.backgroundColor = 'rgb(41, 246, 41)';
                        break;
                    }

                    document.querySelector('.player.four').style.backgroundColor = 'rgb(41, 246, 41)';
                    await sleep(2500);
                    game3.startRollDice();
                    document.querySelector('.player.four').style.backgroundColor = '';
                    document.querySelector('.player.one').style.backgroundColor = 'rgb(41, 246, 41)';
                    break;
            }
            case 3:
                {
                    document.querySelector('.player.three').style.backgroundColor = 'rgb(41, 246, 41)';
                    await sleep(2500);
                    game2.startRollDice();
                    document.querySelector('.player.three').style.backgroundColor = '';

                    if (playerList == 3){
                        document.querySelector('.player.one').style.backgroundColor = 'rgb(41, 246, 41)';
                        break;
                    }

                    document.querySelector('.player.four').style.backgroundColor = 'rgb(41, 246, 41)';
                    await sleep(2500);
                    game3.startRollDice();
                    document.querySelector('.player.four').style.backgroundColor = '';
                    document.querySelector('.player.one').style.backgroundColor = 'rgb(41, 246, 41)';
                    break;
                }
            case 4:
                {
                    document.querySelector('.player.four').style.backgroundColor = 'rgb(41, 246, 41)';
                    await sleep(2500);
                    game3.startRollDice();
                    document.querySelector('.player.four').style.backgroundColor = '';
                    document.querySelector('.player.one').style.backgroundColor = 'rgb(41, 246, 41)';
                    break;
                }
            default:
                {
                    document.querySelector('.player.one').style.backgroundColor = 'rgb(41, 246, 41)';
                    break;
                }
    }
    document.getElementById('roll').style.display = 'inline-block';
});

document.getElementById('roll').addEventListener('click', async ()=> {

        document.getElementById('roll').style.display = 'none';

        await game.startRollDice();
        document.querySelector('.player.one').style.backgroundColor = '';

        if (game.endGame){
        end('You Won ! 🎉');
        win = document.createElement('audio');
        win.src = '/static/audio/win.mp3';
        win.play();
        return;
        }

        if (game1.endGame != true){
        document.querySelector('.player.two').style.backgroundColor = 'rgb(41, 246, 41)';
        document.getElementById('dice_value2').innerHTML = '<img src="/static/images/1f3b2.gif" alt="" width="30px"></img>';
        await sleep(2500);
        await game1.startRollDice();
        document.querySelector('.player.two').style.backgroundColor = '';
        }

     if (playerList == 3 && game2.endGame != true){

        document.querySelector('.player.three').style.backgroundColor = 'rgb(41, 246, 41)';
        document.getElementById('dice_value3').innerHTML = '<img src="/static/images/1f3b2.gif" alt="" width="30px"></img>';
        await sleep(2500);
        await game2.startRollDice();
        document.querySelector('.player.three').style.backgroundColor = '';
    }
    else if (playerList == 4){

        if (game2.endGame != true){
        document.querySelector('.player.three').style.backgroundColor = 'rgb(41, 246, 41)';
        document.getElementById('dice_value3').innerHTML = '<img src="/static/images/1f3b2.gif" alt="" width="30px"></img>';
        await sleep(2500);
        await game2.startRollDice();
        document.querySelector('.player.three').style.backgroundColor = '';
        }

        if (game3.endGame != true){
        document.querySelector('.player.four').style.backgroundColor = 'rgb(41, 246, 41)';
        document.getElementById('dice_value4').innerHTML = '<img src="/static/images/1f3b2.gif" alt="" width="30px"></img>';
        await sleep(2500);
        await game3.startRollDice();
        document.querySelector('.player.four').style.backgroundColor = '';
        }

    }
        document.getElementById('roll').style.display = 'inline-block';
        document.getElementById('dice_value1').innerHTML = '<img src="/static/images/1f3b2.gif" alt="" width="30px"></img>';
        document.querySelector('.player.one').style.backgroundColor = 'rgb(41, 246, 41)';

        
            if (game1.endGame && 
                (playerList < 3 || game2.endGame) && 
                (playerList < 4 || game3.endGame))
                {
                end('You Loose 😞');
                loose = document.createElement('audio');
                loose.src = '/static/audio/loose.mp3';
                loose.play();
            }

});

function end(gameResult){
                let gameOver1 = document.createElement('h1');
                gameOver1.append(gameResult);
                gameOver1.style.background = 'linear-gradient(135deg, #fff3d6, #ffe0b2)';
                gameOver1.style.fontSize = '34px';
                gameOver1.style.position = 'absolute';
                gameOver1.style.top = '300px';
                gameOver1.style.left = '100px';
                gameOver1.style.color = 'green';
                gameOver1.style.padding = '10px';
                gameOver1.style.zIndex = '9999';
                document.body.append(gameOver1);
                document.getElementById('roll').style.display = 'none';
                document.getElementById('music').remove();
        }

let sound = document.querySelector('.sound');
sound.style.visibility = 'hidden';
let playSound = true;
function volume(){
    sound.innerHTML = `<p style="font-size: 34px; background-color: aliceblue; 
                       border-radius: 50%; width: 45px; height: 45px; padding: 5px; 
                       display: flex; align-items: center; justify-content: center">🔊</p>`;
    document.getElementById('music').muted = false;
    document.getElementById('ladder').muted = false;
    document.getElementById('snake').muted = false;
    playSound = true;
}
function mute(){
    sound.innerHTML = `<p style="font-size: 34px; background-color: aliceblue; 
                       border-radius: 50%; width: 45px; height: 45px; padding: 5px;
                       display: flex; align-items: center; justify-content: center">🔇</p>`;
    document.getElementById('music').muted = true;
    document.getElementById('ladder').muted = true;
    document.getElementById('snake').muted = true;
    playSound = false;
}


sound.addEventListener('click', ()=> {
    playSound ? mute() : volume();
})

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

document.querySelectorAll("img").forEach(img => {
    img.draggable = false;
});

document.addEventListener("selectstart", function(e) {
    e.preventDefault();
});