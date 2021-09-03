---
author: krona
---
# Conway's Game of Life

So after being bored for a while, i decided to code a something which has always fascinated me. Conway's Game of Life.

Conway's game of life honestly sounds grander than it looks until you realize that it is one of the best examples of complex emergent behavior coming from simple rules. It truly is wonderful.

To brush up on my knowledge of Conway's Game of Life, I went through an [article](http://pi.math.cornell.edu/~lipa/mec/lesson6.html) which is a course page from some course taught at Cornell university. I love reading these old school, university course pages. One can imagine some professor coding all these for their students. Thankyou to whoever coded this one.

Anyways, Conway's Game of Life is an example of cellular automaton (CA). You can read more about cellular automaton in Chapter 7 of the book ['Nature of Code' by Daniel Shiffman](https://natureofcode.com/). I came across this book because I wanted to implement Conway's Game of Life in [P5.js](https://p5js.org/) which is a javascript drawing library. Its a great library, very easy to learn and work with for such projects.

Well, let's get started with making Conway's Game of Life using p5.js library.

## Setting up a grid

Our game is played on a two dimensional grid of cells. So let's make that first. I will start with a square canvas of 600x600 and give it a grayish background.

P5 has a very simple syntax, I can use the setup function to do all of my setup for the grid, then use the draw function to draw anything I want.

```
function setup() {
  createCanvas(600, 600);
  background(200);
}

function draw() {}
```

Now I can draw a grid of rectangles on this canvas. I'm using the `stroke()` function to set the color of the border of each cell, and I'm using `rectangle` function which takes in `rectangle(verticalPosition, horizontalPosition, width, height)` as parameters. A simple double for loop allows me to iterate over the `numberOfRows` and `numberOfColumns` which I have calculated in the `setup()` function. Hence I'm able to show a simple grid of cells.

```
const cellWidth = 20;
let numOfColumns, numOfRows;

function setup() {
  createCanvas(600, 600);
  background(200);

  numOfColumns = width / cellWidth;
  numOfRows = height / cellWidth;
}

function draw() {
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfColumns; j++) {
      stroke(0);
      rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
    }
  }
}
```
Now we have successfully drawn a grid, but that isn't all we want to do. We need to track the state of each cell. Now would be a good time to explain how the Game of Life works. We have already discussed that the Game is played on a grid of cells. Each cell in the grid can have two states. Either it will be dead or alive. Now will also be a good time to explain what the rules of the game are.

## Rules of Game of Life
At the start of the game, each cell is given a state of either dead or alive. This initial state can be calculated randomly, or can be explicitly defined.

Each cell goes through generations, each generation which the cell passes, the cell can change its state, depending on these simple rules:

1. If a cell is alive, it will die due to:
  - Overpopulation: If a cell has four or more neighbours
  - Loneliness: If a cell has one or less neighbours
2. If a cell is dead, it will come alive if it has exactly three alive neighbours
3. Otherwise, the cell will remain in the state it already is in.

A cell's neighbours are the nine cells surrounding it (horizontal, vertical, diagonal).

## Keeping track of state
Now that we know that we need to keep track of the state of cells to perform all the calculations to determine their state in the next generation, we need somewhere to keep track of the state. A two dimensional array is perfect for this. We need a two dimensional array of the same size as the grid. To do that, we can do the following:
```
let grid;

// inside setup()
grid = new Array(numOfColumns);
for (let i = 0; i < numOfColumns; i++) {
  grid[i] = new Array(numOfRows);
}
```

Now let's initialize this grid with some random state initially. Just to check if its working or not. I'm using the `random()` function by p5.js library. If I pass in an array to it, it will randomly pick an element from the array, so I can use it to set the initial state to either `alive` or `dead`. You might want to put in `[1, 0]` or [true, false]` but it doesn't really matter since this is just a experiment.
```
for (let x = 0; x < numOfRows; x++) {
  for (let y = 0; y < numOfColumns; y++) {
    grid[x][y] = random(["alive", "dead"]);
  }
}
```
Now if you `console.log()` the grid, you'll be able to see that it is filled randomly with either the state alive or dead. Let's show this on our canvas too. We can edit the `draw()` function as follows:
```
function draw() {
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfColumns; j++) {
      if (grid[i][j] === "alive") {
        fill(255);
      } else {
        fill(0);
      }
      stroke(0);
      rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
    }
  }
}
```
Once again, the code itself is very simple. I'm using a simple if else condition to check if the grid cell corresponding to the rectangle being drawn is alive or not. The result is some crossword puzzle looking grid.

Here is the full code which we have written so far:
```
const cellWidth = 20;
let numOfColumns, numOfRows;
let grid;

function setup() {
  createCanvas(600, 600);
  background(200);

  numOfColumns = width / cellWidth;
  numOfRows = height / cellWidth;

  grid = new Array(numOfColumns);
  for (let i = 0; i < numOfColumns; i++) {
    grid[i] = new Array(numOfRows);
  }

  for (let x = 0; x < numOfRows; x++) {
    for (let y = 0; y < numOfColumns; y++) {
      grid[x][y] = random(["alive", "dead"]);
    }
  }
}

function draw() {
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfColumns; j++) {
      if (grid[i][j] === "alive") {
        fill(255);
      } else {
        fill(0);
      }
      stroke(0);
      rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
    }
  }
}
```
Each time I refresh the page, I get a new randomized initial grid. Now that we have completed this, we should get started on calculating the next generation of the grid, so our game can actually start work.

## Going through the Ages(generations)
The `draw()` function of p5 is constantly executing the code in it. So if just put a `createNextGeneration()` function (which changes the grid to the grid containing the next generation) on the top before we draw our grid, we can create an animation in which the Game of Life is being played.
```
function draw() {
  createNextGeneration();
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfColumns; j++) {
      if (grid[i][j] === "alive") {
        fill(255);
      } else {
        fill(0);
      }
      stroke(0);
      rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
    }
  }
}
```
We still haven't made this function yet, so let's do this below (outside, not inside) our `draw()` function. We will also need a variable to hold the next grid. We will declare it as `nextGrid` at the top of our code along with all other global variables. We should also initialize it as a two dimensional array the same way as we did our `grid` array. Since this will create duplicated code, we will extract the code into a function and avoid code duplication.
```
let nextGrid;

function create2dArray(rows, columns) {
  let array = new Array(columns);
  for (let i = 0; i < columns; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

function setup() {
  //...

  grid = create2dArray(numOfRows, numOfColumns);
  next = create2dArray(numOfRows, numOfColumns);

  //...
}
```
Coming back to our `createNextGeneration()` function. Let's create that now, this is the confusing part in this whole project, but let's go through it by breaking it down into simpler problems.
We need to implement the rules of the game. I've already described the rules above, and it seems like to get the next state of each cell, first we need to get information about the neighbours of the cell. So let's make a function which accepts a cell as an input and gives us the states of its neighbours as an output. Since the rest of the decisions are based on how many of those neighbours are dead or alive, so its a good idea to get just the neighbours first.

I implemented the function like this, it checks all cells in the square of surrounding cells. The first if statement is to check whether the array element being accessed is valid or not, since our 2D array only has elements of index `i` where `numOfColumns/numOfRows>i>=0`, so we shouldn't run the code for invalid array indexes to avoid errors. It just has one other if statement check so that a cell doesn't end up counting itself as its own neighbour.
```
function getNeighbours(columnPosition, rowPosition) {
  let neighbours = [];

  for (let x = columnPosition - 1; x <= columnPosition + 1; x++) {
    for (let y = rowPosition - 1; y <= rowPosition + 1; y++) {
      if (x >= 0 && y >= 0 && x < numOfColumns && y < numOfRows) {
        if (!(x == columnPosition && y == rowPosition)) {
          neighbours.push(grid[x][y]);
        }
      }
    }
  }

  return neighbours;
}

```
Now that we have the neighbours of a cell, we can easilly implement the rules of the game itself. Let's do that in our `createNextGeneration` function. We want to implement the next state of the grid on our `nextGrid` array.

We can simplify the rules a bit as:
1. If a cell has one or less neighbours alive, it will be dead in the next generation.
2. If a cell has 2 alive neighbours, its next generation will be the same as the current generation.
3. If a cell has 3 alive neighbours, it will be alive next generation.
4. If a cell has four or more neighbours alive, it will be dead in the next generation.

Now we can make a simple double for loop to iterate over all the cells and we can implement these 4 rules as simple if statements.

Here I have implemented the above 4 rules in the `createNextGeneration()` function. At the end of the function, I have also swapped the `nextGrid` with `grid`, so it will be updated the next time the `draw()` function runs.
```
function createNextGeneration() {
  for (let i = 0; i < numOfColumns; i++) {
    for (let j = 0; j < numOfRows; j++) {
      let neighbours = getNeighbours(i, j);
      let aliveNeighbours = neighbours.filter(
        (neighbour) => neighbour === "alive"
      ).length;

      if (aliveNeighbours <= 1) {
        nextGrid[i][j] = "dead";
      } else if (aliveNeighbours === 2) {
        nextGrid[i][j] = grid[i][j];
      } else if (aliveNeighbours === 3) {
        nextGrid[i][j] = "alive";
      } else {
        nextGrid[i][j] = "dead";
      }
    }
  }

  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}
```
I'm using `.filter()` method to get all alive neighbours of a cell, and then getting `.length()` of that array to get information of how many alive neighbours a cell has.

Here is the full code that we have so far:
```
const cellWidth = 20;
let numOfColumns, numOfRows;
let grid;
let nextGrid;

function setup() {
  createCanvas(600, 600);
  background(200);

  numOfColumns = width / cellWidth;
  numOfRows = height / cellWidth;

  grid = create2dArray(numOfRows, numOfColumns);
  nextGrid = create2dArray(numOfRows, numOfColumns);

  for (let x = 0; x < numOfColumns; x++) {
    for (let y = 0; y < numOfRows; y++) {
      grid[x][y] = random(["alive", "dead"]);
    }
  }
}

function draw() {
  createNextGeneration();
  for (let i = 0; i < numOfColumns; i++) {
    for (let j = 0; j < numOfRows; j++) {
      if (grid[i][j] === "alive") {
        fill(0);
      } else {
        fill(255);
      }
      stroke(0);
      rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
    }
  }
}

function create2dArray(rows, columns) {
  let array = new Array(columns);
  for (let i = 0; i < columns; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

function createNextGeneration() {
  for (let i = 0; i < numOfColumns; i++) {
    for (let j = 0; j < numOfRows; j++) {
      let neighbours = getNeighbours(i, j);
      let aliveNeighbours = neighbours.filter(
        (neighbour) => neighbour === "alive"
      ).length;

      if (aliveNeighbours <= 1) {
        nextGrid[i][j] = "dead";
      } else if (aliveNeighbours === 2) {
        nextGrid[i][j] = grid[i][j];
      } else if (aliveNeighbours === 3) {
        nextGrid[i][j] = "alive";
      } else {
        nextGrid[i][j] = "dead";
      }
    }
  }

  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}

function getNeighbours(columnPosition, rowPosition) {
  let neighbours = [];

  for (let x = columnPosition - 1; x <= columnPosition + 1; x++) {
    for (let y = rowPosition - 1; y <= rowPosition + 1; y++) {
      if (x >= 0 && y >= 0 && x < numOfColumns && y < numOfRows) {
        if (!(x == columnPosition && y == rowPosition)) {
          neighbours.push(grid[x][y]);
        }
      }
    }
  }

  return neighbours;
}
```
This gives us a working Conway's Game of Life on a 30x30 grid.

## Small Enhancement
Doing so many calculations can be CPU intensive and we really do not need that many frames to always be calculated. Hence I'm limiting the framerate to be 30 frames per second. I can do this by putting the following line in my `setup()` function:
```
framerate(30)
```
## Check the Project
- [Demo](http://www.kronaemmanuel.com/game_of_life/)
- [Repository](https://github.com/kronaemmanuel/game_of_life)

## Lessons Learnt:
- p5.js is a really wonderful and easy to use library for such small projects where you're not worried about things like [bundle size](https://bundlephobia.com/package/p5@1.4.0), performance, etc. The syntax is really easy to use, and this should definitely be used to teach beginners how to code.
- It is possible to make a semi-cool project in a few hours, I should do this more often as it is a very rewarding to see things actually working.
- Documenting the process as you go through it, makes the process much easier. For example, I wrote this post as I was making the project, this means I could copy the latest code into my post as I wrote it. Makes things very easy.
- I really need to start using an online service such as Contentful or at least Jekyll Admin to write these blogposts. I didn't include images, gifs in this post as I knew I would have to bring them into my repo and then include them.
