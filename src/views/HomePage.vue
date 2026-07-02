<!-- src/views/HomePage.vue -->
<template>
  <div class="home-container" id="home">
    <div class="terminal-header">
      <div class="terminal-title">
        <span class="prompt">~/portfolio $</span>
        <span class="command">./hello_world.sh</span>
        <span class="cursor">_</span>
      </div>
      <div class="terminal-subtitle">Welcome. You are visitor <span class="visitor-count">#{{ visitorId }}</span></div>
    </div>

    <div class="content-wrapper">
      <div class="bento-grid">
        <div class="terminal-card profile-card">
          <div class="card-header">
            <span class="card-led active" aria-label="Active"></span>
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
            <span class="card-led active" aria-label="Active"></span>
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
            <span class="card-led active" aria-label="Active"></span>
            <span class="card-title">[CONTACT]</span>
          </div>
          <div class="card-body">
            <button @click="copyToClipboard(contacts.email)" class="terminal-line clickable" :aria-label="`Copy email: ${contacts.email}`">
              <span class="label">MAIL:</span>
              <span class="value">{{ contacts.email }}</span>
              <span class="copy-indicator" aria-hidden="true">[ COPY ]</span>
            </button>
            <button @click="copyToClipboard(contacts.phone)" class="terminal-line clickable" :aria-label="`Copy phone: ${contacts.phoneDisplay}`">
              <span class="label">TELE:</span>
              <span class="value">{{ contacts.phoneDisplay }}</span>
              <span class="copy-indicator" aria-hidden="true">[ COPY ]</span>
            </button>
            <a :href="contacts.linkedin" target="_blank" class="terminal-line clickable">
              <span class="label">LINK:</span>
              <span class="value">{{ contacts.linkedinDisplay }}</span>
            </a>
            <a :href="contacts.github" target="_blank" class="terminal-line clickable">
              <span class="label">CODE:</span>
              <span class="value">{{ contacts.githubDisplay }}</span>
            </a>
          </div>
        </div>

        <div class="terminal-card skills-card">
          <div class="card-header">
            <span class="card-led active" aria-label="Active"></span>
            <span class="card-title">[TECH_STACK]</span>
          </div>
          <div class="card-body">
            <div class="skill-column" v-for="group in skills" :key="group.category">
              <div class="skill-category">{{ group.category }}</div>
              <div class="skill-tags">
                <span class="skill-tag" v-for="item in group.items" :key="item">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="terminal-card experience-card">
          <div class="card-header">
            <span class="card-led active" aria-label="Active"></span>
            <span class="card-title">[EXPERIENCE]</span>
          </div>
          <div class="card-body">
            <div class="terminal-line">
              <span class="label">CURR:</span>
              <span class="value">PLOOM, INC. (FE ENGINEER)</span>
            </div>
            <div class="terminal-line">
              <span class="label">CURR:</span>
              <span class="value">MYSTAGE MUSIC (SWE)</span>
            </div>
            <div class="terminal-line">
              <span class="label">PREV:</span>
              <span class="value">AMAZON (SWE CAPSTONE)</span>
            </div>
            <div class="terminal-line">
              <span class="label">PREV:</span>
              <span class="value">PT ASTRA HONDA (INTERN)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bio-terminal">
        <div class="terminal-screen">
          <div class="screen-header">
            <span class="prompt">~/portfolio $</span>
            <span class="command">cat README.md</span>
          </div>
          <div class="screen-content">
            <div class="bio-divider">────────────────────────────────────────────────────────────────</div>
            <div class="bio-line">
              <span class="bio-label">[WHO]</span>
              <span class="bio-text">Software engineer and MS Computer Science graduate from Seattle University, based in Los Angeles.</span>
            </div>
            <div class="bio-line">
              <span class="bio-label">[DOES]</span>
              <span class="bio-text">Full-stack with a focus on mobile and cloud — Flutter, React Native, Firebase, AWS, and Azure. From greenfield startups to Amazon-scale infrastructure.</span>
            </div>
            <div class="bio-line">
              <span class="bio-label">[NOW]</span>
              <span class="bio-text">Shipping features at MyStage Music (SWE) and Ploom, Inc. (FE Engineer) — two very different products with the same underlying question: how do you make something people actually want to use?</span>
            </div>
            <div class="bio-line">
              <span class="bio-label">[BUILT]</span>
              <span class="bio-text">Bloom'n Brew — a coffee brewing logger co-built and published to the App Store. Offline-first, no accounts, just a focused tool that does one thing well.</span>
            </div>
            <div class="bio-line">
              <span class="bio-label">[OPEN]</span>
              <span class="bio-text">Roles where I can stay close to the product and the people building it.</span>
            </div>
            <div class="bio-divider">────────────────────────────────────────────────────────────────</div>
            <div class="bio-cursor"><span class="prompt">~/portfolio $</span> <span class="cursor">_</span></div>
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
import contacts from '@/data/contacts'
import skills from '@/data/skills'

export default {
  name: 'HomePage',
  data() {
    return {
      contacts,
      skills,
      showNotification: false,
      notificationTimeout: null,
      visitorId: (() => {
        try {
          const key = 'claurentia_visitor_id'
          let id = localStorage.getItem(key)
          if (!id) {
            id = String(Math.floor(1000 + Math.random() * 8999))
            localStorage.setItem(key, id)
          }
          return id
        } catch {
          return String(Math.floor(1000 + Math.random() * 8999))
        }
      })()
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
    radial-gradient(ellipse 80% 60% at 50% 40%, rgba(67, 198, 195, 0.08) 0%, transparent 70%),
    linear-gradient(rgba(128, 77, 55, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(128, 77, 55, 0.18) 1px, transparent 1px),
    var(--color-bg-dark);
  background-size: 100% 100%, 40px 40px, 40px 40px, 100% 100%;
  min-height: 100dvh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: calc(var(--nav-height) + 2.75rem) 2rem var(--section-bottom-padding);
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
  box-sizing: border-box;
}

.terminal-title {
  font-family: var(--font-mono);
  color: var(--color-terminal-green);
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.terminal-subtitle {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-terminal-green);
  opacity: 0.5;
  margin-top: 0.3rem;
  letter-spacing: 0.05em;
}

.visitor-count {
  color: var(--color-neon-teal);
  opacity: 1;
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
  background: rgba(128, 77, 55, 0.25);
  padding-left: 1rem;
  border-left: 2px solid var(--color-earth-olive);
  text-decoration: none;
}

.terminal-line .label {
  color: var(--color-neon-orange);
  min-width: 50px;
  font-size: 0.72rem;
  opacity: 0.6;
  letter-spacing: 0.05em;
}

.terminal-line .value {
  color: var(--color-terminal-green);
  font-size: 0.88rem;
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

/* Skills Card — tag grid layout */
.skills-card .card-body {
  flex-direction: row;
  gap: 1.5rem;
  align-items: flex-start;
}

.skill-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.skill-category {
  color: var(--color-neon-teal);
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 2px;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--color-earth-olive);
  text-shadow: 0 0 5px var(--color-neon-teal);
  white-space: nowrap;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.skill-tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-terminal-green);
  background: var(--color-bg-charcoal);
  border: 1px solid var(--color-earth-olive);
  padding: 0.2rem 0.5rem;
  letter-spacing: 0.03em;
  transition: all 0.15s ease;
  cursor: default;
}

.skill-tag:hover {
  border-color: var(--color-terminal-green);
  background: rgba(0, 255, 65, 0.08);
  box-shadow: 0 0 6px rgba(0, 255, 65, 0.25);
  color: var(--color-neon-teal);
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
  margin-bottom: 2.5rem;
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
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.screen-content {
  padding: 1.25rem 1.5rem;
  font-family: var(--font-mono);
}

.bio-divider {
  color: var(--color-earth-olive);
  font-size: 0.75rem;
  opacity: 0.5;
  overflow: hidden;
  white-space: nowrap;
  margin: 0.5rem 0;
}

.bio-line {
  display: flex;
  gap: 1.25rem;
  padding: 0.45rem 0;
  align-items: baseline;
}

.bio-label {
  color: var(--color-neon-teal);
  font-size: 0.78rem;
  min-width: 60px;
  flex-shrink: 0;
  letter-spacing: 0.05em;
  text-shadow: 0 0 5px var(--color-neon-teal);
}

.bio-text {
  color: var(--color-terminal-green);
  font-size: 0.88rem;
  line-height: 1.7;
  opacity: 0.9;
}

.bio-cursor {
  margin-top: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.88rem;
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
    flex-grow: 0;
  }
}


/* Mobile Layout (< 768px) */
@media (max-width: 768px) {
  .home-container {
    padding: calc(var(--nav-height) + 0.75rem) 0.75rem var(--section-bottom-padding);
  }

  /* Redesign the terminal header as a slim inline prompt on mobile */
  .terminal-header {
    background: none;
    border: none;
    border-left: 3px solid var(--color-neon-orange);
    box-shadow: none;
    padding: 0.4rem 0.75rem;
    margin-bottom: 1rem;
  }

  .terminal-title {
    font-size: 0.78rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 0.75rem;
    margin-bottom: 1rem;
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
    min-height: 180px;
  }

  /* Skill columns: 2-up on mobile */
  .skills-card .card-body {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .skills-card .skill-column {
    flex-basis: calc(50% - 0.4rem);
    flex-shrink: 0;
    flex-grow: 0;
  }

  /* Contact / identity values — allow wrapping */
  .terminal-line {
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .terminal-line .value {
    font-size: 0.78rem;
    word-break: break-all;
  }

  .terminal-line .label {
    font-size: 0.78rem;
  }

  .screen-content {
    padding: 1rem;
    font-size: 0.78rem;
  }

  .cassette-reel {
    gap: 1.5rem;
  }

  .reel {
    width: 28px;
    height: 28px;
  }

  .tape-line {
    width: 60px;
  }
}
</style>
