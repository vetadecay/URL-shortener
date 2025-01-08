<!-- src/components/Url/CreateUrl.vue -->
<template>
  <div class="create-url">
    <h3>Створити коротке посилання</h3>
    <form @submit.prevent="handleCreateUrl">
      <div>
        <label>Ваша URL:</label>
        <input v-model="url" type="url" required />
      </div>
      <button type="submit">Скоротити</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      url: '',
      error: '',
    };
  },
  methods: {
    ...mapActions(['createUrl']),
    async handleCreateUrl() {
      try {
        console.log('Скорочення URL:', this.url); // Логування
        const newUrl = await this.createUrl({ url: this.url });
        console.log('Нове скорочене посилання:', newUrl); // Логування
        this.url = '';
      } catch (err) {
        console.error('Помилка при створенні URL:', err); // Логування
        this.error = err.response?.data?.detail || 'Помилка створення URL';
      }
    },
  },
};
</script>

<style scoped>
/* Стилі для створення URL */
.create-url {
  margin-bottom: 2rem;
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
