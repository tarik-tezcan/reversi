<template>
  <div id="end-screen">
    <p v-if="winner === 'none'">
      IT'S A TIE
    </p>
    <p v-else>
      THE WINNER IS {{ winner }}
    </p>
    <p>LIGHT: {{ lightScore }} vs DARK: {{ darkScore }}</p>
    <button
      id="play-again"
      @click="$emit('resetGame')"
    >
      PLAY AGAIN
    </button>
  </div>
</template>

<script>
export default {
  name: 'EndScreen',
  props: {
    lightScore: { type: Number, default: 32 },
    darkScore: { type: Number, default: 32 },
    winner: { type: String, default: 'none' },
  },
  emits: ['resetGame'],
};
</script>

<style lang="scss" scoped>
#end-screen {
  background-color: #2eae52;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  border: 2px solid black;
}

#play-again {
  width: 192px;
  height: 96px;
  font-size: 36px;
}
</style>
