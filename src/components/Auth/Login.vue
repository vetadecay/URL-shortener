<!-- src/components/Auth/Login.vue -->
<template>
  <div class="login">
    <h2>Вхід</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Ім'я користувача:</label>
        <input v-model="username" required />
      </div>
      <div>
        <label>Пароль:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Увійти</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        await this.login({
          username: this.username,
          password: this.password,
        });
        this.$router.push({ name: 'Dashboard' });
      } catch (err) {
        this.error = err.response?.data?.detail || 'Помилка входу';
      }
    },
  },
};
</script>

<style scoped>
/* Додайте стилі для форми входу */
.login {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
}
div {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
p {
  color: red;
}
</style>
