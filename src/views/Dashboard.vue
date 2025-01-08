<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard">
    <h2>Панель керування</h2>
    <create-url></create-url>
    <url-list></url-list>
  </div>
</template>

<script>
import CreateUrl from '../components/Url/CreateUrl.vue';
import UrlList from '../components/Url/UrlList.vue';

export default {
  components: {
    CreateUrl,
    UrlList,
  },
};
</script>

<style scoped>
/* Стилі для панелі керування */
.dashboard {
  padding: 2rem;
}
</style>
