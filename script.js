import confetti from 'https://cdn.skypack.dev/canvas-confetti';

let winningText=document.getElementById('winningText') //display the text who won the match
let restartbtn=document.getElementById('rebtn') //restart the game after user click the restart button


//let container=document.getElementsByClassName('box') // get a collection of elements. But we need array so..
let container=Array.from(document.getElementsByClassName('box')) // get the array elements


let WinIndicator=getComputedStyle(document.body).getPropertyValue('--win-block')
let drawIndicator=getComputedStyle(document.body).getPropertyValue('--draw-block')


const O_PLAYER="O"
const X_PLAYER="X"
let currentPlayer=X_PLAYER // X starts the game. Currentplayer will change after X


let array=Array(9).fill(null) // initially all boxes are null. We know the fixed length that is 9 boxes and fill null value
let count=0
function party(){
        confetti()
}
const initialgame=()=>{   //anonymous function
    container.forEach(box=>box.addEventListener('click',Clicked)) //foreach is used fpr array iteration. const means if I click the box means, we can not override that box.
}// box stores the value of *addEventListener* function into box.
function Clicked(e){// e is the object of EventListener
    const id=e.target.id // it points out the id in html id=0,1,2,3..... // if one time click means id from html is stored into id in js

    if(!array[id] && count<9){ //if element is not present and the count is less than nine means go inside if condition
        array[id]=currentPlayer //store the currentpalyer in array[id] position
        e.target.innerText = currentPlayer // print the x or y. e.target represents the id value innertext is used to print the value.
        if(won()!==false){
            winningText.innerHTML=`${currentPlayer} has won! &#129321;`
            let blocks=won()
            count=10 //if count 10 means player won the match and it does not go inside the if(!array[id] && count<9) comdition
            blocks.map(box=>container[box].style.backgroundColor=WinIndicator)
            party()
            return
        }
count++

        currentPlayer = currentPlayer == X_PLAYER ? O_PLAYER:X_PLAYER // if currentplayer id x means change to y and vice versa
    }
    if(count==9){
        winningText.innerHTML='Match draw &#128528;'
        container.forEach(box=>box.style.color=drawIndicator)
    }

}
const winningPairs=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function won(){
    for(const i of winningPairs){
        let [a,b,c]=i
        if(array[a]&&(array[a]==array[b] && array[b]==array[c])){
            return [a,b,c]
        }
    }
    return false;
}


restartbtn.addEventListener('click', restart)

function restart() {
    array.fill(null)
    count=0
    container.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor=''
        box.style.color='#cb455c';

    })
    winningText.innerHTML='Tic Tac Toe &#128512;'
    currentPlayer = X_PLAYER


}
initialgame()


// You would use getElementById() if you need to access a specific element in the document, such as an element that has been dynamically created.
// You would use getElementsByClassName() if you need to access a group of elements that have the same class name, such as all of the buttons on a page.

