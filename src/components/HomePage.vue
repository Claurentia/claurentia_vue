<!-- src/components/Home.vue -->
<template>
  <div class="home-container" id="home">
    <div class="content-wrapper">
      <div class="summary-box">
        <h1>Carmel Laurentia</h1>
        <p>
          Software Engineer passionate about creating elegant solutions to complex problems.
          Experienced in full-stack development with expertise in modern web technologies.
        </p>
        <!-- Add more summary content as needed -->
      </div>
      <div class="profile-circle">
        <div class="image-container">
          <img src="../assets/profile.jpg" alt="Profile" class="profile-image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>

.home-container {
  background-image: url('../assets/foxhillaurora.png');
  background-size: cover;
  background-position: center;
  height: 100dvh;
  display: flex;
  align-items: flex-start;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 20dvh auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.summary-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.summary-box h1 {
  color: #2c3e50;
}

.summary-box p {
  line-height: 1.6;
  color: #34495e;
}

.profile-circle {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    rgba(28, 36, 54, 0.95),
    rgba(18, 24, 38, 0.95)
  );
  position: relative;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(163, 255, 187, 0.2);
  border: 2px solid rgba(163, 255, 187, 0.25);
  overflow: visible;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.profile-circle::before,
.profile-circle::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  border: 1px solid rgba(36, 243, 200, 0.3);
  filter: blur(5px);
  box-shadow: 
    0 0 12px rgba(36, 243, 200, 0.4),
    inset 0 0 12px rgba(36, 243, 200, 0.4);
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    rgba(36, 243, 200, 0.2) 0%,
    transparent 70%
  );
  z-index: 1;
}

.profile-circle::before {
  animation: sineWave1 8s ease-in-out infinite;
}

.profile-circle::after {
  animation: sineWave2 10s ease-in-out infinite;
  filter: blur(8px);
  animation-delay: 2.5s;
}

@keyframes sineWave1 {
  0% {
    transform: scale(1.05);
    opacity: 0.9;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  25% {
    transform: scale(1.15);
    opacity: 0.7;
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
  50% {
    transform: scale(1.25);
    opacity: 0.5;
    border-radius: 40% 60% 30% 70% / 70% 30% 50% 40%;
  }
  75% {
    transform: scale(1.15);
    opacity: 0.7;
    border-radius: 70% 30% 50% 40% / 30% 50% 60% 70%;
  }
  100% {
    transform: scale(1.05);
    opacity: 0.9;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
}

@keyframes sineWave2 {
  0% {
    transform: scale(1.05);
    opacity: 0.9;
    border-radius: 70% 30% 50% 40% / 30% 60% 40% 70%;
  }
  25% {
    transform: scale(1.15);
    opacity: 0.7;
    border-radius: 40% 70% 30% 60% / 60% 30% 70% 40%;
  }
  50% {
    transform: scale(1.25);
    opacity: 0.5;
    border-radius: 30% 60% 70% 40% / 40% 70% 30% 60%;
  }
  75% {
    transform: scale(1.15);
    opacity: 0.7;
    border-radius: 60% 30% 40% 70% / 50% 40% 60% 30%;
  }
  100% {
    transform: scale(1.05);
    opacity: 0.9;
    border-radius: 70% 30% 50% 40% / 30% 60% 40% 70%;
  }
}

/* Third wave animation */
.profile-circle::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 1px solid rgba(36, 243, 200, 0.3);
  filter: blur(6px);
  animation: sineWave3 9s ease-in-out infinite;
  animation-delay: 5s;
  opacity: 0.8;
  box-shadow: 
    0 0 15px rgba(36, 243, 200, 0.5),
    inset 0 0 15px rgba(36, 243, 200, 0.5);
}

@keyframes sineWave3 {
  0% {
    transform: scale(1.05);
    border-radius: 50% 60% 40% 70% / 40% 70% 30% 60%;
  }
  25% {
    transform: scale(1.15);
    border-radius: 40% 70% 50% 30% / 70% 30% 60% 40%;
  }
  50% {
    transform: scale(1.25);
    border-radius: 30% 50% 70% 40% / 50% 60% 30% 70%;
  }
  75% {
    transform: scale(1.15);
    border-radius: 60% 30% 40% 70% / 30% 70% 50% 40%;
  }
  100% {
    transform: scale(1.05);
    border-radius: 50% 60% 40% 70% / 40% 70% 30% 60%;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    gap: 2rem;
  }

  .summary-box {
    max-width: 100%;
  }

  .profile-circle {
    width: 200px;
    height: 200px;
  }
}
</style>