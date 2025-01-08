// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';
import qs from 'qs'; // Додано для формування запитів у форматі form-urlencoded

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: null,
    urls: [],
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
      console.log('Мутація SET_TOKEN:', token);
    },
    SET_USER(state, user) {
      state.user = user;
      console.log('Мутація SET_USER:', user);
    },
    SET_URLS(state, urls) {
      state.urls = urls;
      console.log('Мутація SET_URLS:', urls);
    },
    ADD_URL(state, url) {
      console.log('Додається нове посилання:', url); // Логування для дебагу
      state.urls.unshift(url); // Додає нове посилання на початок списку
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        console.log('Реєстрація користувача:', userData); // Логування
        const response = await axios.post('/api/register', userData);
        console.log('Відповідь від реєстрації:', response.data); // Логування
        // Можна автоматично авторизувати користувача після реєстрації
        // Наприклад, виконати логін
      } catch (error) {
        console.error('Помилка реєстрації:', error.response?.data || error); // Логування
        throw error;
      }
    },
    async login({ commit }, credentials) {
      try {
        console.log('Спроба логіну:', credentials); // Логування
        const response = await axios.post(
          '/api/login',
          qs.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log('Відповідь від логіну:', response.data); // Логування
        commit('SET_TOKEN', response.data.access_token);
        // Отримати інформацію про користувача
        const user = await axios.get('/api/me', {
          headers: { Authorization: `Bearer ${response.data.access_token}` },
        });
        console.log('Отримана інформація про користувача:', user.data); // Логування
        commit('SET_USER', user.data);
      } catch (error) {
        console.error('Помилка логіну:', error.response?.data || error); // Логування
        throw error;
      }
    },
    logout({ commit }) {
      console.log('Вихід користувача'); // Логування
      commit('SET_TOKEN', '');
      commit('SET_USER', null);
      commit('SET_URLS', []);
    },
    async fetchUrls({ commit, state }) {
      try {
        console.log('Отримання списку URL з бекенду'); // Логування
        const response = await axios.get('/api/me/urls', {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        console.log('Отримані URL:', response.data); // Логування
        commit('SET_URLS', response.data);
      } catch (error) {
        console.error('Помилка отримання URL:', error.response?.data || error); // Логування
        throw error;
      }
    },
    async createUrl({ commit, state }, urlData) {
      try {
        console.log('Відправка запиту для створення URL:', urlData); // Логування
        const response = await axios.post('/api/me/urls', urlData, {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        console.log('Отримана відповідь від бекенду:', response.data); // Логування
        commit('ADD_URL', response.data);
        return response.data; // Повертаємо дані для подальшої обробки
      } catch (error) {
        console.error('Помилка при створенні URL:', error.response?.data || error); // Логування
        throw error;
      }
    },
    async initialize({ commit, state }) {
      if (state.token) {
        try {
          console.log('Ініціалізація стану користувача з токеном:', state.token); // Логування
          const user = await axios.get('/api/me', {
            headers: { Authorization: `Bearer ${state.token}` },
          });
          console.log('Отримана інформація про користувача:', user.data); // Логування
          commit('SET_USER', user.data);
        } catch (err) {
          console.error('Помилка при ініціалізації стану:', err.response?.data || err); // Логування
          commit('SET_TOKEN', '');
          commit('SET_USER', null);
        }
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
    getUrls: state => state.urls,
  },
});

export default store;
