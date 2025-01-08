<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h1>Ласкаво просимо до URL Shortener</h1>
    <p>Скоротьте ваші посилання та відстежуйте їх кліки.</p>
    <router-link v-if="!isAuthenticated" to="/login">Увійти</router-link>
    <router-link v-if="!isAuthenticated" to="/register">Зареєструватися</router-link>
    <router-link v-if="isAuthenticated" to="/dashboard">Перейти до панелі</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>

<style scoped>
/* Стилі для головної сторінки */
.home {
  text-align: center;
  padding: 2rem;
}
a {
  margin: 0 1rem;
  color: #3498db;
  text-decoration: none;
}
</style>
