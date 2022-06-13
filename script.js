const gridContainer = document.querySelector('.grid-container')
let gridSize = 16
const GRID_CONTAINER_SIZE = 600 //Size of grid conatainer 600x600
const eraser = document.querySelector(`button[id="eraser"]`)
const clearButton = document.querySelector(`button[id="clear"]`)
const gridSizeButton = document.querySelector(`button[id="grid-size"]`)
let gridWidth;
let gridHeight;
let grids;

createGrid()

let draw = (e) => e.target.style.backgroundColor = "black"
let erase = (e) => e.target.style.backgroundColor = "white"
let clear = () => grids.forEach((grid) => grid.style.backgroundColor = "white")

gridContainer.addEventListener('mouseover', () => grids.forEach((grid) => grid.addEventListener('click', draw)))

gridContainer.addEventListener('mousedown', Draw)

gridContainer.addEventListener('mouseup', StopDraw)

gridContainer.ondragstart = () => {return false};

eraser.addEventListener('click', eraserF)
clearButton.addEventListener('click', clear)
gridSizeButton.addEventListener('click', changeGsize)

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

let clickCounter = 0
function eraserF() {
    clickCounter++
    if (clickCounter % 2 !== 0) {
        grids.forEach(function (grid) {
            grid.addEventListener('click', erase)
        })

        gridContainer.addEventListener('mousedown', Erase)
        gridContainer.addEventListener('mouseup', StopErase)
    }
    else {
        grids.forEach(function (grid) {
            grid.removeEventListener('click', erase)
        })
        gridContainer.removeEventListener('mousedown', Erase)
        gridContainer.removeEventListener('mouseup', StopErase)
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

function Draw() {
    grids.forEach((grid) => grid.addEventListener('mouseover', draw))
}

function StopDraw() {
    grids.forEach((grid) => grid.removeEventListener('mouseover', draw))
}

function Erase() {
    grids.forEach((grid) => grid.addEventListener('mouseover', erase))
}

function StopErase() {
    grids.forEach((grid) => grid.removeEventListener('mouseover', erase))
}