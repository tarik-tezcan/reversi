<template>
  <div id="grid">
    <InfoBar :lightPieces="lightPieces" :darkPieces="darkPieces" :turn="turn" />
    <div class="grid-row" v-for="row in gridSize" :key="row.id">
      <Square
        v-for="col in gridSize"
        @click="handleMove($event)"
        v-bind:key="col.id"
        :row="row"
        :col="col"
        :gridSize="gridSize"
        :cellWidth="cellWidth"
        :cellOwner="grid[row - 1][col - 1]"
      />
    </div>
  </div>
</template>

<script>
import Square from './Square.vue';
import InfoBar from './InfoBar.vue';

export default {
  name: 'ReversiGrid',
  components: {
    Square,
    InfoBar,
  },
  data() {
    return {
      gridSize: 8,
      cellWidth: 64,
      grid: [],
      turn: 'dark',
      lightPieces: 2,
      darkPieces: 2,
    };
  },
  methods: {
    // For the grid
    // 0 designates an empty cell
    // 1 designates a dark cell
    // 2 designates a light cell
    handleMove(event) {
      if (this.isValid(event.target.id)) {
        if (this.turn === 'light') {
          this.lightMove(event.target.id);
          this.turn = 'dark';
        } else {
          this.darkMove(event.target.id);
          this.turn = 'light';
        }
        this.updateScores();
        if (this.checkAllPossibleMoves().length === 0) {
          alert('Turn Passed');
          if (this.turn === 'light') {
            this.turn = 'dark';
          } else {
            this.turn = 'light';
          }
          if (this.checkAllPossibleMoves().length === 0) {
            alert('Game Ended!');
          }
        }
      }
    },
    darkMove(id) {
      const posRow = id[0] - 1;
      const posCol = id[2] - 1;
      const allChangingMoves = this.checkPossibleMoves(posRow, posCol);
      allChangingMoves.forEach((element) => this.changeColorTo(element[0], element[1], 1));
    },
    lightMove(id) {
      const posRow = id[0] - 1;
      const posCol = id[2] - 1;
      const allChangingMoves = this.checkPossibleMoves(posRow, posCol);
      allChangingMoves.forEach((element) => this.changeColorTo(element[0], element[1], 2));
    },
    changeColorTo(startLocation, endLocation, targetColorCode) {
      let curRow = startLocation[0];
      let curCol = startLocation[1];
      while (curRow - endLocation[0] !== 0 || curCol - endLocation[1] !== 0) {
        this.grid[curRow][curCol] = targetColorCode;
        if (curRow !== endLocation[0]) {
          curRow
            -= (curRow - endLocation[0]) / Math.abs(curRow - endLocation[0]);
        }
        if (curCol !== endLocation[1]) {
          curCol
            -= (curCol - endLocation[1]) / Math.abs(curCol - endLocation[1]);
        }
      }
    },
    updateScores() {
      const gridString = JSON.stringify(this.grid);
      this.lightPieces = (gridString.match(/2/g) || []).length;
      this.darkPieces = (gridString.match(/1/g) || []).length;
    },
    doesContain(arrOne, arrTwo) {
      const arrOneString = JSON.stringify(arrOne);
      const arrTwoString = JSON.stringify(arrTwo);
      const c = arrOneString.indexOf(arrTwoString);
      if (c !== -1) {
        return true;
      }
      return false;
    },
    isValid(moveLocation) {
      const moveRow = moveLocation[0] - 1;
      const moveCol = moveLocation[2] - 1;
      const allPossibleMoves = [];
      // Is square filled ?
      if (this.grid[moveRow][moveCol] !== 0) {
        return false;
      }
      for (let i = 0; i < this.gridSize; i += 1) {
        for (let j = 0; j < this.gridSize; j += 1) {
          allPossibleMoves.push(this.checkPossibleMoves(i, j));
        }
      }
      const allPossibleMoveLocations = allPossibleMoves
        .filter((x) => x.length > 0)
        .map((element) => element[0])
        .map((el) => el[0]);
      if (this.doesContain(allPossibleMoveLocations, [moveRow, moveCol])) {
        return true;
      }
      return false;
    },
    checkAllPossibleMoves() {
      const posMoves = [];
      for (let i = 0; i < this.gridSize; i += 1) {
        for (let j = 0; j < this.gridSize; j += 1) {
          posMoves.push(this.checkPossibleMoves(i, j));
        }
      }
      return posMoves.filter((x) => x.length > 0);
    },
    checkPossibleMoves(cellRow, cellCol) {
      let count;
      let currentRow = cellRow;
      let currentCol = cellCol;
      const moves = [];
      // Check all directions;
      if (this.grid[cellRow][cellCol] === 0) {
        for (let rowDirection = -1; rowDirection < 2; rowDirection += 1) {
          for (let colDirection = -1; colDirection < 2; colDirection += 1) {
            count = 0;
            currentRow = cellRow;
            currentCol = cellCol;
            if (rowDirection !== 0 || colDirection !== 0) {
              currentRow += rowDirection;
              currentCol += colDirection;
              while (
                currentRow > -1
                && currentRow < this.gridSize
                && currentCol > -1
                && currentCol < this.gridSize
              ) {
                if (this.grid[currentRow][currentCol] === 0) {
                  break;
                } else if (
                  this.grid[currentRow][currentCol] === this.currentColorCode
                ) {
                  if (count > 0) {
                    moves.push([
                      [cellRow, cellCol],
                      [currentRow, currentCol],
                      count,
                    ]);
                  }
                  break;
                } else {
                  count += 1;
                }
                currentRow += rowDirection;
                currentCol += colDirection;
              }
            }
          }
        }
      }
      return moves;
    },
  },
  beforeMount() {
    this.grid = Array(this.gridSize)
      .fill(0)
      .map(() => Array(this.gridSize).fill(0));
    this.grid[3][3] = 2;
    this.grid[4][4] = 2;
    this.grid[3][4] = 1;
    this.grid[4][3] = 1;
  },
  computed: {
    currentColorCode() {
      if (this.turn === 'dark') {
        return 1;
      }
      return 2;
    },
  },
};
</script>

<style lang="scss">
#grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  max-width: fit-content;
  border: 2px solid black;
}

.grid-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
