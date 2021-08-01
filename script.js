var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = []; 

function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){     // if statement used to make sure the ball doesn't leave our game div(game boundaries).
        character.style.left = left - 2 + "px";
    }   
}   // this function is used to allow the ball to keep moving to the left when the left arrow key is held down.

function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){   // if statement used to make sure the ball doesn't leave our game div(game boundaries).
        character.style.left = left + 2 + "px";
    }
}   // this function is used to allow the ball to keep moving to the right when the right arrow key is held down.
document.addEventListener("keydown", event => { // event listener here to run code every time you click any button on the keyboard.
    if(both==0){
        both++;
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }                                           // the two if statements are used to check if their clicking the buttons that we want.
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});     // interval used to listen whenever we unclick the arrow keys and it will stop the movement of the ball.

var blocks = setInterval(function(){    // Interval function so it creates holes and blocks for the game forever.
    var blockLast = document.getElementById("block"+(counter-1));   // var blockLast and holeLast created to find the block before the block we are currently creating so we can get its top position and then add 100px to the new block we're creating.
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0){  // if statement created to only generate new blocks and holes if they fit inside of the game.
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360); // for the hole so that it always has a random left position.
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter); // keeps track of the current blocks that are on our screen.    
        counter++; // to know how many blocks have been created.
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){   // presents the game being over.
        alert("Game over. Score: "+(counter-9));
        clearInterval(blocks);
        location.reload();
    }
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));    
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));    
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20){  // created to make your browser run smoother, since there is now only 5 blocks and holes on the game screen at a time.
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }   
        if(iblockTop-20<characterTop && iblockTop>characterTop){  // increments the drop variable if the character(ball) is currently on top of a block.
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){  // sets drop variable back to zero if you're currently over a hole.
                drop = 0;   
            }
        }   
    }
    if(drop==0){
        if(characterTop < 480){  // if drop variable equals zero then make the ball drop 
            character.style.top = characterTop + 2 + "px";
        }
    }else{  // if its not then make drop variable go up.
        character.style.top = characterTop - 0.5 + "px";
    }
},1);   /* created to append the counter to the currentBlocks array. 
There's going to be a block and a hole with that counter in their 
id and then that same number will be in our array to keep track 
of which blocks are currently there. */
