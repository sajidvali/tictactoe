var grid = [[null,null,null],[null,null,null],[null,null,null]];
let remainingCells = 9;
let turn = 0 ;
let xscr = 0;
let oscr = 0;

const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const replay = document.querySelector(".replay");
const aud = document.getElementById('sound');
const clap = document.getElementById('clap');

replay.addEventListener("click", ()=>{
    grid = [[null, null, null],
            [null, null, null],
            [null, null, null]];
    cells.forEach((cell) => {
        cell.classList.remove("o");
        cell.classList.remove("x");
        cell.classList.remove("disabled");
        cell.innerHTML = "";
    })
    turn = 0;
    remainingCells = 9;
    message.innerHTML = "x's turn";

});

cells.forEach(cell =>{
    cell.addEventListener("click",(event)=>{
        console.log(event.target.id);
        let row = Math.ceil(event.target.id/3) - 1;
        let col = (event.target.id - 1) % 3;
        let curTurn = "x";
        let nextTurn = "o";

        if(turn === 1) {
            curTurn = "o";
            nextTurn = "x"
        }
        aud.play();
        event.target.classList.add(curTurn);
        event.target.innerHTML = curTurn;
        message.innerHTML = `${nextTurn}'s turn`;
        event.target.classList.add("disabled");
        remainingCells -= 1;
        console.log(row+" "+col);

        grid[row][col] = curTurn;
        if(remainingCells<5){
            var res = checkWin(row, col, curTurn);
        }
        if(res === true) {
            makeAllDisabled();
            if(curTurn=='x'){
                xscr +=1;
                score.innerHTML = `Score x:o = ${xscr}:${oscr}`;
            }else{
                oscr +=1;
                score.innerHTML = `Score x:o = ${xscr}:${oscr}`;
            }
            clap.play();
            message.innerHTML = `${curTurn} won!!!`;
        }
        else if(remainingCells == 0) {
            makeAllDisabled();
            message.innerHTML = `it's a draw..!`;
        }
        turn = +!turn;

    });
});

const makeAllDisabled = () => {
    cells.forEach(cell => {
        cell.classList.add("disabled");
    });
};

const checkWin = (row,col,curTurn)=>{
    console.log(`checking for ${curTurn}`);
    //row
    let fail = false;
    for(let i = 0; i < 3; i++) {
        if(grid[row][i] !== curTurn) {
            fail = true;
            break;
        }
    }
    if(!fail)
        return true;
    // check col
    fail = false;
    for(let i = 0; i < 3; i++) {
        if(grid[i][col] !== curTurn) {
            fail = true;
            break;
        }
    }
    if(!fail)
        return true;


    // check diag-1
    fail = false;
    for(let i = 0; i < 3; i++) {
        if(grid[i][i] !== curTurn) {
            fail = true;
            break;
        }
    }
    if(!fail)
        return true;


    // check diag-2
    fail = false;
    for(let i = 0; i < 3; i++) {
        if(grid[i][2 - i] !== curTurn) {
            fail = true;
            break;
        }
    }

    if(!fail)
        return true;
    return false;
};