
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
        this.marginTopMax = 23;
        this.marginLeftMax = 1040;
        this.marginPlusH = 140;
        this.marginPlusV = 455;
        this.movingPixelH = 100;
        this.movingPixelV = 48;
        this.pixel = 'px';

        this.ladderStartH = [840,340,640,940,540,540,840,240];
        this.ladderStartV = [455,407,359,359,215,167,167,119];
        this.ladderEndH = [740,440,740,1040,440,440,840,140];
        this.ladderEndV = [359,311,215,215,167,23,71,23];

        this.snakeHeadH = [540,240,340,740,740,840,640,240];
        this.snakeHeadV = [407,215,167,167,71,23,23,23];
        this.snakeTailH = [740,440,240,1040,540,940,640,340];
        this.snakeTailV = [455,407,407,359,359,167,119,119];

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
            // this.gameStart = false;
            // let w1 = document.getElementById('roll');
            // w1.remove();
            return true;
        }

        addCoin(){
            this.playerCoin = document.createElement('img');
            this.playerCoin.src = this.player;
            this.playerCoin.style.width = '30px';
            this.playerCoin.style.position = 'absolute';
            this.playerCoin.style.transition = "left 0.5s linear, top 0.5s linear";
            document.body.append(this.playerCoin);
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
                    document.getElementById('ladder').play();
                    document.getElementById('music').pause();
                    this.marginPlusH = this.ladderEndH[i];
                    this.marginPlusV = this.ladderEndV[i];
                    this.playerCoin.style.left = this.marginPlusH + this.pixel;
                    this.playerCoin.style.top = this.marginPlusV + this.pixel;
                    await sleep(3000);
                    document.getElementById('music').play();
                    break;
                }
            }
        }

        checkLast(position){
            if (this.marginPlusH < position && this.marginPlusV == 23){
                return false;
            }
            else{
                return true;
            }
        }

         async checkSnake(){
            for (let i=0; i<this.snakeHeadH.length; i++){
                if (this.snakeHeadH[i] == this.marginPlusH && this.snakeHeadV[i] == this.marginPlusV){
                    document.getElementById('snake').play();
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
            let diceResult = this.dice()
            document.getElementById(this.dice_value).innerHTML = `<img src="/static/images/${diceResult}face.png" alt="" width="50px">`;
            if (diceResult == 1 && this.gameStart == false){
                this.gameStart = true;
                this.bottom.removeChild(this.b1);
                this.addCoin();
            }
            if (this.gameStart){
                this.diceCount += 1;
                if (diceResult == 1 && this.diceCount != 1){
                    if ([455,359,263,167,71].includes(this.marginPlusV) && this.marginPlusH < 1040){
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
                        if ((this.marginPlusV == 455 && this.marginPlusH == 1040) || (this.marginPlusV == 407 && this.marginPlusH == 140) || (this.marginPlusV == 359 && this.marginPlusH ==1040) || (this.marginPlusV == 311 && this.marginPlusH ==140) || (this.marginPlusV == 263 && this.marginPlusH ==1040) || (this.marginPlusV == 215 && this.marginPlusH ==140) || (this.marginPlusV == 167 && this.marginPlusH ==1040) || (this.marginPlusV == 119 && this.marginPlusH ==140) || (this.marginPlusV == 71 && this.marginPlusH ==1040))
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
                        if ([455,359,263,167,71].includes(this.marginPlusV) && this.marginPlusH < 1040){
        
                            this.plusHOne();
                        }
                        else{
                            if ([407,311,215,119,23].includes(this.marginPlusV) && this.marginPlusH !=140){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 140 && this.marginPlusV == 23){
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
                    if (this.checkLast(440)){
                    for (let i=0; i<3; i++){
                        if ([455,359,263,167,71].includes(this.marginPlusV) && this.marginPlusH < 1040){
        
                            this.plusHOne();
                        }
                        else{
                            if ([407,311,215,119,23].includes(this.marginPlusV) && this.marginPlusH !=140){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 140 && this.marginPlusV == 23){
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
                    if (this.checkLast(540)){
                    for (let i=0; i<4; i++){
                        if ([455,359,263,167,71].includes(this.marginPlusV) && this.marginPlusH < 1040){
        
                            this.plusHOne();
                        }
                        else{
                            if ([407,311,215,119,23].includes(this.marginPlusV) && this.marginPlusH !=140){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 140 && this.marginPlusV == 23){
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
                    if (this.checkLast(640)){
                    for (let i=0; i<5; i++){
                        if ([455,359,263,167,71].includes(this.marginPlusV) && this.marginPlusH < 1040){
        
                            this.plusHOne();
                        }
                        else{
                            if ([407,311,215,119,23].includes(this.marginPlusV) && this.marginPlusH !=140){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 140 && this.marginPlusV == 23){
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
                    if (this.checkLast(640)){
                    for (let i=0; i<6; i++){
                        if ([455,359,263,167,71].includes(this.marginPlusV) && this.marginPlusH < 1040){
        
                            this.plusHOne();
                        }
                        else{
                            if ([407,311,215,119,23].includes(this.marginPlusV) && this.marginPlusH !=140){
                                this.minusHOne();
            
                            }
                            else{
                                if (this.marginPlusH == 140 && this.marginPlusV == 23){
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

    if (this.marginPlusH != 140 || this.marginPlusV != 23){
        await this.rollDice();
    }

    if ((this.marginPlusH == 140 && this.marginPlusV == 23) && this.gameStart){
        this.endGame = this.gameOver();
    }
    }

}

function gameMenu(){
    let menu = document.createElement('div');
    menu.classList.add('gamemenu');
    menu.style.position = 'absolute';
    menu.style.width = '400px';
    menu.style.height = '380px';
    menu.style.border = '10px solid rgb(121, 34, 34)';
    menu.style.borderRadius = '20px';
    menu.style.borderStyle = 'groove';
    menu.style.backgroundColor = 'bisque';
    menu.style.left = '300px';
    menu.style.top = '100px';
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
    "/static/images/player2.png",
    "/static/images/player3.png",
    "/static/images/player4.png",
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
    btn.classList.add('toss','menu-button');
    btn.style.position = 'absolute';
    btn.style.background = 'linear-gradient(135deg, #fff3d6, #ffe0b2';
    btn.style.top = '350px';
    btn.style.left = '310px';
    btn.style.width = '350px';
    btn.style.padding = '10px';
    btn.borderRadius = '8px';
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

        if (game.endGame == true){
        end('You Won ! 🎉');
        win = document.createElement('audio');
        win.src = '/static/audio/win.mp3';
        document.body.appendChild(win);
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
        document.getElementById('dice_value3').innerHTML = '<img src="/static/image/1f3b2.gif" alt="" width="30px"></img>';
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
                document.body.appendChild(loose);
                loose.play();
            }

});

function end(gameResult){
                let gameOver1 = document.createElement('h1');
                gameOver1.append(gameResult);
                gameOver1.style.background = 'linear-gradient(135deg, #fff3d6, #ffe0b2)';
                gameOver1.style.fontSize = '68px';
                gameOver1.style.position = 'absolute';
                gameOver1.style.top = '300px';
                gameOver1.style.left = '450px';
                gameOver1.style.color = 'green';
                gameOver1.style.padding = '10px';
                document.body.append(gameOver1);
                document.getElementById('roll').style.display = 'none';
                document.getElementById('music').remove();
                document.getElementById('ladder').remove();
        }


        

         