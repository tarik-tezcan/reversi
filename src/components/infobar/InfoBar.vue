<template>
  <div id="info-bar">
    <PlayerInfo
      :player-name="playerOneName"
      :player-color="'Dark'"
      :player-score="darkPieces"
    />
    <TurnInfo
      :turn-now="turn"
      @opponentChangeClick="emitCheckboxEvent($event)"
    />
    <PlayerInfo
      :player-name="playerTwoName"
      :player-color="'Light'"
      :player-score="lightPieces"
    />
  </div>
</template>

<script>
import PlayerInfo from '@/components/infobar/PlayerInfo.vue';
import TurnInfo from '@/components/infobar/TurnInfo.vue';

export default {
  name: 'InfoBar',
  components: {
    PlayerInfo,
    TurnInfo,
  },
  props: {
    turn: { type: String, default: 'dark' },
    playerOneName: { type: String, default: 'Player One' },
    playerTwoName: { type: String, default: 'PC' },
    lightPieces: { type: Number, default: 2 },
    darkPieces: { type: Number, default: 2 },
  },
  emits: ['opponentChange'],
  methods: {
    emitCheckboxEvent(event) {
      this.$emit('opponentChange', event);
    },
  },
};
</script>

<style lang="scss" scoped>
#info-bar {
  max-width: 100%;
  width: 100%;
  height: $square-size;
  border: 2px solid black;
  background-color: $nord6;
  /* background-color: gray; */
  color: black;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* grid-auto-rows: minmax($square-size, auto); */
  justify-items: center;
}

@media (max-width: 576px) {
  #info-bar {
    height: 56px;
  }
}
</style>
