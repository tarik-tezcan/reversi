<template>
  <div id="grid">
    <InfoBar
      :player-one-name="playerOne.name"
      :player-two-name="playerTwo.name"
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
      <GridSquare
        v-for="col in gridSize"
        :key="col.id"
        :row="row"
        :col="col"
        :grid-size="gridSize"
        :cell-owner="grid[row - 1][col - 1]"
        @click="handleMove($event.target.id)"
      />
    </div>
  </div>
</template>

<script>
import InfoBar from '@/components/infobar/InfoBar.vue';
import GridSquare from '@/components/GridSquare.vue';

export default {
  name: 'ReversiGrid',
  components: {
    GridSquare,
    InfoBar,
  },
  emits: ['gameEnd', 'passTurn'],
  // Player One is dark
  // Player Two is light
  data() {
    return {
      gridSize: 8,
      grid: [],
      emptyColorCode: 0,
      darkColorCode: 1,
      lightColorCode: 2,
      turn: 'dark',
      lightPieces: 2,
      darkPieces: 2,
      winner: 'none',
      isComputerTurn: false,
      isAgainstComputer: true,
      playerOne: {
        name: 'Player One',
        color: 'dark',
        colorCode: 1,
        isHuman: true,
      },
      playerTwo: {
        name: 'PC',
        color: 'light',
        colorCode: 2,
        isHuman: false,
      },
      currentPlayer: {},
      moveDelay: 500,
    };
  },
  computed: {
    currentColorCode() {
      if (this.turn === 'dark') {
        return this.darkColorCode;
      }
      return this.lightColorCode;
    },
  },
  beforeMount() {
    this.grid = Array(this.gridSize)
      .fill(this.emptyColorCode)
      .map(() => Array(this.gridSize).fill(this.emptyColorCode));
    this.grid[3][3] = this.lightColorCode;
    this.grid[4][4] = this.lightColorCode;
    this.grid[3][4] = this.darkColorCode;
    this.grid[4][3] = this.darkColorCode;
    this.currentPlayer = this.playerOne;
  },
  methods: {
    changeOpponent(event) {
      this.isAgainstComputer = event;
      if (this.isAgainstComputer) {
        this.nameOfPlayerTwo = 'PC';
      } else {
        this.nameOfPlayerTwo = 'Player Two';
      }
      console.log(`Against Computer:${this.isAgainstComputer}`);
      if (this.turn === 'light' && this.isAgainstComputer && this.isComputerTurn) {
        this.isComputerTurn = false;
        this.computerMove();
      }
    },
    // 0 designates an empty cell
    // 1 designates a dark cell
    // 2 designates a light cell
    handleMove(moveLoc) {
      if (this.isValid(moveLoc, this.grid)) {
        // Make the move
        this.makeMove(moveLoc, this.currentPlayer, this.grid);
        this.changeTurn();
        this.updateScores(this.grid);
        // If there won't be a possible move pass the turn
        if (this.checkAllPossibleMoves(this.grid).length === 0) {
          this.changeTurn();
          // If there isn't a move when turn is passed, game is ended
          if (this.checkAllPossibleMoves(this.grid).length === 0) {
            this.endGame();
          } else {
            this.$emit('passTurn');
            alert(`${this.turn}Turn Passed`);
          }
        }
        // Trigger the move for AI when turn is changed
        if (
          this.turn === 'light'
          && this.isAgainstComputer
          && this.isComputerTurn
          && this.checkAllPossibleMoves(this.grid).length !== 0
        ) {
          console.log(this.checkAllPossibleMoves(this.grid));
          this.computerMove();
        }
      }
    },
    // Methods for making moves
    makeMove(moveLocation, movePlayer, moveGrid) {
      const posRow = moveLocation[0] - 1;
      const posCol = moveLocation[2] - 1;
      const allChangingMoves = this.checkPossibleMoves(posRow, posCol, moveGrid);
      allChangingMoves.forEach((el) => {
        this.grid = this.changeColorTo(el[0], el[1], movePlayer.colorCode, this.grid);
      });
    },
    computerMove() {
      const pickedMove = this.pickBestMove();
      setTimeout(
        () => this.handleMove(`${pickedMove[0][0] + 1}-${pickedMove[0][1] + 1}`),
        this.moveDelay,
      );
    },
    pickBestMove() {
      return this.maxMove();
    },
    maxMove() {
      let possibleMoves = this.checkAllPossibleMoves(this.grid);
      let biggestMoveScore = 0;
      let maxMove;
      // For each possible move
      // make the move, and then calculate the score
      possibleMoves = possibleMoves.map((el) => el[0]);
      possibleMoves.forEach((move) => {
        // Deep copy of current grid
        let curGrid = JSON.parse(JSON.stringify(this.grid));
        const allMovesFrom = this.checkPossibleMoves(move[0][0], move[0][1], this.grid);
        allMovesFrom.forEach((el) => {
          curGrid = this.changeColorTo(el[0], el[1], this.lightColorCode, curGrid);
        });
        const moveScore = this.calculateScores(curGrid)[0];
        if (moveScore > biggestMoveScore) {
          biggestMoveScore = moveScore;
          maxMove = move;
        }
      });
      return maxMove;
    },
    // Updating the game status
    changeColorTo(startLocation, endLocation, targetColorCode, gridToChange) {
      let curRow = startLocation[0];
      let curCol = startLocation[1];
      const changeableGrid = JSON.parse(JSON.stringify(gridToChange));
      while (curRow - endLocation[0] !== 0 || curCol - endLocation[1] !== 0) {
        changeableGrid[curRow][curCol] = targetColorCode;
        if (curRow !== endLocation[0]) {
          curRow
            -= (curRow - endLocation[0]) / Math.abs(curRow - endLocation[0]);
        }
        if (curCol !== endLocation[1]) {
          curCol
            -= (curCol - endLocation[1]) / Math.abs(curCol - endLocation[1]);
        }
      }
      return changeableGrid;
    },
    updateScores(gridStatus) {
      const gridString = JSON.stringify(gridStatus);
      this.lightPieces = (gridString.match(/2/g) || []).length;
      this.darkPieces = (gridString.match(/1/g) || []).length;
    },
    calculateScores(gridStatus) {
      const gridString = JSON.stringify(gridStatus);
      return [(gridString.match(/2/g) || []).length,
        (gridString.match(/1/g) || []).length];
    },
    endGame() {
      if (this.darkPieces > this.lightPieces) {
        this.$emit('gameEnd', this.lightPieces, this.darkPieces, 'DARK');
      } else if (this.darkPieces < this.lightPieces) {
        this.$emit('gameEnd', this.lightPieces, this.darkPieces, 'LIGHT');
      } else {
        this.$emit('gameEnd', this.lightPieces, this.darkPieces, 'none');
      }
    },
    changeTurn() {
      if (this.currentPlayer === this.playerOne) {
        this.currentPlayer = this.playerTwo;
        this.turn = this.playerTwo.color;
        this.isComputerTurn = true;
      } else {
        this.currentPlayer = this.playerOne;
        this.turn = this.playerOne.color;
        this.isComputerTurn = false;
      }
    },
    // Helper
    doesContain(arrOne, arrTwo) {
      const arrOneString = JSON.stringify(arrOne);
      const arrTwoString = JSON.stringify(arrTwo);
      const c = arrOneString.indexOf(arrTwoString);
      if (c !== -1) {
        return true;
      }
      return false;
    },
    // Calculating moves
    isValid(moveLocation, gridStatus) {
      const moveRow = moveLocation[0] - 1;
      const moveCol = moveLocation[2] - 1;
      const allPossibleMoves = [];
      // Is square filled ?
      if (gridStatus[moveRow][moveCol] !== 0) {
        return false;
      }
      for (let i = 0; i < this.gridSize; i += 1) {
        for (let j = 0; j < this.gridSize; j += 1) {
          allPossibleMoves.push(this.checkPossibleMoves(i, j, gridStatus));
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
    checkAllPossibleMoves(gridStatus) {
      const posMoves = [];
      for (let i = 0; i < this.gridSize; i += 1) {
        for (let j = 0; j < this.gridSize; j += 1) {
          posMoves.push(this.checkPossibleMoves(i, j, gridStatus));
        }
      }
      return posMoves.filter((x) => x.length > 0);
    },
    checkPossibleMoves(cellRow, cellCol, gridStatus) {
      let count;
      let currentRow = cellRow;
      let currentCol = cellCol;
      const moves = [];
      // Check all directions from reverse (-1) to straight (1)
      if (gridStatus[cellRow][cellCol] === 0) {
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
                if (gridStatus[currentRow][currentCol] === this.emptyColorCode) {
                  break;
                } else if (
                  gridStatus[currentRow][currentCol] === this.currentColorCode
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

<style lang="scss" scoped>
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
