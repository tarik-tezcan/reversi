<template>
  <button
    class="square"
    v-bind="{ id: row + '-' + col }"
    :style="{
      width: cellWidth + 'px',
      height: cellWidth + 'px',
      backgroundColor: cellColor,
    }"
  >
    {{ (row - 1) * gridSize + col }}
  </button>
</template>

<script>
export default {
  name: 'Square',
  props: {
    row: Number,
    col: Number,
    gridSize: Number,
    cellWidth: Number,
    cellOwner: Number,
  },
  computed: {
    cellColor() {
      if (this.cellOwner === 0) {
        return 'lightgray';
      }
      if (this.cellOwner === 1) {
        return 'black';
      }
      return 'white';
    },
  },
};
</script>

<style lang="scss">
.square {
  border: 2px solid black;
  /* background-color: #bbbbbb; */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
