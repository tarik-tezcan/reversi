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
        return '#2eae52';
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
  border: 1px solid black;
  /* background-color: #bbbbbb; */
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
