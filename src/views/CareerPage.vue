<template>
  <!-- src/views/CareerPage.vue -->
  <div class="career-container" id="career">

    <div class="career-header">
      <div class="header-line"></div>
      <h2 class="section-title glow-text">[ CAREER_LOG.DAT ]</h2>
      <div class="header-line"></div>
    </div>

    <p class="boot-line">
      <span class="prompt">SYS&gt;</span> LOADING EXPERIENCE RECORDS... <span class="blink-cursor">_</span>
    </p>

    <div class="timeline" role="list" aria-label="Career history">
      <article
        v-for="(job, index) in career"
        :key="job.id"
        class="log-entry"
        :class="{ 'is-active': job.status === 'ACTIVE' }"
        role="listitem"
      >
        <!-- vertical rail -->
        <div class="timeline-rail" aria-hidden="true">
          <div
            class="rail-dot"
            :class="job.status === 'ACTIVE' ? 'dot-active' : 'dot-done'"
          ></div>
          <div class="rail-line" v-if="index < career.length - 1"></div>
        </div>

        <!-- content -->
        <div class="log-body">
          <div class="log-header-row">
            <span
              class="log-status"
              :class="job.status === 'ACTIVE' ? 'status-active' : 'status-done'"
              :aria-label="job.status === 'ACTIVE' ? 'Currently active' : 'Completed'"
            >
              {{ job.status === 'ACTIVE' ? '● ACTIVE' : '○ DONE' }}
            </span>
            <span class="log-dates">{{ job.start }} → {{ job.end }}</span>
            <span class="log-location">{{ job.location }}</span>
          </div>

          <h3 class="log-role">{{ job.role }}</h3>

          <p class="log-company">
            <span class="company-gt" aria-hidden="true">&gt;</span>
            <span class="company-name">{{ job.company }}</span>
            <span class="log-type">· {{ job.type }}</span>
          </p>

          <ul class="desc-list">
            <li v-for="(line, i) in job.description" :key="i" class="desc-item">
              <span class="desc-dash" aria-hidden="true">—</span>
              {{ line }}
            </li>
          </ul>

          <div class="log-tags" aria-label="Skills used">
            <span v-for="tag in job.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import career from '@/data/career.js'

export default {
  name: 'CareerPage',
  data() {
    return { career }
  }
}
</script>

<style scoped>
/* ── Container ── */
.career-container {
  min-height: 80dvh;
  padding: 8rem 2rem 4rem;
  /* Ensures the heading stays visible when the browser scrolls to #career */
  scroll-margin-top: 0;
  background:
    linear-gradient(-45deg, transparent 48%, rgba(128, 77, 55, 0.15) 49%, rgba(128, 77, 55, 0.15) 51%, transparent 52%),
    linear-gradient(45deg, transparent 48%, rgba(128, 77, 55, 0.15) 49%, rgba(128, 77, 55, 0.15) 51%, transparent 52%),
    var(--color-bg-dark);
  background-size: 20px 20px, 20px 20px, 100% 100%;
  background-position: 0 0, 10px 10px, 0 0;
  display: flex;
  flex-direction: column;
}

/* ── Section header (matches MinigamesPage style) ── */
.career-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 0.75rem;
}

.header-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--color-terminal-green), transparent);
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

/* ── Boot line ── */
.boot-line {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-terminal-green);
  opacity: 0.55;
  text-align: center;
  margin: 0 0 2.5rem;
  letter-spacing: 0.05em;
}

.prompt {
  color: var(--color-neon-orange);
}

.blink-cursor {
  animation: blink 1s step-end infinite;
}

/* ── Timeline ── */
.timeline {
  max-width: 820px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* ── Each log entry: rail column + body column ── */
.log-entry {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 0 1.25rem;
}

/* ── Rail ── */
.timeline-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3px;
}

.rail-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid;
}

.dot-active {
  background: var(--color-terminal-green);
  border-color: var(--color-terminal-green);
  box-shadow: 0 0 8px var(--color-terminal-green), 0 0 16px var(--color-terminal-green);
  animation: pulse-led 2s infinite;
}

.dot-done {
  background: transparent;
  border-color: var(--color-earth-olive);
}

.rail-line {
  width: 2px;
  flex: 1;
  min-height: 20px;
  background: var(--color-earth-olive);
  opacity: 0.3;
  margin-top: 5px;
}

/* ── Log body ── */
.log-body {
  padding-bottom: 2.25rem;
  border-left: 1px solid transparent; /* keep layout stable */
}

/* ── Header row: status + dates + location ── */
.log-header-row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}

.log-status {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  padding: 2px 6px;
}

.status-active {
  color: var(--color-terminal-green);
  background: rgba(67, 198, 195, 0.08);
  border: 1px solid var(--color-terminal-green);
  text-shadow: 0 0 6px var(--color-terminal-green);
}

.status-done {
  color: var(--color-earth-olive);
  background: rgba(128, 77, 55, 0.08);
  border: 1px solid var(--color-earth-olive);
}

.log-dates {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-terminal-green);
  opacity: 0.5;
  letter-spacing: 0.04em;
}

.log-location {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-neon-orange);
  opacity: 0.55;
  letter-spacing: 0.03em;
}

/* ── Role title ── */
.log-role {
  font-family: var(--font-retro);
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  color: var(--color-yellow-highlight);
  margin: 0 0 0.25rem;
  letter-spacing: 0.08em;
}

.is-active .log-role {
  text-shadow: 0 0 10px var(--color-yellow-highlight);
}

/* ── Company line ── */
.log-company {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-terminal-green);
  margin: 0 0 0.85rem;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.company-gt {
  color: var(--color-neon-orange);
  opacity: 0.7;
}

.company-name {
  font-weight: bold;
}

.log-type {
  opacity: 0.45;
  font-size: 0.72rem;
}

/* ── Description bullets ── */
.desc-list {
  list-style: none;
  margin: 0 0 0.85rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.desc-item {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-terminal-green);
  opacity: 0.8;
  line-height: 1.6;
  display: flex;
  gap: 0.5rem;
}

.desc-dash {
  color: var(--color-earth-olive);
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── Tags ── */
.log-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-neon-teal);
  border: 1px solid var(--color-neon-teal);
  padding: 2px 7px;
  opacity: 0.7;
}

/* ── Shared animation (blink defined globally in App.vue) ── */
@keyframes pulse-led {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--color-terminal-green); }
  50%       { opacity: 0.6; box-shadow: 0 0 4px var(--color-terminal-green); }
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .career-container {
    padding: 5.5rem 1rem 3rem;
  }

  .section-title {
    font-size: 1.5rem;
    letter-spacing: 2px;
  }

  .career-header {
    gap: 0.75rem;
  }

  .log-entry {
    grid-template-columns: 22px 1fr;
    gap: 0 0.75rem;
  }

  .log-header-row {
    gap: 0.4rem;
  }

  .desc-item {
    font-size: 0.74rem;
  }
}
</style>
