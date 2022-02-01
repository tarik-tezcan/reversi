<template>
  <div class="rules">
    <h2>Rules of Reversi</h2>
    <p>
      There are sixty-four identical game pieces called disks (often spelled
      "discs"), which are light on one side and dark on the other. Players take
      turns placing disks on the board with their assigned color facing up.
      During a play, any disks of the opponent's color that are in a straight
      line and bounded by the disk just placed and another disk of the current
      player's color are turned over to the current player's color. The
      objective of the game is to have the majority of disks turned to display
      one's color when the last playable empty square is filled.
    </p>
    <p>
      <a
        href="https://www.wikiwand.com/en/Reversi"
        target="_blank"
      >For more information</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Rules',
};
</script>

<style lang="scss" scoped>
.rules {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: clamp(calc(4px * 72), calc(8px * 72), calc(8px * 72));
  height: calc(8px * 72 + 72px);
}

h2 {
  margin-top: 0px;
  font-size: 36px;
  color: $nord3;
}

p {
  color: $nord0;
  text-align: start;
  font-size: 20px;
}
</style>
