<template>
  <h1>Reversi</h1>
  <ReversiGrid />
</template>

<script>
import ReversiGrid from './components/ReversiGrid.vue';

export default {
  name: 'App',
  components: {
    ReversiGrid,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
