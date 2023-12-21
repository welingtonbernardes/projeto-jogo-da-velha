const title = document.getElementById('player-time');
const trays = document.querySelectorAll('.tray');
const matTray = [ ['', '', ''], ['', '', ''], ['', '', ''] ];
const playerOne = {playerName: '', char: 'X'};
const playerTwo = {playerName: '', char: '◯'};
let playerFlag = '';
let contRest = 9;

// Função para inserir os eventos de click nos campos

function eventInsert(){
    trays.forEach(function (element){
        element.addEventListener('click', addChar);
    });
}

// Função responsável em inserir o caracter do jogador

function addChar(event){
    const element = document.createElement('p');
    const coordMatriz = event.currentTarget.dataset.field;

    if(playerFlag === 'one'){
        element.innerText = 'X';
        inserNameTitle(playerTwo.playerName);
        playerFlag = 'two';
        contRest--;
        matInsert('X', coordMatriz, playerOne.playerName);
    }else{
        element.innerText = '◯';
        inserNameTitle(playerOne.playerName);
        playerFlag = 'one';
        contRest--;
        matInsert('◯', coordMatriz, playerTwo.playerName);
    }

    //element.innerText = char;
    event.currentTarget.appendChild(element);
    event.currentTarget.removeEventListener('click', addChar);
}

// Botão que reinicia a partida (mantendo os jogadores atuais)

const newGameBtn = document.getElementById('newGameBtn').addEventListener('click', function (event){
    const trayChar = document.querySelectorAll('p');

    trayChar.forEach( function (element){
        element.remove();
    })
    
    contRest = 9;
    eventInsert();
    playerFlag = 'one';
    inserNameTitle(playerOne.playerName);
    rezetMatriz();

    const trayWin = document.querySelectorAll('.tray-win').forEach( function (element){
        element.classList.toggle("tray-win");
        element.classList.toggle("tray");
    });
});

// Botão que começa uma nova partida do zero (Alterano os nomes dos jogadores)

const startBtn = document.getElementById('startBtn').addEventListener('click', function (event){
    rezetMatriz();
    eventInsert();
    playerOne.playerName = document.getElementById('player-01').value;
    playerTwo.playerName = document.getElementById('player-02').value;
    playerFlag = 'one';
    inserNameTitle(playerOne.playerName);
});

// Função para alterar o título com o jogador da vez

function inserNameTitle(playerName){
    title.innerText = "Vez de: " + playerName;
}

// Função responsável em inserir o caracter na matriz

function matInsert(char, coordMatriz, playerName){
    const row = parseInt(coordMatriz[0]);
    const column = parseInt(coordMatriz[2]);

    matTray[row][column] = char;

    if (contRest > 4) return;
    verificaWin(char, row, column, playerName);
}

// Função responsável em verificar a vitória

function verificaWin(char, row, column, playerName){
    let flagWin = 0;

    // Verifica linha

    for (let i = row; i == row; i++) {
        for (let j = 0; j < 3; j++) {
            if (matTray[i][j] !== char){
                flagWin = 0;
                break;
            }else{
                flagWin++;
            }
        }

        if (flagWin === 3){
            title.innerText = playerName + " Venceu!";
            trays.forEach(function (element){
                element.removeEventListener('click', addChar);
            });
            alteraStyle(row, 'row');
            return;
        }
    }

    // Verifica coluna

    for (let i = column; i == column; i++) {
        for (let j = 0; j < 3; j++) {
            if (matTray[j][i] !== char){
                flagWin = 0;
                break;
            }else{
                flagWin++;
            }
        }

        if (flagWin === 3){
            title.innerText = playerName + " Venceu!";
            trays.forEach(function (element){
                element.removeEventListener('click', addChar);
            });
            alteraStyle(column, 'column');
            return;
        }
    }

    // Verifica diagonal

    if ( (matTray[0][0] === char && matTray[1][1] === char && matTray[2][2] === char) || (matTray[0][2] === char && matTray[1][1] === char && matTray[2][0] === char)){
        title.innerText = playerName + " Venceu!";
        trays.forEach(function (element){
            element.removeEventListener('click', addChar);
        });

        if ( (matTray[0][0] === char && matTray[1][1] === char && matTray[2][2] === char) ) alteraStyle(null, 'diagMain');
        if ( (matTray[0][2] === char && matTray[1][1] === char && matTray[2][0] === char) ) alteraStyle(null, 'diagSecond');

        return;
    }

    // Verifica empate

    if (flagWin === 0 && contRest === 0) {
        title.innerText = "Jogo Empatado!";
    }
}

function rezetMatriz(){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matTray[i][j] = '';
        }
    }
}

function alteraStyle(param, typeParam){
    if (typeParam === 'row'){
        for (let i = 0; i < 3; i++) {
            document.querySelector('div[data-field="' + param + "." + i).classList.toggle("tray");
            document.querySelector('div[data-field="' + param + "." + i).classList.toggle("tray-win");
        }
    }else if (typeParam === 'column'){
        for (let i = 0; i < 3; i++) {
            document.querySelector('div[data-field="' + i + "." + param).classList.toggle("tray");
            document.querySelector('div[data-field="' + i + "." + param).classList.toggle("tray-win");
        }
    }else if (typeParam === 'diagMain'){
        document.querySelector('div[data-field="0.0"').classList.toggle("tray");
        document.querySelector('div[data-field="0.0"').classList.toggle("tray-win");

        document.querySelector('div[data-field="1.1"').classList.toggle("tray");
        document.querySelector('div[data-field="1.1"').classList.toggle("tray-win");

        document.querySelector('div[data-field="2.2"').classList.toggle("tray");
        document.querySelector('div[data-field="2.2"').classList.toggle("tray-win");

    }else if (typeParam === 'diagSecond'){
        document.querySelector('div[data-field="0.2"').classList.toggle("tray");
        document.querySelector('div[data-field="0.2"').classList.toggle("tray-win");

        document.querySelector('div[data-field="1.1"').classList.toggle("tray");
        document.querySelector('div[data-field="1.1"').classList.toggle("tray-win");

        document.querySelector('div[data-field="2.0"').classList.toggle("tray");
        document.querySelector('div[data-field="2.0"').classList.toggle("tray-win");
    }
}