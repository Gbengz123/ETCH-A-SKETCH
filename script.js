const gridContainer = document.querySelector('.grid-container')
let gridSize = 16
const GRID_CONTAINER_SIZE = 600 //Size of grid conatainer 600x600
const eraser = document.querySelector(`button[id="eraser"]`)
const clearButton = document.querySelector(`button[id="clear"]`)
const gridSizeButton = document.querySelector(`button[id="grid-size"]`)
const rainbowButton = document.querySelector(`button[id="rainbow"]`)
let gridWidth;
let gridHeight;
let grids;
let actionStatus = document.createElement('span');
actionStatus.textContent = "draw"
let clickCounter = 0

createGrid()

let draw = (e) => e.target.style.backgroundColor = 'black' //draws back color
let erase = (e) => e.target.style.backgroundColor = "white" // erases and drwas white color
let clear = () => grids.forEach((grid) => grid.style.backgroundColor = "white")

gridContainer.addEventListener('mouseover', function (){
    grids.forEach((grid) => grid.addEventListener('click', draw))

    gridContainer.addEventListener('mousedown', Action)

    gridContainer.addEventListener('mouseup', stopAction)
})

gridContainer.ondragstart = () => {return false};

eraser.addEventListener('click', e => buttonAction("erase", erase))
clearButton.addEventListener('click', clear)
gridSizeButton.addEventListener('click', changeGsize)
rainbowButton.addEventListener('click', e => buttonAction("rainbow", rainbow))

function createGrid() {
    for (let i = 0; i < gridSize**2; i++){
        let grid = document.createElement('div');
        grid.classList.add('grid');

        gridContainer.appendChild(grid);
    }

    gridWidth = GRID_CONTAINER_SIZE/gridSize
    gridHeight = GRID_CONTAINER_SIZE/gridSize

    grids = document.querySelectorAll('.grid')

    grids.forEach(function (grid) {grid.style.cssText = `width: ${gridWidth}px;
        height: ${gridHeight}px;`})
}

function buttonAction(option, optionsFunc) {
    clickCounter++
    let tempCallback = (e) => optionsFunc(e);
    console.log(optionsFunc)
    if (clickCounter % 2 !== 0) {
        grids.forEach((grid) => grid.addEventListener('click', tempCallback))// this is adding the event

        actionStatus.textContent = option

        gridContainer.addEventListener('mousedown', Action)
        gridContainer.addEventListener('mouseup', stopAction)
    }
    else {
        grids.forEach((grid) => grid.removeEventListener('click', tempCallback)) //this is not removing the event

        gridContainer.removeEventListener('mousedown', Action)
        gridContainer.removeEventListener('mouseup', stopAction)

        actionStatus.textContent = "draw"
    }
}

function changeGsize() {
    do {
        gridSize = Number(prompt("Grid size: "))
        if (gridSize > 100) {
            alert("grid size can not be more than 100")
        }
    }
    while (gridSize > 100)

    grids.forEach((grid) => grid.remove())

    createGrid()
}

function rainbow(e) {
    let bgColor, x, y, z;
    x = Math.floor(Math.random() * 256)
    y = Math.floor(Math.random() * 256)
    z = Math.floor(Math.random() * 256)

    bgColor = `rgb(${x}, ${y}, ${z})`
    e.target.style.backgroundColor = bgColor
}

function Action() {
    if (actionStatus.textContent === "erase") {
        grids.forEach((grid) => grid.addEventListener('mouseover', erase))
    }
    if (actionStatus.textContent === "draw") {
        grids.forEach((grid) => grid.addEventListener('mouseover', draw))
    }
    if (actionStatus.textContent === "rainbow") {
        grids.forEach((grid) => grid.addEventListener('mouseover', rainbow))
    }
}

function stopAction() {
    if (actionStatus.textContent === "erase") {
        grids.forEach((grid) => grid.removeEventListener('mouseover', erase))
    }
    if (actionStatus.textContent === "draw") {
        grids.forEach((grid) => grid.removeEventListener('mouseover', draw))
    }
    if (actionStatus.textContent === "rainbow") {
        grids.forEach((grid) => grid.removeEventListener('mouseover', rainbow))
    }
}