const gridContainer = document.querySelector('.grid-container')
const GRIDSIZE = prompt('Input grid size: ')
const GRID_CONTAINER_SIZE = 500 //Size of grid conatainer 500x500

for (let i = 0; i < GRIDSIZE**2; i++){
    let grid = document.createElement('div');
    grid.classList.add('grid');

    gridContainer.appendChild(grid);
}

const grid = document.querySelectorAll('.grid')

let gridWidth = GRID_CONTAINER_SIZE/Number(GRIDSIZE)
let gridHeight = GRID_CONTAINER_SIZE/Number(GRIDSIZE)

grid.forEach((grid) => grid.style.cssText = `width: ${gridWidth}px; height: ${gridHeight}px`)
