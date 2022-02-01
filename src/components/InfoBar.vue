<template>
  <div id="info-bar">
    <div id="info">
      <p>Dark: {{ darkPieces }}</p>
      <p v-if="turn === 'light'">
        Light's turn
      </p>
      <p v-else>
        Dark's turn
      </p>
      <p>Light: {{ lightPieces }}</p>
    </div>
    <button
      id="pass-button"
      :disabled="isDisabled"
      hidden
      @passTurn="enableButton"
      @click="disableButton"
    >
      Pass Turn
    </button>
  </div>
</template>

<script>
export default {
  name: 'InfoBar',
  props: {
    turn: { type: String, default: 'dark' },
    lightPieces: { type: Number, default: 2 },
    darkPieces: { type: Number, default: 2 },
  },
  data() {
    return {
      isDisabled: true,
    };
  },
  methods: {
    enableButton() {
      this.isDisabled = false;
    },
    disableButton() {
      this.isDisabled = true;
    },
  },
};
</script>

<style lang="scss" scoped>
#info-bar {
  width: 100%;
  height: 72px;
  border: 2px solid black;
  background-color: $nord6;
  /* background-color: gray; */
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

p {
  font-size: 22px;
}
</style>
