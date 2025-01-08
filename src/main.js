// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

const app = createApp(App);

// Налаштування базового URL для axios
axios.defaults.baseURL = 'http://localhost:8000'; // Змінити на ваш бекенд URL, якщо потрібно

// Додавання авторизаційного заголовка до всіх запитів, якщо є токен
axios.interceptors.request.use(
  config => {
    const token = store.state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

app.use(router);
app.use(store);

// Ініціалізація стану
store.dispatch('initialize');

app.mount('#app');
