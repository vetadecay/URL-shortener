<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found">
    <h2>404 - Сторінка не знайдена</h2>
    <router-link to="/">Повернутися на головну</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Стилі для сторінки 404 */
.not-found {
  text-align: center;
  padding: 2rem;
}
a {
  color: #3498db;
  text-decoration: none;
}
</style>
