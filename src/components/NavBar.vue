<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="nav-brand">
        <img src="../assets/Cl_brand.png" alt="CL" class="brand-logo">
      </div>
      <div class="nav-links">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#minigames">Minigames</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(
    to bottom,
    rgba(28, 36, 54, 0.95),
    rgba(18, 24, 38, 0.95)
  );
  padding: 0.8rem 2rem;
  margin: 1rem 2rem;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(163, 255, 187, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border: 1px solid rgba(163, 255, 187, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 10px;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-logo {
  height: 2.5rem;
  width: auto;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.brand-logo:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 3rem;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;
  letter-spacing: 0.5px;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(163, 255, 187, 0.7),
    rgba(115, 255, 160, 0.7)
  );
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: rgba(163, 255, 187, 0.9);
  text-shadow: 0 0 8px rgba(163, 255, 187, 0.3);
}

.nav-links a:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar {
    margin: 0.5rem 1rem;
    padding: 0.5rem 1rem;
  }
  
  .nav-links {
    gap: 2rem;
  }

  .nav-links a {
    font-size: 1rem;
  }
}
</style>
