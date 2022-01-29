<template>
  <div id="grid">
    <div class="grid-row" v-for="item in gridSize" :key="item.id">
      <button
        class="square"
        @click="handleMove($event)"
        v-for="item2 in gridSize"
        v-bind="{ id: item + '-' + item2 }"
        :style="{ width: cellWidth + 'px', height: cellWidth + 'px' }"
        :key="item2.id"
      >
        {{ (item - 1) * gridSize + item2 }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReversiGrid',
  data() {
    return {
      gridSize: 8,
      cellWidth: 64,
      grid: [],
      turn: 0,
    };
  },
  methods: {
    handleMove(event) {
      if (this.turn) {
        this.whiteMove(event.target.id);
      } else {
        this.blackMove(event.target.id);
      }
      this.turn = !this.turn;
      this.updateColors();
    },
    blackMove(id) {
      this.grid[id[0] - 1][id[2] - 1] = 2;
    },
    whiteMove(id) {
      this.grid[id[0] - 1][id[2] - 1] = 1;
    },
    updateColors() {
      for (let i = 0; i < this.gridSize; i += 1) {
        for (let j = 0; j < this.gridSize; j += 1) {
          if (this.grid[i][j] === 1) {
            document.getElementById(`${i + 1}-${j + 1}`).style.backgroundColor = 'white';
          } else if (this.grid[i][j] === 2) {
            document.getElementById(`${i + 1}-${j + 1}`).style.backgroundColor = 'black';
          }
        }
      }
    },
  },
  beforeMount() {
    this.grid = Array(this.gridSize)
      .fill(0)
      .map(() => Array(this.gridSize).fill(0));
    this.grid[3][3] = 1;
    this.grid[4][4] = 1;
    this.grid[3][4] = 2;
    this.grid[4][3] = 2;
  },
  mounted() {
    this.updateColors();
  },
};
</script>

<style lang="scss">
#grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  max-width: fit-content;
  border: 2px solid black;
}

.grid-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.square {
  border: 2px solid black;
  background-color: #bbbbbb;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
