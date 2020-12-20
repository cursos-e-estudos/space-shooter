let nave = document.querySelector(".player-shooter");
let playArea = document.querySelector("#main-play-area");
let aliensImgs = ["assets/imgs/monster-1.png", "assets/imgs/monster-2.png", "assets/imgs/monster-3.png"];
let startText = document.querySelector(".game-instructions");
let startButton = document.querySelector(".start-button");

let alienInterval;

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

        let aliens = document.querySelectorAll(".alien");
        aliens.forEach((alien) => //verificando colisão em casa alien
        {
            if(checkCollision(laser, alien))
            {
                alien.src = "assets/imgs/explosion.png"
                alien.classList.remove("alien");
                alien.classList.add("dead-alien");
                
            }
        });

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

function createAliens()
{
    let newAlien = document.createElement("img");
    let alienSelected = aliensImgs[Math.floor(Math.random() * aliensImgs.length)];
    newAlien.src =  alienSelected;
    newAlien.classList.add("alien");
    newAlien.classList.add("alien-transition");
    newAlien.style.left = "370px";
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

function moveAlien(alien)
{
    let moveAlienInterval = setInterval(() => {
        let xPos = parseInt(window.getComputedStyle(alien).getPropertyValue("left"));
        if(xPos <= 50)
        {
            if(Array.from(alien.classList).includes("dead-alien"))
            {
                alien.remove();
            }
            else
            {
                gameOver();
            }
        }
        else
        {
            alien.style.left = `${xPos - 1}px`;
        }
    }, 30);
}

function checkCollision(laser, alien)
{
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBotton = laserTop - 20;

    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBotton = alienTop - 30;

    if(laserLeft != 340 && laserLeft >= alienLeft)
    {
        if(laserTop <= alienTop && laserTop >= alienBotton)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}



function gameOver()
{
    window.removeEventListener("keydown", naveMovimento);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll(".alien");
    aliens.forEach((element) => {
        element.remove();
    });

    let lasers = document.querySelectorAll(".laser");
    lasers.forEach((element) => {
        element.remove();
    });

    setTimeout(() => {
        alert("Fim de jogo");
        nave.style.top = "250px";
        startButton.style.display = "block"; 
        startText .style.display = "block"; 
    });
}

function playGame()
{
    startButton.style.display = "none";
    startText.style.display = "none";
    window.addEventListener("keydown", naveMovimento);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

startButton.addEventListener("click", (event) =>{
    playGame();
});