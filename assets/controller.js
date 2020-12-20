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
        event.preventDefault();
        moveDown();
    }
    else if(event.key === " ")
    {
        event.preventDefault();
        fireLaser();
    }
}

function moveUp()
{
    let topPosition = getComputedStyle(nave).getPropertyValue("top");

    if(topPosition == "0px")
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

function moveDown()
{
    let topPosition = getComputedStyle(nave).getPropertyValue("top");

    if(topPosition == "550px")
    {
        return;
    }
    else
    {
        let pos = parseInt(topPosition);
        pos += 50;
        nave.style.top = `${pos}px`;
    }
}

function fireLaser()
{
    let laser = createrLaserHTMLElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createrLaserHTMLElement()
{
    let xPos = parseInt(window.getComputedStyle(nave).getPropertyValue("left"));
    let yPos = parseInt(window.getComputedStyle(nave).getPropertyValue("top"));

    let newLaser = document.createElement("img");
    newLaser.src = "assets/imgs/shoot.png";
    newLaser.classList.add("laser");

    newLaser.style.left = `${xPos}px`;
    newLaser.style.top = `${yPos - 10}px`;
    return newLaser;

}

function moveLaser(laser)
{
    let laserInterval = setInterval(() => {
        let xPos = parseInt(laser.style.left);

        if(xPos >= 340)
        {
            laser.remove();
        }
        else
        {
            laser.style.left = `${xPos + 8}px`
        }
    }, 10);
}

window.addEventListener("keydown", naveMovimento);