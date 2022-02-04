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
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 3.5fr;
}

.player-name {
  font-size: 12px;
  margin: 0px;
}

.player-score {
  font-size: 22px;
  margin-top: 0px;
  margin-bottom: 10px;
}
</style>
