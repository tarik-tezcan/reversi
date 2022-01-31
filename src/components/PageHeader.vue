<template>
  <header id="header">
    <section id="top-bar">
      <h1>Reversi</h1>
      <div id="nav-bar">
        <p>
          <router-link to="/">
            Play
          </router-link>
        </p>
        <p>
          <router-link to="/rules">
            Rules
          </router-link>
        </p>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
};
</script>

<style lang="scss" scoped>
#header {
  height: 128px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 96px;
  background-color: $nord3;

  #top-bar {
    width: 576px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    #nav-bar {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: flex-start;

      p {
        color: $nord4;
        margin-right: 16px;
        margin-top: 8px;
        margin-bottom: 8px;
      }
    }
  }

  a {
    color: $nord4;
  }

  h1 {
    color: $nord4;
    font-size: 48px;
    margin: 0;
  }
}
</style>
