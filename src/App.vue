<template>
  <Header />
  <div id="game-wrapper">
    <EndScreen
      @resetGame="setVisible"
      v-show="showEndScreen"
      :light-score="lightScore"
      :dark-score="darkScore"
      :winner="winner"
    />
    <ReversiGrid @gameEnd="setHidden" v-show="showGrid" :key="playCount" />
  </div>
</template>

<script>
import ReversiGrid from './components/ReversiGrid.vue';
import EndScreen from './components/EndScreen.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    ReversiGrid,
    EndScreen,
    Header,
  },
  data() {
    return {
      showEndScreen: false,
      showGrid: true,
      lightScore: 0,
      darkScore: 0,
      playCount: 0,
      winner: 'none',
    };
  },
  methods: {
    setHidden(lightsScore, darksScore, winnerIs) {
      this.lightScore = lightsScore;
      this.darkScore = darksScore;
      this.winner = winnerIs;
      this.showEndScreen = true;
      this.showGrid = false;
    },
    setVisible() {
      this.playCount += 1;
      this.showEndScreen = false;
      this.showGrid = true;
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: $nord6;
}

#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  font-family: Roboto;
}

#game-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: clamp(calc(4px * 72), calc(8px * 72), calc(8px * 72));
  height: calc(8px * 72 + 72px);
}
</style>
