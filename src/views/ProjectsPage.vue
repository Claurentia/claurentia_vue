<template>
  <div class="projects-container" id="projects">
    <div class="arcade-header">
      <div class="header-line"></div>
      <h2 class="section-title glow-text">[ PROJECT_INDEX.SYS ]</h2>
      <div class="header-line"></div>
    </div>

    <p class="boot-line">
      <span class="prompt">SYS&gt;</span> INDEXING BUILDS... <span class="blink-cursor">_</span>
    </p>

    <div class="projects-showcase">
      <article v-if="featuredProject" class="featured-project">
        <div class="featured-visual">
          <div class="featured-terminal">
            <span class="terminal-dot"></span>
            <span class="terminal-path">~/featured/{{ projectSlug(featuredProject) }}</span>
          </div>
          <div class="featured-screen">
            <img
              v-if="featuredProject.image"
              :src="featuredProject.image"
              :alt="`${featuredProject.title} preview`"
              class="featured-image"
            >
            <div v-else class="project-fallback project-fallback--large" aria-hidden="true">
              <span class="fallback-code">{{ projectCode(featuredProject) }}</span>
              <span class="fallback-type">{{ featuredProject.category }}</span>
            </div>
          </div>
        </div>

        <div class="featured-copy">
          <div class="project-kicker">
            <span>FEATURED_BUILD</span>
            <span>{{ featuredProject.status }}</span>
          </div>
          <h3 class="featured-title">{{ featuredProject.title }}</h3>
          <p class="featured-summary">{{ featuredProject.summary }}</p>

          <div class="project-metrics" aria-label="Project details">
            <span>{{ featuredProject.category }}</span>
            <span>{{ featuredProject.role }}</span>
            <span>{{ featuredProject.impact }}</span>
          </div>

          <div class="tech-tags tech-tags--featured">
            <span
              v-for="tech in featuredProject.technologies"
              :key="tech"
              class="tech-chip"
            >
              {{ tech }}
            </span>
          </div>

          <div class="track-actions">
            <a
              v-if="featuredProject.github"
              :href="featuredProject.github"
              target="_blank"
              rel="noopener"
              class="action-btn"
            >
              <span class="btn-bracket">[</span> SOURCE <span class="btn-bracket">]</span>
            </a>
            <a
              v-if="featuredProject.live"
              :href="featuredProject.live"
              target="_blank"
              rel="noopener"
              class="action-btn action-btn--live"
            >
              <span class="btn-bracket">[</span> LIVE <span class="btn-bracket">]</span>
            </a>
          </div>
        </div>
      </article>

      <div class="project-toolbar" aria-label="Project categories">
        <button
          v-for="category in categories"
          :key="category"
          class="category-chip"
          :class="{ active: selectedCategory === category }"
          :aria-pressed="selectedCategory === category"
          @click="selectCategory(category)"
        >
          <span class="chip-label">{{ category }}</span>
          <span class="chip-count">{{ categoryCount(category) }}</span>
        </button>
      </div>

      <div ref="projectGrid" class="project-grid">
        <article
          v-for="(project, index) in displayedProjects"
          :key="project.title"
          class="project-card"
        >
          <div class="project-media" :class="{ 'project-media--image': project.image }">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="`${project.title} preview`"
              class="project-image"
              loading="lazy"
            >
            <div v-else class="project-fallback" aria-hidden="true">
              <span class="fallback-code">{{ projectCode(project) }}</span>
              <span class="fallback-type">{{ project.category }}</span>
            </div>
            <span class="project-status">{{ project.status }}</span>
          </div>

          <div class="project-body">
            <div class="track-header-row">
              <span class="track-number">{{ 'TRACK_' + (index + 1).toString().padStart(2, '0') }}</span>
              <span class="track-category">{{ project.category }}</span>
            </div>

            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-summary">{{ project.summary }}</p>

            <div class="project-detail-line">
              <span>{{ project.role }}</span>
              <span>{{ project.impact }}</span>
            </div>

            <div class="tech-tags">
              <span
                v-for="tech in visibleTechnologies(project)"
                :key="tech"
                class="tech-chip"
              >
                {{ tech }}
              </span>
              <span v-if="remainingTechCount(project)" class="tech-chip tech-chip--more">
                +{{ remainingTechCount(project) }}
              </span>
            </div>

            <div class="track-actions project-actions">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="action-btn"
              >
                <span class="btn-bracket">[</span> SOURCE <span class="btn-bracket">]</span>
              </a>
              <a
                v-if="project.live"
                :href="project.live"
                target="_blank"
                rel="noopener"
                class="action-btn action-btn--live"
              >
                <span class="btn-bracket">[</span> LIVE <span class="btn-bracket">]</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <div v-if="showAllToggle" class="project-more-bar">
        <button
          class="action-btn project-more-btn"
          type="button"
          :aria-expanded="allExpanded"
          @click="allExpanded = !allExpanded"
        >
          <span class="btn-bracket">[</span> {{ moreButtonLabel }} <span class="btn-bracket">]</span>
        </button>
        <span class="project-more-note">
          {{ allExpanded ? 'Showing full archive' : `${hiddenProjectCount} builds queued` }}
        </span>
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
      projects,
      selectedCategory: 'ALL',
      allExpanded: false,
      allRowLimit: 4,
      projectGridResizeObserver: null
    }
  },
  computed: {
    featuredProject() {
      return this.projects.find(project => project.featured)
    },
    showcaseProjects() {
      return this.projects.filter(project => !project.featured)
    },
    categories() {
      const categories = this.projects.map(project => project.category)
      return ['ALL', ...Array.from(new Set(categories))]
    },
    filteredProjects() {
      if (this.selectedCategory === 'ALL') {
        return this.showcaseProjects
      }
      return this.showcaseProjects.filter(project => project.category === this.selectedCategory)
    },
    displayedProjects() {
      if (this.selectedCategory !== 'ALL' || this.allExpanded) {
        return this.filteredProjects
      }
      return this.filteredProjects.slice(0, this.allRowLimit)
    },
    hiddenProjectCount() {
      if (this.selectedCategory !== 'ALL') return 0
      return Math.max(this.filteredProjects.length - this.allRowLimit, 0)
    },
    showAllToggle() {
      return this.selectedCategory === 'ALL' && this.filteredProjects.length > this.allRowLimit
    },
    moreButtonLabel() {
      return this.allExpanded ? 'SHOW_FIRST_ROW' : `SEE_MORE_${this.hiddenProjectCount}`
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateAllRowLimit()
      if (window.ResizeObserver && this.$refs.projectGrid) {
        this.projectGridResizeObserver = new ResizeObserver(this.updateAllRowLimit)
        this.projectGridResizeObserver.observe(this.$refs.projectGrid)
      }
      window.addEventListener('resize', this.updateAllRowLimit)
    })
  },
  beforeUnmount() {
    if (this.projectGridResizeObserver) {
      this.projectGridResizeObserver.disconnect()
    }
    window.removeEventListener('resize', this.updateAllRowLimit)
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category
      this.allExpanded = false
      this.$nextTick(this.updateAllRowLimit)
    },
    categoryCount(category) {
      if (category === 'ALL') return this.projects.length
      return this.projects.filter(project => project.category === category).length
    },
    projectCode(project) {
      return project.title
        .replace(/[^a-z0-9]/gi, '')
        .slice(0, 4)
        .toUpperCase()
    },
    projectSlug(project) {
      return project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    },
    visibleTechnologies(project) {
      return project.technologies.slice(0, 4)
    },
    remainingTechCount(project) {
      return Math.max(project.technologies.length - 4, 0)
    },
    updateAllRowLimit() {
      const grid = this.$refs.projectGrid
      if (!grid) return

      const columns = window
        .getComputedStyle(grid)
        .gridTemplateColumns
        .split(' ')
        .filter(Boolean)
        .length

      this.allRowLimit = Math.max(1, columns)
    }
  }
}
</script>

<style scoped>
.projects-container {
  min-height: 100dvh;
  padding: calc(var(--nav-height) + 2rem) 2rem var(--section-bottom-padding);
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 39px,
      rgba(128, 77, 55, 0.18) 39px,
      rgba(128, 77, 55, 0.18) 40px
    ),
    radial-gradient(ellipse 55% 40% at 5% 10%, rgba(242, 199, 73, 0.12) 0%, transparent 70%),
    var(--color-bg-dark);
  background-size: 100% 100%, 100% 100%, 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arcade-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 0.75rem;
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

.boot-line {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-terminal-green);
  opacity: 0.55;
  text-align: center;
  margin: 0 0 1.35rem;
  letter-spacing: 0.05em;
}

.prompt {
  color: var(--color-neon-orange);
}

.blink-cursor {
  animation: blink 1s step-end infinite;
}

.projects-showcase {
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.featured-project {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(360px, 1.3fr);
  background: rgba(26, 26, 26, 0.92);
  border: 3px solid var(--color-terminal-green);
  box-shadow:
    0 0 20px rgba(67, 198, 195, 0.24),
    inset 0 0 24px rgba(0, 0, 0, 0.82);
  overflow: hidden;
}

.featured-visual {
  background:
    linear-gradient(rgba(67, 198, 195, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(67, 198, 195, 0.08) 1px, transparent 1px),
    var(--color-bg-charcoal);
  background-size: 18px 18px;
  border-right: 2px solid var(--color-terminal-green);
  display: flex;
  flex-direction: column;
  min-height: 280px;
}

.featured-terminal {
  min-height: 38px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0 1rem;
  background: var(--color-bg-dark);
  border-bottom: 1px solid var(--color-earth-olive);
  color: var(--color-terminal-green);
  font-size: 0.76rem;
}

.terminal-dot {
  width: 9px;
  height: 9px;
  background: var(--color-neon-orange);
  box-shadow: 0 0 10px var(--color-neon-orange);
}

.terminal-path {
  opacity: 0.78;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.featured-screen {
  flex: 1;
  padding: 1rem;
  display: flex;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 16px rgba(67, 198, 195, 0.32));
}

.featured-copy {
  padding: 1.35rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.project-kicker,
.track-header-row,
.project-detail-line,
.project-metrics {
  font-family: var(--font-mono);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.85rem;
  align-items: center;
}

.project-kicker {
  justify-content: space-between;
  color: var(--color-neon-orange);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
}

.featured-title,
.project-title {
  font-family: var(--font-retro);
  color: var(--color-terminal-green);
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 2px;
  text-shadow: 0 0 8px var(--color-terminal-green);
}

.featured-title {
  font-size: clamp(2rem, 5vw, 3.1rem);
}

.project-title {
  font-size: 1.45rem;
  line-height: 1;
}

.featured-summary,
.project-summary {
  color: var(--color-cream);
  opacity: 0.9;
  line-height: 1.65;
  margin: 0;
}

.featured-summary {
  font-size: 0.95rem;
}

.project-summary {
  font-size: 0.78rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-metrics {
  color: var(--color-yellow-highlight);
  font-size: 0.74rem;
}

.project-metrics span,
.project-detail-line span {
  border-left: 2px solid var(--color-earth-olive);
  padding-left: 0.6rem;
}

.project-toolbar {
  display: flex;
  gap: 0.55rem;
  overflow-x: auto;
  padding: 0.25rem 0 0.4rem;
}

.project-toolbar::-webkit-scrollbar {
  height: 6px;
}

.project-toolbar::-webkit-scrollbar-track {
  background: var(--color-bg-dark);
}

.project-toolbar::-webkit-scrollbar-thumb {
  background: var(--color-earth-olive);
}

.category-chip {
  background: var(--color-bg-dark);
  border: 1px solid var(--color-earth-olive);
  color: var(--color-terminal-green);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.45rem 0.65rem;
  text-transform: uppercase;
  white-space: nowrap;
}

.category-chip:hover,
.category-chip.active {
  border-color: var(--color-terminal-green);
  background: rgba(67, 198, 195, 0.12);
  box-shadow: 0 0 12px rgba(67, 198, 195, 0.22);
  color: var(--color-yellow-highlight);
}

.chip-count {
  color: var(--color-neon-orange);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1rem;
}

.project-more-bar {
  border: 1px solid var(--color-earth-olive);
  background: rgba(26, 26, 26, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.85rem;
}

.project-more-btn {
  border-color: var(--color-yellow-highlight);
  color: var(--color-yellow-highlight);
}

.project-more-btn:hover {
  background: var(--color-yellow-highlight);
  color: var(--color-bg-dark);
  box-shadow: 0 0 15px var(--color-yellow-highlight);
}

.project-more-note {
  color: var(--color-terminal-green);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  opacity: 0.75;
  text-transform: uppercase;
}

.project-card {
  min-height: 430px;
  background: rgba(26, 26, 26, 0.94);
  border: 2px solid var(--color-terminal-green);
  box-shadow:
    0 0 14px rgba(67, 198, 195, 0.18),
    inset 0 0 20px rgba(0, 0, 0, 0.82);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
}

.project-card:hover {
  border-color: var(--color-neon-teal);
  box-shadow:
    0 0 18px rgba(67, 198, 195, 0.28),
    inset 0 0 20px rgba(0, 0, 0, 0.82);
  transform: translateY(-3px);
}

.project-media {
  position: relative;
  aspect-ratio: 16 / 7;
  background:
    repeating-linear-gradient(
      90deg,
      rgba(67, 198, 195, 0.08),
      rgba(67, 198, 195, 0.08) 1px,
      transparent 1px,
      transparent 10px
    ),
    var(--color-bg-charcoal);
  border-bottom: 1px solid var(--color-earth-olive);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-sizing: border-box;
  padding: 0.8rem;
  filter: drop-shadow(0 0 10px rgba(67, 198, 195, 0.22));
}

.project-media--image::after,
.featured-screen::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 3px,
    rgba(0, 0, 0, 0.16) 3px,
    rgba(0, 0, 0, 0.16) 6px
  );
  pointer-events: none;
}

.featured-screen {
  position: relative;
}

.project-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  color: var(--color-terminal-green);
}

.project-fallback--large {
  min-height: 100%;
}

.fallback-code {
  font-family: var(--font-retro);
  font-size: clamp(2.3rem, 7vw, 4rem);
  letter-spacing: 0.08em;
  text-shadow: 0 0 12px var(--color-terminal-green);
}

.fallback-type {
  color: var(--color-neon-orange);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.project-status {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  background: rgba(26, 26, 26, 0.88);
  border: 1px solid var(--color-yellow-highlight);
  color: var(--color-yellow-highlight);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  padding: 0.25rem 0.45rem;
  text-transform: uppercase;
}

.project-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.72rem;
  flex: 1;
}

.track-number {
  color: var(--color-neon-orange);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
}

.track-category {
  color: var(--color-yellow-highlight);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
}

.project-detail-line {
  color: var(--color-terminal-green);
  opacity: 0.72;
  font-size: 0.68rem;
  line-height: 1.4;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-tags--featured {
  gap: 0.5rem;
}

.tech-chip {
  background: var(--color-bg-charcoal);
  border: 1px solid var(--color-earth-olive);
  color: var(--color-terminal-green);
  padding: 0.25rem 0.5rem;
  font-size: 0.68rem;
  font-family: var(--font-mono);
}

.tech-chip--more {
  border-color: var(--color-neon-orange);
  color: var(--color-neon-orange);
}

.track-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-actions {
  margin-top: auto;
  padding-top: 0.25rem;
}

.action-btn {
  background: var(--color-bg-charcoal);
  border: 2px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 0.55rem 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: all 0.1s;
  letter-spacing: 0.08em;
}

.action-btn:hover {
  background: var(--color-terminal-green);
  color: var(--color-bg-dark);
  box-shadow: 0 0 15px var(--color-terminal-green);
}

.action-btn--live {
  border-color: var(--color-neon-teal);
  color: var(--color-neon-teal);
}

.action-btn--live:hover {
  background: var(--color-neon-teal);
  color: var(--color-bg-dark);
  box-shadow: 0 0 15px var(--color-neon-teal);
}

.btn-bracket {
  color: var(--color-neon-orange);
}

@media (max-width: 1024px) {
  .featured-project {
    grid-template-columns: 1fr;
  }

  .featured-visual {
    border-right: none;
    border-bottom: 2px solid var(--color-terminal-green);
    min-height: 220px;
  }
}

@media (max-width: 768px) {
  .projects-container {
    padding: calc(var(--nav-height) + 1rem) 0.75rem var(--section-bottom-padding);
  }

  .arcade-header {
    gap: 0.75rem;
  }

  .section-title {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }

  .featured-copy {
    padding: 1.1rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-card {
    min-height: auto;
  }

  .project-media {
    aspect-ratio: 16 / 8;
  }

  .project-toolbar {
    margin-inline: -0.75rem;
    padding-inline: 0.75rem;
  }

  .project-more-bar {
    align-items: stretch;
    flex-direction: column;
    text-align: center;
  }

  .project-summary {
    -webkit-line-clamp: unset;
  }
}
</style>
