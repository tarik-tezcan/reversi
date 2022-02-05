<template>
  <div class="turn-info">
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
    <p
      v-if="turnNow === 'light'"
      class="turn-info-text"
    >
      Light's turn
    </p>
    <p
      v-else
      class="turn-info-text"
    >
      Dark's turn
    </p>
  </div>
</template>

<script>
export default {
  name: 'TurnInfo',
  props: {
    turnNow: { type: String, default: 'dark' },
  },
  emits: ['opponentChangeClick'],
  data() {
    return {
      checked: true,
      isChecked: false,
    };
  },
  methods: {
    emitCheckboxState(event) {
      this.isChecked = event.target.checked;
      this.$emit('opponentChangeClick', this.isChecked);
      console.log(this.isChecked);
    },
  },
};
</script>

<style lang="scss" scoped>
.turn-info {
  height: 100%;
  display: grid;
  grid-template-rows: 33% 33% 33%;
}

#ai-checkbox {
  font-size: 12px;
  margin: 0px;
  margin-top: 4px;

  #vs-ai {
    width: 12px;
    height: 12px;
    margin: 0px;
    margin-left: 8px;
    /* margin-top: 0px; */
    /* margin-bottom: 0px; */
  }
}

.turn-info-text {
  font-size: 22px;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
