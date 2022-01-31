<template>
  <header id="header">
    <h1>Reversi</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss">
#header {
  height: 128px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 96px;
  background-color: $nord0;

  h1 {
    color: $nord4;
    font-size: 56px;
    margin: 0;
  }
}
</style>
