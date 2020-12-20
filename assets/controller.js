let nave = document.querySelector(".player-shooter");

let playArea = document.querySelector("#main-play-area");



function naveMovimento(event)
{
    if(event.key == "ArrowUp")
    {
        event.preventDefault();
        moveUp();
    }
    else if(event.key == "ArrowDown")
    {
        event.preventDeafault();
        moveDown();
    }
    else if(event.key == " ")
    {
        event.preventDeafault();
        fireLaser();
    }
}

function moveUp()
{
    let topPosition = getComputedStyle(nave).getPropertyValue("top");

    if(topPosition === "0px")
    {
        return;
    }
    else
    {
        let pos = parseInt(topPosition);
        pos -= 50;
        nave.style.top = pos + "px";
    }
}