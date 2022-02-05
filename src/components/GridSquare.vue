<template>
  <button
    class="square"
    v-bind="{ id: row + '-' + col }"
  >
    <div
      v-if="cellOwner != '0'"
      class="disk"
      v-bind="{ id: row + '-' + col }"
      :style="{
        backgroundColor: cellColor,
      }"
    />
  </button>
</template>

<script>
export default {
  name: 'GridSquare',
  props: {
    row: { type: Number, default: 0 },
    col: { type: Number, default: 0 },
    gridSize: { type: Number, default: 72 },
    cellOwner: { type: Number, default: 0 },
  },
  computed: {
    cellColor() {
      if (this.cellOwner === 0) {
        return '#87ad66';
      }
      if (this.cellOwner === 1) {
        return '#2e3440';
      }
      return '#eceff4';
    },
  },
};
</script>

<style lang="scss" scoped>
.square {
  border: 1px solid #222;
  /* background-color: #bbbbbb; */
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  background-color: #87ad66;
  position: relative;
  width: $square-size;
  height: $square-size;
  .disk {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    position: absolute;
    margin: 0px;
    font-size: 12px;
    top: 4px;
    left: 4px;
  }
}
</style>
