<template>
  <div class="projects-container" id="projects">
    <!-- Cassette Player Header -->
    <div class="cassette-player">
      <div class="player-header">
        <div class="player-title">[TRACK LIST]</div>
        <div class="player-controls">
          <button class="control-button" @click="scrollProjects('left')">
            <span class="control-icon">◄◄</span>
          </button>
          <button class="control-button play-btn">
            <span class="control-icon">▶</span>
          </button>
          <button class="control-button">
            <span class="control-icon">■</span>
          </button>
          <button class="control-button" @click="scrollProjects('right')">
            <span class="control-icon">►►</span>
          </button>
        </div>
      </div>
      <div class="track-counter">
        TRACK {{ currentTrack.toString().padStart(2, '0') }} / {{ projects.length.toString().padStart(2, '0') }}
      </div>
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
            <div class="track-description" :class="{ expanded: expandedProjects[index] }">
              <span class="desc-prompt">></span>
              <span class="desc-text">
                {{ expandedProjects[index] ? project.description : truncateText(project.description) }}
              </span>
            </div>

            <button
              v-if="shouldShowReadMore(project.description)"
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
export default {
  name: 'ProjectsPage',
  data() {
    return {
      expandedProjects: Array(10).fill(false),
      currentTrack: 1,
      projects: [
        {
          title: 'Personal Website',
          description: 'A responsive portfolio website built with Vue.js, featuring a modern UI design with smooth animations and dark theme. Showcases my projects, skills, and professional experience.',
          image: require('@/assets/Cl_brand.png'),
          color: '#2c3e50',
          technologies: ['Vue.js', 'JavaScript', 'CSS'],
          github: 'https://github.com/Claurentia/claurentia_vue',
          repo: 'GitHub'
        },
        {
          title: 'Customer Feedback Analysis',
          description: 'An automated social media monitoring system that analyzes user feedback to identify potential trust and safety concerns. Built with AWS services, the application processes social media posts using natural language processing for sentiment analysis and topic classification. Features an interactive dashboard that displays trending keywords, topic distributions, and sentiment patterns. The system enables proactive identification of user concerns through automated monitoring, replacing manual review processes.',
          image: require('@/assets/SeattleU.png'),
          color: '#eeebe3',
          technologies: ['Python', 'React.js', 'JavaScript', 'HTML', 'CSS', 'AWS Services (Lambda, Comprehend, DynamoDB, S3)'],
          repo: 'GitHub'
        },
        {
          title: 'Gourmet App UI/UX Design',
          description: 'A comprehensive UI/UX design project for a mobile application focused on discovering local eateries in Indonesia. The app features personalized \'food journeys\' with an intuitive interface designed through extensive user research and iterative prototyping. Key features include personalized recommendations, nearby restaurant discovery, and detailed review systems. The design process encompassed user personas, sketches, information architecture, paper prototypes, and high-fidelity wireframes to create a user-centered solution for both locals and tourists.',
          image: require('@/assets/Gourmet.png'),
          color: '#fff4ef',
          technologies: ['Figma', 'User research methodologies', 'Interactive prototyping', 'Information architecture design'],
          github: 'https://github.com/ThePandaGroup/GourmetAppUXDesign',
          repo: 'GitHub'
        },
        {
          title: 'Eco-Panda',
          description: 'Eco Panda is a Flutter-based mobile application designed to encourage environmentally friendly transportation choices and track users\' carbon footprint. The app gamifies eco-friendly travel by rewarding users with points for choosing sustainable transportation options. It features route planning and navigation, carbon footprint tracking, challenges and rewards, a leaderboard system, and a customizable user profile. The app is built with Flutter for cross-platform compatibility, integrates Firebase for authentication and cloud functions, and uses a local SQLite database for data persistence.',
          image: require('@/assets/EcoPanda.png'),
          color: '#f3fce5',
          technologies: ['Flutter', 'Dart', 'Firebase'],
          github: 'https://github.com/ThePandaGroup/Eco-Panda',
          repo: 'GitHub'
        },
        {
          title: 'Health Recorder Mobile App',
          description: 'A comprehensive Flutter application for tracking personal health and wellness activities, featuring emotion logging, diet tracking, and workout recording capabilities. It includes gamification elements, multi-language support, and a provider-based architecture for efficient data management and user experience.',
          image: require('@/assets/Cl_brand.png'),
          color: '#34495e',
          technologies: ['Flutter', 'Dart', 'JavaScript', 'Firebase'],
          github: 'https://github.com/Claurentia/health-recorder',
          repo: 'GitHub'
        },
        {
          title: 'Panda-S E-commerce',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: require('@/assets/Panda-S.png'),
          color: '#fcfaeb',
          technologies: ['Angular', 'TypeScript', 'MongoDB', 'HTML'],
          github: 'https://github.com/ThePandaGroup/Panda-S-Angular',
          repo: 'GitHub'
        },
        {
          title: 'Simple Shell',
          description: 'A custom Unix-like shell implemented in C++ that demonstrates fundamental operating system concepts. The shell supports basic command execution and advanced pipe operations for command chaining. Key features include input parsing, process creation using fork(), pipe communication between processes, and proper memory management. The program handles multiple commands connected by pipes while maintaining parent-child process relationships.',
          image: require('@/assets/Cl_brand.png'),
          color: '#34495e',
          technologies: ['C++', 'System calls (fork, pipe, execvp)', 'Process management', 'Input/output redirection'],
          github: 'https://github.com/Claurentia/Simple-Shell',
          repo: 'GitHub'
        },
        {
          title: 'Covid Database',
          description: 'A C++ program implementing a custom hash table data structure to track and manage COVID-19 data records. The application features a hash table with separate chaining for collision resolution, allowing efficient storage and retrieval of COVID-19 statistics by country. Key features include file I/O operations for data loading, a command-line interface for database operations (add, remove, get, display), and data management capabilities with date-based updates.',
          image: require('@/assets/Cl_brand.png'),
          color: '#34495e',
          technologies: ['C++', 'STL (vectors)', 'File I/O operations', 'Hash table', 'Object-oriented programming'],
          github: 'https://github.com/Claurentia/Covid-Database',
          repo: 'GitHub'
        },
        {
          title: 'Trivia Game',
          description: 'A C++ command-line trivia game that fetches random questions from the Open Trivia Database API. The application features multiple-choice and true/false questions across various categories with different difficulty levels. The program processes JSON data, randomizes answer choices, tracks user scores, and provides immediate feedback with fun ASCII art rewards based on performance.',
          image: require('@/assets/Cl_brand.png'),
          color: '#34495e',
          technologies: ['C++', 'CURL for API requests', 'JSON processing (nlohmann/json library)', 'STL (vectors, strings)', 'Object-oriented programming'],
          github: 'https://github.com/Claurentia/Trivia',
          repo: 'GitHub'
        },
        
      ]
    }
  },
  methods: {
    toggleDescription(index) {
      const newExpandedProjects = [...this.expandedProjects]
      newExpandedProjects[index] = !newExpandedProjects[index]
      this.expandedProjects = newExpandedProjects
    },
    shouldShowReadMore(description) {
      return description.length > 200
    },
    truncateText(text) {
      if (this.shouldShowReadMore(text)) {
        return text.slice(0, 200) + '... '
      }
      return text
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

/* Cassette Player Controls */
.cassette-player {
  background: var(--color-bg-charcoal);
  border: 3px solid var(--color-earth-olive);
  padding: 1.5rem;
  max-width: 800px;
  width: 100%;
  box-shadow:
    0 0 20px rgba(0, 255, 65, 0.2),
    inset 0 0 30px rgba(0, 0, 0, 0.8);
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-earth-olive);
}

.player-title {
  font-family: var(--font-retro);
  font-size: 1.5rem;
  color: var(--color-terminal-green);
  text-shadow: 0 0 10px var(--color-terminal-green);
}

.player-controls {
  display: flex;
  gap: 0.5rem;
}

.control-button {
  background: var(--color-bg-dark);
  border: 2px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  width: 50px;
  height: 50px;
  cursor: pointer;
  font-family: var(--font-mono);
  transition: all 0.1s;
  position: relative;
}

.control-button:hover {
  background: var(--color-earth-olive);
  color: var(--color-yellow-highlight);
  box-shadow: 0 0 15px var(--color-terminal-green);
}

.control-button:active {
  transform: translateY(3px);
}

.control-icon {
  font-size: 1.2rem;
}

.play-btn {
  background: var(--color-earth-olive);
}

.track-counter {
  font-family: var(--font-mono);
  color: var(--color-neon-orange);
  font-size: 1.2rem;
  text-align: center;
  letter-spacing: 3px;
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
  max-height: 120px;
  overflow: hidden;
}

.track-description.expanded {
  max-height: none;
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
  margin-top: 1rem;
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

  .cassette-player {
    padding: 1rem;
  }

  .player-header {
    flex-direction: column;
    gap: 1rem;
  }

  .player-title {
    font-size: 1.2rem;
  }

  .control-button {
    width: 40px;
    height: 40px;
  }

  .track-counter {
    font-size: 1rem;
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