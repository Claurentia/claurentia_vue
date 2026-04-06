<!-- src/components/Home.vue -->
<template>
  <div class="home-container" id="home">
    <div class="terminal-header">
      <div class="terminal-title">
        <span class="prompt">C:\USERS\VISITOR></span>
        <span class="command typing-text">RUN PROFILE.EXE</span>
        <span class="cursor">_</span>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="bento-grid">
        <div class="terminal-card profile-card">
          <div class="card-header">
            <span class="card-led active"></span>
            <span class="card-title">[PROFILE.IMG]</span>
          </div>
          <div class="card-body profile-body">
            <div class="crt-frame">
              <div class="profile-image-container">
                <img src="../assets/profile.jpg" alt="Profile" class="profile-image">
              </div>
              <div class="scan-overlay"></div>
            </div>
          </div>
        </div>

        <div class="terminal-card identity-card">
          <div class="card-header">
            <span class="card-led active"></span>
            <span class="card-title">[IDENTITY]</span>
          </div>
          <div class="card-body">
            <div class="terminal-line">
              <span class="label">NAME:</span>
              <span class="value glow-text">CARMEL LAURENTIA</span>
            </div>
            <div class="terminal-line">
              <span class="label">ROLE:</span>
              <span class="value">SOFTWARE ENGINEER</span>
            </div>
            <div class="terminal-line">
              <span class="label">EDU_:</span>
              <span class="value">MS COMPUTER SCIENCE</span>
            </div>
            <div class="terminal-line">
              <span class="label">STAT:</span>
              <span class="value status-active">[ ACTIVE ]</span>
            </div>
          </div>
        </div>

        <div class="terminal-card contact-card">
          <div class="card-header">
            <span class="card-led active"></span>
            <span class="card-title">[CONTACT]</span>
          </div>
          <div class="card-body">
            <button @click="copyToClipboard('carmel.laurentia@gmail.com')" class="terminal-line clickable">
              <span class="label">MAIL:</span>
              <span class="value">carmel.laurentia@gmail.com</span>
              <span class="copy-indicator">[ COPY ]</span>
            </button>
            <button @click="copyToClipboard('+19099148520')" class="terminal-line clickable">
              <span class="label">TELE:</span>
              <span class="value">+1 (909) 914-8520</span>
              <span class="copy-indicator">[ COPY ]</span>
            </button>
            <a href="https://linkedin.com/in/carmel-laurentia-385292225" target="_blank" class="terminal-line clickable">
              <span class="label">LINK:</span>
              <span class="value">linkedin.com/carmel-laurentia</span>
            </a>
            <a href="https://github.com/claurentia" target="_blank" class="terminal-line clickable">
              <span class="label">CODE:</span>
              <span class="value">github.com/claurentia</span>
            </a>
          </div>
        </div>

        <div class="terminal-card skills-card">
          <div class="card-header">
            <span class="card-led active"></span>
            <span class="card-title">[TECH_STACK]</span>
          </div>
          <div class="card-body">
            <div class="skill-column">
              <div class="skill-category">LANGUAGES</div>
              <div class="skill-bar">
                <span class="skill-label">PYTHON______</span>
                <div class="bar"><div class="fill" style="width: 90%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">JS/TS_______</span>
                <div class="bar"><div class="fill" style="width: 92%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">C/C++/C#____</span>
                <div class="bar"><div class="fill" style="width: 85%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">HTML/CSS____</span>
                <div class="bar"><div class="fill" style="width: 93%"></div></div>
              </div>
            </div>
            <div class="skill-column">
              <div class="skill-category">FRAMEWORKS</div>
              <div class="skill-bar">
                <span class="skill-label">FLUTTER_____</span>
                <div class="bar"><div class="fill" style="width: 95%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">REACT_______</span>
                <div class="bar"><div class="fill" style="width: 90%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">NODE.JS_____</span>
                <div class="bar"><div class="fill" style="width: 88%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">.NET________</span>
                <div class="bar"><div class="fill" style="width: 80%"></div></div>
              </div>
            </div>
            <div class="skill-column">
              <div class="skill-category">DATABASE</div>
              <div class="skill-bar">
                <span class="skill-label">MONGODB_____</span>
                <div class="bar"><div class="fill" style="width: 85%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">MYSQL_______</span>
                <div class="bar"><div class="fill" style="width: 83%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">FIREBASE____</span>
                <div class="bar"><div class="fill" style="width: 87%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">SQLITE______</span>
                <div class="bar"><div class="fill" style="width: 80%"></div></div>
              </div>
            </div>
            <div class="skill-column">
              <div class="skill-category">CLOUD/TOOLS</div>
              <div class="skill-bar">
                <span class="skill-label">GOOGLE CLOUD_</span>
                <div class="bar"><div class="fill" style="width: 92%"></div></div>
              </div>
                <div class="skill-bar">
                <span class="skill-label">AWS/AZURE___</span>
                <div class="bar"><div class="fill" style="width: 85%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">GIT_________</span>
                <div class="bar"><div class="fill" style="width: 90%"></div></div>
              </div>
              <div class="skill-bar">
                <span class="skill-label">FIGMA_______</span>
                <div class="bar"><div class="fill" style="width: 82%"></div></div>
              </div>
            </div>
          </div>
        </div>

        <div class="terminal-card experience-card">
          <div class="card-header">
            <span class="card-led active"></span>
            <span class="card-title">[EXPERIENCE]</span>
          </div>
          <div class="card-body">
            <div class="terminal-line">
              <span class="label">CURR:</span>
              <span class="value">SEATTLE UNIVERSITY (TA)</span>
            </div>
            <div class="terminal-line">
              <span class="label">PREV:</span>
              <span class="value">MYSTAGE MUSIC (LEAD)</span>
            </div>
            <div class="terminal-line">
              <span class="label">PREV:</span>
              <span class="value">AMAZON (SWE INTERN)</span>
            </div>
            <div class="terminal-line">
              <span class="label">PREV:</span>
              <span class="value">PT ASTRA HONDA (SECURITY)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bio-terminal">
        <div class="terminal-screen">
          <div class="screen-header">
            <span>BIOGRAPHY.TXT</span>
            <span class="screen-controls">
              <span class="control-btn">─</span>
              <span class="control-btn">□</span>
              <span class="control-btn">×</span>
            </span>
          </div>
          <div class="screen-content">
            <p class="bio-paragraph">
              > Software Engineer pursuing my Master's in Computer Science at Seattle University, where I'm also serving as a Teaching Assistant. Most recently, I led cross-functional development teams at MyStage Music, a startup focused on empowering local artists through technology.
            </p>
            <p class="bio-paragraph">
              > My journey into tech leadership started with hands-on full-stack development—from building AI-powered customer feedback systems at Amazon to gaining hands-on experience in penetration testing and vulnerability assessment at PT Astra Honda Motor.
            </p>
            <p class="bio-paragraph">
              > I specialize in modern web technologies (React, Node.js, Python) and cloud platforms (AWS, Azure), but my real strength is adaptability—quickly learning new tools and translating complex business needs into scalable technical solutions.
            </p>
            <p class="bio-paragraph">
              > Currently seeking opportunities in early-stage startups where I can contribute to mission-driven products while growing as both an engineer and leader.
            </p>
            <div class="cassette-reel">
              <div class="reel left-reel"></div>
              <div class="tape-line"></div>
              <div class="reel right-reel"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="copy-notification" :class="{ show: showNotification }">
      <span class="notif-icon">[√]</span> DATA COPIED TO BUFFER
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      showNotification: false,
      notificationTimeout: null
    }
  },
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyNotification()
      })
    },
    showCopyNotification() {
      if (this.notificationTimeout) {
        clearTimeout(this.notificationTimeout)
      }
      this.showNotification = true
      this.notificationTimeout = setTimeout(() => {
        this.showNotification = false
      }, 2000)
    }
  },
  beforeUnmount() {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout)
    }
  }
}
</script>

<style scoped>
.home-container {
  background:
    linear-gradient(45deg, transparent 48%, var(--color-earth-olive) 49%, var(--color-earth-olive) 51%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, var(--color-earth-olive) 49%, var(--color-earth-olive) 51%, transparent 52%),
    var(--color-bg-dark);
  background-size: 20px 20px, 20px 20px, 100% 100%;
  background-position: 0 0, 10px 10px, 0 0;
  min-height: 100dvh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 10rem;
  padding-bottom: 2rem;
  overflow-y: auto;
}

/* Terminal Header - Non-sticky */
.terminal-header {
  background: var(--color-bg-charcoal);
  border: 2px solid var(--color-terminal-green);
  padding: 1rem 2rem;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  margin-bottom: 2rem;
  max-width: 1400px;
  width: 100%;
}

.terminal-title {
  font-family: var(--font-mono);
  color: var(--color-terminal-green);
  font-size: 1rem;
}

.prompt {
  color: var(--color-neon-orange);
}

.command {
  color: var(--color-terminal-green);
  margin-left: 0.5rem;
}

.cursor {
  animation: blink-cursor 1s infinite;
  color: var(--color-terminal-green);
}

@keyframes blink-cursor {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.content-wrapper {
  max-width: 1400px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* --- BENTO GRID LAYOUT --- */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(160px, auto);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* --- MODIFIED: CARD GRID POSITIONING (Desktop) --- */
/* Profile Card: 1x2 (tall) */
.profile-card {
  grid-column: 1 / 2;
  grid-row: 1 / 3; /* Spans 2 rows */
}

/* Identity Card: 1x1 */
.identity-card {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

/* Contact Card: 1x1 */
.contact-card {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}

/* Experience Card: 2x1 */
.experience-card {
  grid-column: 2 / 4; /* Spans 2 columns */
  grid-row: 2 / 3;
}

/* Skills Card: 3x1 (full width) */
.skills-card {
  grid-column: 1 / 4; /* Spans 3 columns */
  grid-row: 3 / 4;
}
/* --- END MODIFICATIONS --- */


.terminal-card {
  background: var(--color-bg-dark);
  border: 2px solid var(--color-terminal-green);
  box-shadow:
    0 0 15px rgba(0, 255, 65, 0.2),
    inset 0 0 20px rgba(0, 0, 0, 0.8);
  position: relative;
  display: flex;
  flex-direction: column;
}

.card-header {
  background: var(--color-bg-charcoal);
  border-bottom: 1px solid var(--color-terminal-green);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-led {
  width: 8px;
  height: 8px;
  background: var(--color-red-error);
  border-radius: 50%;
  box-shadow: 0 0 5px var(--color-red-error);
}

.card-led.active {
  background: var(--color-terminal-green);
  box-shadow: 0 0 10px var(--color-terminal-green);
  animation: pulse-led 2s infinite;
}

@keyframes pulse-led {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.card-title {
  font-family: var(--font-mono);
  color: var(--color-terminal-green);
  font-size: 0.9rem;
  letter-spacing: 2px;
}

.card-body {
  padding: 1rem;
  font-family: var(--font-mono);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.terminal-line {
  display: flex;
  gap: 1rem;
  padding: 0.4rem 0;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-family: var(--font-mono);
  cursor: default;
  position: relative;
  align-items: center;
}

.terminal-line.clickable {
  cursor: pointer;
  transition: all 0.1s;
}

.terminal-line.clickable:hover {
  background: var(--color-earth-olive);
  padding-left: 1rem;
  text-decoration: none;
}

.terminal-line .label {
  color: var(--color-neon-orange);
  min-width: 50px;
  font-size: 0.85rem;
}

.terminal-line .value {
  color: var(--color-terminal-green);
  font-size: 0.85rem;
  flex: 1;
}

.terminal-line a {
  color: inherit;
  text-decoration: none;
}

.copy-indicator {
  color: var(--color-neon-teal);
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.terminal-line.clickable:hover .copy-indicator {
  opacity: 1;
}

.status-active {
  color: var(--color-terminal-green) !important;
  text-shadow: 0 0 5px var(--color-terminal-green);
}

/* --- MODIFIED: Skills Card Styling --- */
.skills-card .card-body {
  flex-direction: row; /* Overrides default column direction */
  gap: 2rem; /* Space between the four columns */
  justify-content: space-around;
}

.skill-column {
  flex: 1; /* Each column takes up equal space */
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Space between skill bars within a column */
}

.skill-category {
  color: var(--color-neon-teal);
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--color-earth-olive);
  text-shadow: 0 0 5px var(--color-neon-teal);
}
/* --- END MODIFICATIONS --- */


/* Skill Bars */
.skill-bar {
  margin: 0.5rem 0;
}

.skill-label {
  color: var(--color-neon-orange);
  font-size: 0.8rem;
  display: block;
  margin-bottom: 0.3rem;
}

.bar {
  background: var(--color-bg-charcoal);
  height: 12px;
  border: 1px solid var(--color-earth-olive);
  position: relative;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: var(--color-terminal-green);
  box-shadow: 0 0 10px var(--color-terminal-green);
  transition: width 1s ease;
  position: relative;
}

.fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.3) 2px,
    rgba(0, 0, 0, 0.3) 4px
  );
}

/* Profile Picture Card */
.profile-body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
}

.crt-frame {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-charcoal);
  border: 3px solid var(--color-earth-olive);
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

.profile-image-container {
  width: 80%;
  height: 80%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid var(--color-terminal-green);
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  filter: contrast(1.1) brightness(0.9);
  border-radius: 4px;
}

.scan-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0, 255, 65, 0.05) 3px,
    rgba(0, 255, 65, 0.05) 6px
  );
  pointer-events: none;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* Bio Terminal */
.bio-terminal {
  width: 100%;
}

.terminal-screen {
  background: var(--color-bg-dark);
  border: 3px solid var(--color-terminal-green);
  box-shadow:
    0 0 20px rgba(0, 255, 65, 0.3),
    inset 0 0 30px rgba(0, 0, 0, 0.9);
}

.screen-header {
  background: var(--color-bg-charcoal);
  border-bottom: 2px solid var(--color-terminal-green);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  color: var(--color-terminal-green);
  font-size: 0.9rem;
}

.screen-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  color: var(--color-neon-orange);
  cursor: pointer;
}

.screen-content {
  padding: 1.5rem;
  font-family: var(--font-mono);
  color: var(--color-terminal-green);
  font-size: 0.9rem;
  line-height: 1.8;
}

.bio-paragraph {
  margin-bottom: 1rem;
  text-align: justify;
}

/* Animated Cassette Reel */
.cassette-reel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  padding: 1rem 0;
}

.reel {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-terminal-green);
  border-radius: 50%;
  position: relative;
}

.reel::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
  background: var(--color-terminal-green);
  border-radius: 50%;
}

.right-reel {
  animation: spin-reel 3s linear infinite;
}

@keyframes spin-reel {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.tape-line {
  width: 100px;
  height: 3px;
  background: var(--color-amber);
  box-shadow: 0 0 5px var(--color-amber);
}

/* Copy Notification */
.copy-notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--color-bg-charcoal);
  color: var(--color-terminal-green);
  padding: 0.8rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
  border: 2px solid var(--color-terminal-green);
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
  z-index: 10000;
  letter-spacing: 1px;
}

.copy-notification.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.notif-icon {
  color: var(--color-terminal-green);
  font-weight: bold;
}

/* --- RESPONSIVE DESIGN --- */

/* Tablet Layout (769px - 1024px) */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(140px, auto);
  }

  /* Reset all cards to span 1 column/row */
  .profile-card,
  .identity-card,
  .contact-card {
    grid-column: span 1;
    grid-row: span 1;
  }

  /* Skills and Experience cards span full width (2 columns) */
  .skills-card,
  .experience-card {
    grid-column: span 2;
    grid-row: span 1;
  }

  /* Skills: 2 columns on tablet */
  .skills-card .card-body {
    flex-wrap: wrap;
  }

  .skills-card .skill-column {
    flex-basis: calc(50% - 1rem);
  }
}


/* Mobile Layout (< 768px) */
@media (max-width: 768px) {
  .home-container {
    padding-top: 8rem;
  }

  .terminal-header {
    width: 90%;
    padding: 0.8rem 1rem;
  }

  .terminal-title {
    font-size: 0.8rem;
  }

  .content-wrapper {
    padding: 1rem;
  }

  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
  }

  .profile-card,
  .identity-card,
  .contact-card,
  .skills-card,
  .experience-card {
    grid-column: span 1;
    grid-row: span 1;
  }

  .profile-card {
    min-height: 200px;
  }
  
  /* MODIFIED: Merge skill columns on mobile */
  .skills-card .card-body {
    flex-direction: column;
    gap: 0;
  }

  .screen-content {
    padding: 1rem;
    font-size: 0.8rem;
  }

  .cassette-reel {
    gap: 1.5rem;
  }

  .reel {
    width: 30px;
    height: 30px;
  }

  .tape-line {
    width: 60px;
  }
}
</style>