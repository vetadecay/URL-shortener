<!-- src/components/Url/UrlList.vue -->
<template>
  <div class="url-list">
    <h3>Ваші скорочені посилання</h3>
    <table v-if="urls.length > 0">
      <thead>
        <tr>
          <th>Оригінальна URL</th>
          <th>Коротка URL</th>
          <th>Перенаправлень</th>
          <th>Дата створення</th>
          <th>Деталі</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="url in urls" :key="url.short">
          <td><a :href="url.url" target="_blank">{{ url.url }}</a></td>
          <td><a :href="`${baseUrl}/${url.short}`" target="_blank">{{ url.short }}</a></td>
          <td>{{ url.redirects }}</td>
          <td>{{ formatDate(url.created_at) }}</td>
          <td><router-link :to="{ name: 'UrlDetails', params: { short: url.short } }">Переглянути</router-link></td>
        </tr>
      </tbody>
    </table>
    <p v-else>Ви ще не створили жодного скороченого посилання.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      baseUrl: 'http://localhost:8000', // Змінити на ваш базовий URL, якщо потрібно
    };
  },
  computed: {
    ...mapGetters(['getUrls']),
    urls() {
      console.log('Отримані URL:', this.getUrls); // Логування
      return this.getUrls;
    },
  },
  created() {
    this.fetchUrls();
  },
  methods: {
    ...mapActions(['fetchUrls']),
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
  },
};
</script>

<style scoped>
/* Стилі для списку URL */
.url-list table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
a {
  color: #3498db;
  text-decoration: none;
}
</style>
