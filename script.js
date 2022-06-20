const gridContainer = document.querySelector('.grid-container')
let gridSize = 16
const GRID_CONTAINER_SIZE = 600 //Size of grid conatainer 600x600
const buttons = document.querySelectorAll('button')
const eraserButton = document.querySelector(`button[id="eraser"]`)
const clearButton = document.querySelector(`button[id="clear"]`)
const gridSizeButton = document.querySelector(`button[id="grid-size"]`)
const rainbowButton = document.querySelector(`button[id="rainbow"]`)
const blackButton = document.querySelector(`button[id="black"]`)
let gridWidth;
let gridHeight;
let grids;
let actionStatus = document.createElement('span');
actionStatus.textContent = "draw"
let clickCounter = 0

createGrid()

let draw = (e) => e.target.style.backgroundColor = 'black' //draws back color
let erase = (e) => e.target.style.backgroundColor = "rgba(209, 206, 206, 0.267)" // erases and drwas white color
let clear = () => grids.forEach((grid) => grid.style.backgroundColor = "white")

gridContainer.addEventListener('mouseover', function (){
    grids.forEach((grid) => grid.addEventListener('click', draw))

    gridContainer.addEventListener('mousedown', Action)

    gridContainer.addEventListener('mouseup', stopAction)
})

gridContainer.ondragstart = () => {return false};

blackButton.addEventListener('click', e => buttonAction("draw", draw))
eraserButton.addEventListener('click', e => buttonAction("erase", erase))
clearButton.addEventListener('click', clear)
gridSizeButton.addEventListener('click', changeGsize)
rainbowButton.addEventListener('click', e => buttonAction("rainbow", rainbow))

buttons.forEach(function (button) {
    button.addEventListener('click', (e) => e.target.style.cssText = "transform: scale(0.85);")
    button.addEventListener('transitionend', (e) => e.target.style.removeProperty('transform'))
    })

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
        height: ${gridHeight}px;`
        })
}

function buttonAction(option, action) {

    actionStatus.textContent = option

    let tempCallback = e => action(e)
    grids.forEach((grid) => grid.addEventListener('click', tempCallback))

    gridContainer.addEventListener('mousedown', Action)
    gridContainer.addEventListener('mouseup', stopAction)
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