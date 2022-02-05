<template>
  <div class="player-info">
    <p
      class="player-name"
    >
      {{ playerName }}
    </p>
    <p class="player-score">
      {{ playerColor }}: {{ playerScore }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'PlayerInfo',
  props: {
    playerName: {
      type: String,
      default: 'Player',
    },
    playerColor: {
      type: String,
      default: 'Dark',
    },
    playerScore: {
      type: Number,
      default: 2,
    },
  },
};
</script>

<style lang="scss" scoped>
.player-info {
  height: 72px;
  display: grid;
  grid-template-rows: 33% 33% 33%;
  grid-template-areas:
  "pn"
  "ps"
  ".";
}

.player-name {
  font-size: 12px;
  grid-area: pn;
  margin-top: 4px;
  margin-bottom: 0px;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}

.player-score {
  font-size: 22px;
  margin: 0px;
  grid-area: ps;
}

</style>
