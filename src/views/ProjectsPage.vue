<template>
  <div class="projects-container" id="projects">
    <!-- Section Header -->
    <div class="arcade-header">
      <div class="header-line"></div>
      <h2 class="section-title glow-text">[ TRACK_LIST.SYS ]</h2>
      <div class="header-line"></div>
    </div>

    <!-- Horizontal Scrolling Track List -->
    <div class="tracks-wrapper">
      <div class="projects-grid" ref="projectsGrid">
        <!-- Track Card -->
        <div class="track-card"
             v-for="(project, index) in projects"
             :key="index"
             :class="{ expanded: expandedProjects[index] }">

          <!-- Track Header -->
          <div class="track-header">
            <div class="track-number">{{ 'TRACK_' + (index + 1).toString().padStart(2, '0') }}</div>
            <div class="track-led" :class="{ active: index === currentTrack - 1 }"></div>
          </div>

          <!-- Track Info Panel -->
          <div class="track-info">
            <div class="track-title-bar">
              <span class="track-label">TITLE:</span>
              <span class="track-value">{{ project.title.toUpperCase() }}</span>
            </div>

            <!-- Description with typewriter effect on hover -->
            <div class="track-description"
                 :ref="el => { if (el) descRefs[index] = el }"
                 :class="{ expanded: expandedProjects[index] }">
              <span class="desc-prompt">></span>
              <span class="desc-text">
                {{ project.description }}
              </span>
            </div>

            <button
              v-if="overflowMap[index]"
              @click="toggleDescription(index)"
              class="expand-btn"
            >
              {{ expandedProjects[index] ? '[COLLAPSE]' : '[EXPAND...]' }}
            </button>

            <!-- Tech Stack as Terminal Tags -->
            <div class="tech-display">
              <div class="tech-label">TECH_STACK:</div>
              <div class="tech-tags">
                <span v-for="(tech, techIndex) in project.technologies"
                      :key="techIndex"
                      class="tech-chip">
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="track-actions">
              <a v-if="project.github"
                 :href="project.github"
                 target="_blank"
                 rel="noopener"
                 class="action-btn">
                <span class="btn-bracket">[</span> VIEW_SOURCE <span class="btn-bracket">]</span>
              </a>
            </div>
          </div>

          <!-- Cassette Tape Hiss Effect -->
          <div class="tape-hiss"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projects from '@/data/projects'

export default {
  name: 'ProjectsPage',
  data() {
    return {
      expandedProjects: Array(projects.length).fill(false),
      overflowMap: Array(projects.length).fill(false),
      currentTrack: 1,
      projects,
      descRefs: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setupOverflowObservers()
    })
  },
  beforeUnmount() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
    }
  },
  methods: {
    setupOverflowObservers() {
      this._resizeObserver = new ResizeObserver(() => {
        this.checkOverflow()
      })
      this.descRefs.forEach(el => {
        if (el) this._resizeObserver.observe(el)
      })
      this.checkOverflow()
    },
    checkOverflow() {
      const newMap = [...this.overflowMap]
      this.descRefs.forEach((el, index) => {
        if (el && !this.expandedProjects[index]) {
          newMap[index] = el.scrollHeight > el.clientHeight
        }
      })
      this.overflowMap = newMap
    },
    toggleDescription(index) {
      const newExpandedProjects = [...this.expandedProjects]
      newExpandedProjects[index] = !newExpandedProjects[index]
      this.expandedProjects = newExpandedProjects
      // Re-check overflow after collapsing
      if (!newExpandedProjects[index]) {
        this.$nextTick(() => this.checkOverflow())
      }
    },
    scrollProjects(direction) {
      const grid = this.$refs.projectsGrid
      if (!grid) return

      const scrollAmount = 400
      if (direction === 'left') {
        grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        if (this.currentTrack > 1) this.currentTrack--
      } else {
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        if (this.currentTrack < this.projects.length) this.currentTrack++
      }
    }
  }
}
</script>

<style scoped>
.projects-container {
  min-height: 100dvh;
  padding: 10rem 2rem 4rem;
  background:
    repeating-linear-gradient(
      90deg,
      var(--color-bg-dark) 0px,
      var(--color-bg-dark) 2px,
      var(--color-bg-charcoal) 2px,
      var(--color-bg-charcoal) 4px
    );
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Section Header */
.arcade-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 1400px;
}

.header-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-terminal-green),
    transparent
  );
  box-shadow: 0 0 10px var(--color-terminal-green);
}

.section-title {
  font-family: var(--font-retro);
  color: var(--color-terminal-green);
  font-size: 2.5rem;
  letter-spacing: 5px;
  white-space: nowrap;
  margin: 0;
}

/* Tracks Wrapper */
.tracks-wrapper {
  width: 100%;
  max-width: 1400px;
  position: relative;
}

.projects-grid {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 2rem 1rem;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

/* Hide scrollbar but keep functionality */
.projects-grid::-webkit-scrollbar {
  height: 8px;
}

.projects-grid::-webkit-scrollbar-track {
  background: var(--color-bg-dark);
  border: 1px solid var(--color-earth-olive);
}

.projects-grid::-webkit-scrollbar-thumb {
  background: var(--color-terminal-green);
  box-shadow: 0 0 5px var(--color-terminal-green);
}

/* Track Card */
.track-card {
  min-width: 450px;
  max-width: 450px;
  background: var(--color-bg-dark);
  border: 3px solid var(--color-terminal-green);
  box-shadow:
    0 0 15px rgba(0, 255, 65, 0.2),
    inset 0 0 20px rgba(0, 0, 0, 0.9);
  scroll-snap-align: start;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.track-card.expanded {
  min-height: auto;
}

.track-card:hover {
  box-shadow:
    0 0 25px rgba(0, 255, 65, 0.4),
    inset 0 0 20px rgba(0, 0, 0, 0.9);
  transform: translateY(-5px);
}

/* Track Header */
.track-header {
  background: var(--color-bg-charcoal);
  border-bottom: 2px solid var(--color-terminal-green);
  padding: 0.8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.track-number {
  font-family: var(--font-retro);
  color: var(--color-neon-orange);
  font-size: 1.2rem;
  letter-spacing: 2px;
}

.track-led {
  width: 12px;
  height: 12px;
  background: var(--color-red-error);
  border-radius: 50%;
  box-shadow: 0 0 5px var(--color-red-error);
}

.track-led.active {
  background: var(--color-terminal-green);
  box-shadow: 0 0 15px var(--color-terminal-green);
  animation: pulse-led 1.5s infinite;
}

/* Track Info */
.track-info {
  padding: 1.5rem;
  font-family: var(--font-mono);
  display: flex;
  flex-direction: column;
  flex: 1;
}

.track-title-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-earth-olive);
}

.track-label {
  color: var(--color-neon-orange);
  font-size: 0.9rem;
}

.track-value {
  color: var(--color-terminal-green);
  font-size: 0.9rem;
  text-shadow: 0 0 5px var(--color-terminal-green);
}

.track-description {
  color: var(--color-terminal-green);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.track-description.expanded {
  display: block;
  overflow: visible;
  -webkit-line-clamp: unset;
}

.desc-prompt {
  color: var(--color-neon-orange);
  margin-right: 0.5rem;
}

.desc-text {
  color: var(--color-terminal-green);
}

.expand-btn {
  background: none;
  border: none;
  color: var(--color-neon-teal);
  font-family: var(--font-mono);
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 0.8rem;
  transition: all 0.1s;
  display: block;
  margin-bottom: 1rem;
}

.expand-btn:hover {
  color: var(--color-yellow-highlight);
  text-shadow: 0 0 5px var(--color-yellow-highlight);
}

/* Tech Display */
.tech-display {
  margin: 1rem 0;
}

.tech-label {
  color: var(--color-neon-orange);
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-chip {
  background: var(--color-bg-charcoal);
  border: 1px solid var(--color-earth-olive);
  color: var(--color-terminal-green);
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  font-family: var(--font-mono);
}

/* Track Actions */
.track-actions {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-earth-olive);
}

.action-btn {
  background: var(--color-bg-charcoal);
  border: 2px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 0.6rem 1rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: all 0.1s;
}

.action-btn:hover {
  background: var(--color-terminal-green);
  color: var(--color-bg-dark);
  box-shadow: 0 0 15px var(--color-terminal-green);
}

.btn-bracket {
  color: var(--color-neon-orange);
}

/* Tape Hiss Effect */
.tape-hiss {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-amber);
  opacity: 0;
  transition: opacity 0.3s;
}

.track-card:hover .tape-hiss {
  opacity: 0.7;
  animation: tape-scroll 2s linear infinite;
}

@keyframes tape-scroll {
  0% { background-position: 0 0; }
  100% { background-position: 20px 0; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .projects-container {
    padding: 8rem 1rem 2rem;
  }

  .track-card {
    min-width: 320px;
    max-width: 320px;
  }

  .track-info {
    padding: 1rem;
  }

  .track-title-bar {
    flex-direction: column;
    gap: 0.3rem;
  }

  .track-description {
    font-size: 0.8rem;
    max-height: 100px;
  }

  .tech-chip {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }
}
</style> 