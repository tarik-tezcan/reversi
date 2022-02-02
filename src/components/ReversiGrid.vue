<template>
  <div
    id="grid"
  >
    <InfoBar
      :light-pieces="lightPieces"
      :dark-pieces="darkPieces"
      :turn="turn"
      @opponentChange="changeOpponent($event)"
    />
    <div
      v-for="row in gridSize"
      :key="row.id"
      class="grid-row"
    >
      <Square
        v-for="col in gridSize"
        :key="col.id"
        :row="row"
        :col="col"
        :grid-size="gridSize"
        :cell-width="cellWidth"
        :cell-owner="grid[row - 1][col - 1]"
        @click="handleMove($event.target.id)"
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
  emits: ['gameEnd', 'passTurn'],
  data() {
    return {
      gridSize: 8,
      cellWidth: 72,
      grid: [],
      turn: 'dark',
      lightPieces: 2,
      darkPieces: 2,
      winner: 'none',
      isComputerTurn: false,
      isAgainstComputer: true,
    };
  },
  computed: {
    currentColorCode() {
      if (this.turn === 'dark') {
        return 1;
      }
      return 2;
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
  methods: {
    changeOpponent(event) {
      this.isAgainstComputer = event;
      if (this.isAgainstComputer && this.isComputerTurn) {
        this.isComputerTurn = false;
        this.computerMove();
      }
    },
    // 0 designates an empty cell
    // 1 designates a dark cell
    // 2 designates a light cell
    handleMove(moveLoc) {
      if (this.isValid(moveLoc)) {
        if (this.turn === 'light') {
          this.lightMove(moveLoc);
          this.turn = 'dark';
        } else {
          this.darkMove(moveLoc);
          this.turn = 'light';
          this.isComputerTurn = true;
        }
        this.updateScores();
        if (this.checkAllPossibleMoves().length === 0) {
          if (this.turn === 'light') {
            this.turn = 'dark';
            this.isComputerTurn = false;
          } else {
            this.turn = 'light';
            this.isComputerTurn = true;
          }
          if (this.checkAllPossibleMoves().length === 0) {
            if (this.darkPieces > this.lightPieces) {
              this.$emit('gameEnd', this.lightPieces, this.darkPieces, 'DARK');
            } else if (this.darkPieces < this.lightPieces) {
              this.$emit('gameEnd', this.lightPieces, this.darkPieces, 'LIGHT');
            } else {
              this.$emit('gameEnd', this.lightPieces, this.darkPieces, 'none');
            }
          } else {
            this.$emit('passTurn');
            alert(`${this.turn}Turn Passed`);
          }
        }
        if (this.turn === 'light' && this.isAgainstComputer && this.isComputerTurn
        && this.checkAllPossibleMoves().length !== 0) {
          this.isComputerTurn = false;
          this.computerMove();
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
    computerMove() {
      let moves = this.checkAllPossibleMoves();
      console.log('-------------');
      console.log(moves);
      moves = moves.map((el) => {
        const finalElement = [el[0][0], el[0][1], 0];
        finalElement[2] = 0;
        el.forEach((subElement) => {
          finalElement[2] += subElement[2];
        });
        console.log(finalElement);
        return finalElement;
      });
      moves = moves.sort((el1, el2) => (el2[2] - el1[2]));
      console.log(moves);
      /* console.log(`${moves[0][0][0][0]}-${moves[0][0][0][1]}`); */
      setTimeout(() => (this.handleMove(`${moves[0][0][0] + 1}-${moves[0][0][1] + 1}`)), 500);
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
