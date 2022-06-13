const gridContainer = document.querySelector('.grid-container')
let gridSize = 16
const GRID_CONTAINER_SIZE = 600 //Size of grid conatainer 600x600
const eraser = document.querySelector(`button[id="eraser"]`)
const clear = document.querySelector(`button[id="clear"]`)

for (let i = 0; i < gridSize**2; i++){
    let grid = document.createElement('div');
    grid.classList.add('grid');

    gridContainer.appendChild(grid);
}

const grid = document.querySelectorAll('.grid')

let gridWidth = GRID_CONTAINER_SIZE/gridSize
let gridHeight = GRID_CONTAINER_SIZE/gridSize

let draw = (e) => e.target.style.backgroundColor = "black"
let erase = (e) => e.target.style.backgroundColor = "white"
let Clear = () => grid.forEach((grid) => grid.style.backgroundColor = "white")

grid.forEach(function (grid) {grid.style.cssText = `width: ${gridWidth}px; height: ${gridHeight}px`
    grid.addEventListener('click', draw)
})

gridContainer.addEventListener('mousedown', mousedownDraw)

gridContainer.addEventListener('mouseup', mouseupStopDraw)

gridContainer.ondragstart = () => {return false};

eraser.addEventListener('click', eraserF)
clear.addEventListener('click', Clear)

let clickCounter = 0
function eraserF() {
    clickCounter++
    if (clickCounter % 2 !== 0) {
        grid.forEach(function (grid) {
            grid.addEventListener('click', erase)
        })

        gridContainer.addEventListener('mousedown', mousedownErase)
        gridContainer.addEventListener('mouseup', mouseupStopErase)
    }
    else {
        grid.forEach(function (grid) {
            grid.removeEventListener('click', erase)
        })
        gridContainer.removeEventListener('mousedown', mousedownErase)
        gridContainer.removeEventListener('mouseup', mouseupStopErase)
    }
}

function mousedownDraw() {
    grid.forEach((grid) => grid.addEventListener('mouseover', draw))
}

function mouseupStopDraw() {
    grid.forEach((grid) => grid.removeEventListener('mouseover', draw))
}

function mousedownErase() {
    grid.forEach((grid) => grid.addEventListener('mouseover', erase))
}

function mouseupStopErase() {
    grid.forEach((grid) => grid.removeEventListener('mouseover', erase))
}