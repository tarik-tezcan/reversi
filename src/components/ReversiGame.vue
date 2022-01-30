<template>
  <ReversiGrid />
</template>

<script>
import ReversiGrid from './ReversiGrid.vue';
import InfoBar from './InfoBar.vue';

export default {
  name: 'ReversiGame',
  components: {
    ReversiGrid,
    InfoBar,
  },
  data() {
    return {
      gridSize: 8,
      cellWidth: 72,
      grid: [],
      turn: 'dark',
      lightPieces: 2,
      darkPieces: 2,
    };
  },
};
</script>

<style>
</style>
