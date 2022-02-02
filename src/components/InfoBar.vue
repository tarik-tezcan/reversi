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
    <div id="ai-checkbox">
      <label for="vs-ai"> Against Computer</label>
      <input
        id="vs-ai"
        v-model="checked"
        type="checkbox"
        name="vs-ai"
        @change="emitCheckboxState($event)"
      >
    </div>
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
  emits: ['opponentChange'],
  data() {
    return {
      checked: true,
      isDisabled: true,
      isChecked: false,
    };
  },
  methods: {
    enableButton() {
      this.isDisabled = false;
    },
    disableButton() {
      this.isDisabled = true;
    },
    emitCheckboxState(event) {
      this.isChecked = event.target.checked;
      this.$emit('opponentChange', this.isChecked);
      console.log(this.isChecked);
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

#ai-checkbox {
  font-size: 11px;

  input {
    width: 12px;
    height: 12px;
  }
}

p {
  font-size: 22px;
  margin-bottom: 4px;
}
</style>
