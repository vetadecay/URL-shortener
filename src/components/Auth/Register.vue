<!-- src/components/Auth/Register.vue -->
<template>
  <div class="register">
    <h2>Реєстрація</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label>Ім'я користувача:</label>
        <input v-model="username" required minlength="3" maxlength="20" pattern="[a-zA-Z0-9_]+" />
      </div>
      <div>
        <label>Пароль:</label>
        <input type="password" v-model="password" required minlength="8" />
      </div>
      <div>
        <label>Повне ім'я:</label>
        <input v-model="fullName" maxlength="64" />
      </div>
      <button type="submit">Зареєструватися</button>
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
      fullName: '',
      error: '',
    };
  },
  methods: {
    ...mapActions(['register']),
    async handleRegister() {
      try {
        await this.register({
          username: this.username,
          password: this.password,
          full_name: this.fullName,
        });
        this.$router.push({ name: 'Login' });
      } catch (err) {
        this.error = err.response?.data?.detail || 'Помилка реєстрації';
      }
    },
  },
};
</script>

<style scoped>
/* Додайте стилі для форми реєстрації */
.register {
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
