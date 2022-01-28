<template>
  <div id="grid">
    <div class="grid-row" v-for="item in gridSize" :key="item.id">
      <div
        class="square"
        :style="{ width: cellWidth + 'px', height: cellWidth + 'px' }"
        v-for="item2 in gridSize"
        :key="item2.id"
      >
        {{ (item - 1) * gridSize + item2 }}
      </div>
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
    };
  },
};
</script>

<style lang="scss" scoped>
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
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
