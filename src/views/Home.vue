<template>
  <div class="home">
    <div id="game-wrapper">
      <EndScreen
        v-show="showEndScreen"
        :light-score="lightScore"
        :dark-score="darkScore"
        :winner="winner"
        @resetGame="setVisible"
      />
      <ReversiGrid
        v-show="showGrid"
        :key="playCount"
        @gameEnd="setHidden"
      />
    </div>
  </div>
</template>

<script>
import ReversiGrid from '../components/ReversiGrid.vue';
import EndScreen from '../components/EndScreen.vue';

export default {
  name: 'Home',
  components: {
    ReversiGrid,
    EndScreen,
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
button {
  font-family: Roboto;
}

#game-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: clamp(calc($square-size * 4), calc($square-size * 8), 100vw);
  height: calc($square-size * 8 + $square-size);
}
</style>
