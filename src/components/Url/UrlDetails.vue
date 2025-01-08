<!-- src/components/Url/UrlDetails.vue -->
<template>
  <div class="url-details">
    <h2>Деталі Посилання</h2>
    <p><strong>Оригінальна URL:</strong> <a :href="url.url" target="_blank">{{ url.url }}</a></p>
    <p><strong>Коротка URL:</strong> <a :href="`${baseUrl}/${url.short}`" target="_blank">{{ url.short }}</a></p>
    <p><strong>Перенаправлень:</strong> {{ url.redirects }}</p>
    <p><strong>Дата створення:</strong> {{ formatDate(url.created_at) }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UrlDetails',
  data() {
    return {
      baseUrl: 'http://localhost:8000', // Змінити на ваш базовий URL, якщо потрібно
    };
  },
  computed: {
    ...mapGetters(['getUrls']),
    url() {
      const short = this.$route.params.short;
      return this.getUrls.find(u => u.short === short) || {};
    },
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
  },
};
</script>

<style scoped>
/* Стилі для деталей посилання */
.url-details {
  padding: 2rem;
}
p {
  margin: 1rem 0;
}
a {
  color: #3498db;
  text-decoration: none;
}
</style>
