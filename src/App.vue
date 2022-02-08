<template>
  <PageHeader />
  <router-view />
</template>

<script>
import PageHeader from './components/PageHeader.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

body {
  margin: 0px;
}
</style>
