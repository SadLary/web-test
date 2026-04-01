<template>
  <header class="header">
    <div class="header__left">
      <RouterLink to="/" class="header__logo">
        <img src="/src/assets/icons/logo_b.png" alt="Logo" width="38" height="38" />
      </RouterLink>

      <nav class="header__nav">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="header__link"
          active-class="header__link--active"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>

    <button class="header__user">
      <img src="/src/assets/icons/account_circle.png" alt="Logo" width="24" height="24" />
    </button>
  </header>
</template>

<script setup lang="ts">
interface NavLink {
  label: string
  to: string
}

const links: NavLink[] = [
  { label: 'Календарь',   to: '/' },
  { label: 'Результаты',  to: '/results' },
  { label: 'Рейтинги',    to: '/ratings' },
  { label: 'FencingOne',  to: '/fencingone' },
]
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #04171C;
}

.header__left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header__logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header__link {
  padding: 6px 10px;
  font-size: 16px;
  color: #95E3FA;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.3s;
}

.header__link:hover {
  color: #d0d5e0;
}

.header__link--active {
  color: #d0d5e0;
  font-weight: 600;
}

.header__user {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
}
</style>