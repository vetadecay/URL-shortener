<!-- src/components/Layout/Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">URL Shortener</router-link>
      <div class="navbar-links">
        <router-link to="/">Home</router-link>
        <div v-if="!isAuthenticated">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </div>
        <div v-else>
          <router-link to="/dashboard">Dashboard</router-link>
          <a href="#" @click.prevent="handleLogout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>
/* Стилі для навігаційної панелі */
.navbar {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  color: #fff;
  font-size: 1.5em;
  text-decoration: none;
}

.navbar-links a {
  color: #fff;
  margin-left: 15px;
  text-decoration: none;
}

.navbar-links a:hover {
  text-decoration: underline;
}
</style>
