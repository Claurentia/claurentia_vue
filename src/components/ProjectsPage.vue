<template>
  <div class="projects-container" id="projects">
    <h2 class="section-title">Projects</h2>
    <div class="projects-grid">
      <div class="project-card" v-for="(project, index) in projects" :key="index">
        <div class="project-image">
          <img :src="project.image" :alt="project.title">
        </div>
        <div class="project-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tech-stack">
            <span v-for="(tech, techIndex) in project.technologies" 
                  :key="techIndex" 
                  class="tech-tag">
              {{ tech }}
            </span>
          </div>
          <div class="project-links">
            <a :href="project.github" target="_blank" rel="noopener" class="project-link" v-if="project.github">
              Go to {{ project.repo }} repository >
            </a>
            <a :href="project.demo" target="_blank" rel="noopener" class="project-link" v-if="project.demo">
              Live Demo
            </a>
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
      projects: [
        {
          title: 'Personal Website',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: '../assets/project1.jpg',
          technologies: ['Vue.js', 'JavaScript', 'CSS'],
          github: 'https://github.com/Claurentia/claurentia_vue',
          repo: 'GitHub'
        },
        {
          title: 'Customer Feedback Analysis',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: '../assets/project1.jpg',
          technologies: ['Python', 'JavaScript', 'HTML', 'CSS'],
          github: 'https://github.com/Nortus222/amazon-feedback-demo',
          repo: 'GitHub'
        },
        {
          title: 'Gourmet App UI/UX Design',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: '../assets/project1.jpg',
          technologies: ['Figma'],
          github: 'https://github.com/ThePandaGroup/GourmetAppUXDesign',
          repo: 'GitHub'
        },
        {
          title: 'Eco-Panda',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: '../assets/project1.jpg',
          technologies: ['Flutter', 'Dart'],
          github: 'https://github.com/yourusername/project1',
          repo: 'GitHub'
        },
        {
          title: 'Health Recorder Mobile App',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: '../assets/project1.jpg',
          technologies: ['Flutter', 'Dart', 'JavaScript'],
          github: 'https://github.com/Claurentia/health-recorder',
          repo: 'GitHub'
        },
        {
          title: 'Panda-S E-commerce',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: '../assets/project1.jpg',
          technologies: ['Flutter', 'Dart', 'JavaScript'],
          github: 'https://github.com/Claurentia/health-recorder',
          repo: 'GitHub'
        },
        {
          title: 'Simple Shell',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: '../assets/project1.jpg',
          technologies: ['C++'],
          github: 'https://github.com/Claurentia/Simple-Shell',
          repo: 'GitHub'
        },
        {
          title: 'Covid Database',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: '../assets/project1.jpg',
          technologies: ['C++'],
          github: 'https://github.com/Claurentia/Covid-Database',
          repo: 'GitHub'
        },
        {
          title: 'Trivia Game',
          description: 'Description of project 1. Add details about what the project does and its key features.',
          image: '../assets/project1.jpg',
          technologies: ['C++'],
          github: 'https://github.com/Claurentia/Trivia',
          repo: 'GitHub'
        },
        
      ]
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 300px;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.project-image {
  width: 40%;
  min-width: 300px;
  height: 100%;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-content h3 {
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
}

.project-content p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(163, 255, 187, 0.1);
  color: rgba(163, 255, 187, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  border: 1px solid rgba(163, 255, 187, 0.2);
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(163, 255, 187, 0.1);
  border: 1px solid rgba(163, 255, 187, 0.2);
  transition: all 0.3s ease;
}

.project-link:hover {
  background: rgba(163, 255, 187, 0.2);
  transform: translateY(-2px);
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
  }

  .project-content {
    padding: 1.5rem;
  }
}
</style> 