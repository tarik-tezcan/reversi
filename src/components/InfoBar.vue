<template>
  <div id="info-bar">
    <p v-if="turn === 'light'">Light's turn</p>
    <p v-else>Dark's turn</p>
    <p>Light: {{ lightPieces }}</p>
    <p>Dark: {{ darkPieces }}</p>
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
  background-color: $nord6;
  /* background-color: gray; */
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
