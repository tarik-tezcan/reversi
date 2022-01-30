<template>
  <div id="info-bar">
    <p v-if="turn === 'light'">White's turn</p>
    <p v-else>Black's turn</p>
    <p>White: {{ lightPieces }}</p>
    <p>Black: {{ darkPieces }}</p>
  </div>
</template>

<script>
export default {
  name: 'InfoBar',
  props: {
    turn: String,
    lightPieces: Number,
    darkPieces: Number,
  },
};
</script>

<style lang="scss">
#info-bar {
  width: 100%;
  height: 72px;
  border: 2px solid black;
  background-color: gray;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
