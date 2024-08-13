// first player start with x and second with o 
// we have to switch the turn ---> turning function.
// we have to check the winner ---> winning function.
const container=document.querySelector('.container');
// we have to add a winner array to see anyone contains this .
const containerBody = document.querySelector('.container-body');
const containerFooter = document.querySelector('.container-footer');
const containerFooterChildren = Array.from(containerFooter.children);
const containerBodyChildren = Array.from(containerBody.children);

// turning function
let turn = "X";
const changeTurn = () => {
    turn = (turn === "X") ? "O" : "X";
    return turn;
}

let wins = [
    // row wise
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // column wise
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal wise
    [0, 4, 8],
    [2, 4, 6]
];

let gameover = false;
const winDiv=document.createElement('div');

// check win function
const checkWin = () => {
    wins.forEach((e) => {
        if (
            containerBodyChildren[e[0]].innerText === containerBodyChildren[e[1]].innerText &&
            containerBodyChildren[e[1]].innerText === containerBodyChildren[e[2]].innerText &&
            containerBodyChildren[e[0]].innerText !== ''
        ) {
            gameover = true;
            containerBodyChildren[e[0]].style.backgroundColor = "rgb(137,238,138)";
            containerBodyChildren[e[1]].style.backgroundColor = "rgb(137,238,138)";
            containerBodyChildren[e[2]].style.backgroundColor = "rgb(137,238,138)";
          
           winDiv.innerText=`${ containerBodyChildren[e[0]].innerText} wins!`;
           winDiv.classList.add('win-display');
         container.insertBefore(winDiv,container.children[2]);
        }
    });
}

// display X and O
containerBodyChildren.forEach((divElem) => {
    divElem.addEventListener('click', () => {
        if (divElem.innerText === "" && !gameover) {
            divElem.innerText = turn;
            checkWin();
            if (!gameover) {
                turn = changeTurn();
            }
        }
    });
});

// reset function
const resetFunction = () => {
    containerBodyChildren.forEach((divElem) => {
        divElem.innerText = "";
        divElem.style.backgroundColor = "";
    });
    turn = "X";
    gameover = false;
  if(winDiv.innerText!='')  container.children[2].remove();
}

// reset button event
containerFooterChildren[0].addEventListener('click', () => {
    resetFunction();
});
