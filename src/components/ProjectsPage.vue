<template>
  <div class="projects-container" id="projects">
    <h2 class="section-title">Projects</h2>
    <div class="projects-grid">
      <div class="project-card" 
           v-for="(project, index) in projects" 
           :key="index"
           :class="{ expanded: expandedProjects[index] }">
        <div class="project-image" :style="{ backgroundColor: project.color }">
          <img :src="project.image" :alt="project.title">
        </div>
        <div class="project-content">
          <div class="project-header">
            <h3>{{ project.title }}</h3>
            <a v-if="project.github" 
               :href="project.github" 
               target="_blank" 
               rel="noopener" 
               class="github-link">
              <i class="fab fa-github"></i>
              View Code
            </a>
          </div>
          <p :class="{ expanded: expandedProjects[index] }">
            {{ expandedProjects[index] ? project.description : truncateText(project.description) }}
            <button 
              v-if="shouldShowReadMore(project.description)" 
              @click="toggleDescription(index)" 
              class="read-more-btn"
            >
              {{ expandedProjects[index] ? 'Read Less' : 'Read More' }}
            </button>
          </p>
          <div class="tech-stack">
            <span v-for="(tech, techIndex) in project.technologies" 
                  :key="techIndex" 
                  class="tech-tag">
              {{ tech }}
            </span>
          </div>
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
      expandedProjects: Array(10).fill(false),  // Initialize with false for each project
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
      // Create a new array with the toggled value
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
    }
  }
}
</script>

<style scoped>
.projects-container {
  min-height: 100dvh;
  padding: 6rem 2rem;
  background: linear-gradient(
    to bottom,
    rgba(1, 0, 18, 1),
    rgba(1, 0, 18, 0.95),
    rgba(28, 36, 54, 0.95) 50%,
    rgba(18, 24, 38, 0.95)
  );
}

.section-title {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.projects-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(163, 255, 187, 0.1);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: stretch;
  height: 300px;
}

.project-card.expanded {
  height: auto;
  min-height: 300px;
  transition: all 0.3s ease;
}

.project-image {
  width: 40%;
  min-width: 300px;
  height: auto;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-image img {
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  object-fit: contain;
  transition: transform 0.3s ease;
  border-radius: 8px;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 2rem 2rem 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.project-header h3 {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 1.4rem;
  flex: 1;
}

.github-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: rgba(163, 255, 187, 0.9);
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background: rgba(163, 255, 187, 0.1);
  border: 1px solid rgba(163, 255, 187, 0.2);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.github-link i {
  font-size: 1rem;
}

.github-link:hover {
  background: rgba(163, 255, 187, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.project-content p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  position: relative;
}

.project-content p:not(.expanded) {
  overflow: hidden;
}

.read-more-btn {
  background: none;
  border: none;
  color: rgba(163, 255, 187, 0.9);
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  margin-left: 0.5rem;
  transition: color 0.3s ease;
  display: inline;
  text-decoration: underline;
}

.read-more-btn:hover {
  color: rgba(163, 255, 187, 1);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0;
}

.tech-tag {
  background: rgba(163, 255, 187, 0.1);
  color: rgba(163, 255, 187, 0.9);
  padding: 0.2rem 0.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(163, 255, 187, 0.2);
}

@media (max-width: 768px) {
  .projects-container {
    padding: 4rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .project-card {
    flex-direction: column;
    height: auto;
  }

  .project-image {
    width: 100%;
    height: 200px;
    min-width: unset;
    padding: 0.75rem;
  }

  .project-image img {
    width: calc(100% - 1.5rem);
    height: calc(100% - 1.5rem);
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .github-link {
    font-size: 0.8rem;
  }
}
</style> 