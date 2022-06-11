const gridContainer = document.querySelector('.grid-container')
const GRIDSIZE = prompt('Input grid size: ')
const GRID_CONTAINER_SIZE = 600 //Size of grid conatainer 600x600

for (let i = 0; i < GRIDSIZE**2; i++){
    let grid = document.createElement('div');
    grid.classList.add('grid');

    gridContainer.appendChild(grid);
}

const grid = document.querySelectorAll('.grid')

let gridWidth = GRID_CONTAINER_SIZE/Number(GRIDSIZE)
let gridHeight = GRID_CONTAINER_SIZE/Number(GRIDSIZE)

let draw = (e) => e.target.style.backgroundColor = "black"

grid.forEach(function (grid) {grid.style.cssText = `width: ${gridWidth}px; height: ${gridHeight}px`
    grid.addEventListener('click', draw)
})

gridContainer.addEventListener('mousedown', () => grid.forEach((grid) => grid.addEventListener('mouseover', draw)))

gridContainer.addEventListener('mouseup', () => grid.forEach((grid) => grid.removeEventListener('mouseover', draw)))

gridContainer.ondragstart = () => {return false};
