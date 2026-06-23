// Static project data. Edit here to update content without touching the component.

const projects = [
    {
    title: "Bloom'n Brew",
    description:
      "An offline-first React Native app for logging and dialing in home coffee brews. Features a count-up/countdown timer, swipe-gesture brew history management, and full local data persistence via AsyncStorage. No account or internet required. Co-developed with Terbish (https://github.com/Terbish/).",
    technologies: ['React Native', 'JavaScript', 'AsyncStorage', 'iOS', 'Android'],
    live: 'https://apps.apple.com/us/app/bloomn-brew/id6758324003'
  },
  {
    title: 'Personal Website',
    description:
      'A responsive portfolio website built with Vue.js, featuring a modern UI design with smooth animations and dark theme. Showcases my projects, skills, and professional experience.',
    technologies: ['Vue.js', 'JavaScript', 'CSS'],
    github: 'https://github.com/Claurentia/claurentia_vue'
  },
  {
    title: 'Customer Feedback Analysis',
    description:
      'An automated social media monitoring system that analyzes user feedback to identify potential trust and safety concerns. Built with AWS services, the application processes social media posts using natural language processing for sentiment analysis and topic classification. Features an interactive dashboard that displays trending keywords, topic distributions, and sentiment patterns. The system enables proactive identification of user concerns through automated monitoring, replacing manual review processes.',
    technologies: ['Python', 'React.js', 'JavaScript', 'HTML', 'CSS', 'AWS Services (Lambda, Comprehend, DynamoDB, S3)']
  },
  {
    title: 'Gourmet App UI/UX Design',
    description:
      "A comprehensive UI/UX design project for a mobile application focused on discovering local eateries in Indonesia. The app features personalized 'food journeys' with an intuitive interface designed through extensive user research and iterative prototyping. Key features include personalized recommendations, nearby restaurant discovery, and detailed review systems. The design process encompassed user personas, sketches, information architecture, paper prototypes, and high-fidelity wireframes to create a user-centered solution for both locals and tourists.",
    technologies: ['Figma', 'User research methodologies', 'Interactive prototyping', 'Information architecture design'],
    github: 'https://github.com/ThePandaGroup/GourmetAppUXDesign'
  },
  {
    title: 'Eco-Panda',
    description:
      "Eco Panda is a Flutter-based mobile application designed to encourage environmentally friendly transportation choices and track users' carbon footprint. The app gamifies eco-friendly travel by rewarding users with points for choosing sustainable transportation options. It features route planning and navigation, carbon footprint tracking, challenges and rewards, a leaderboard system, and a customizable user profile. The app is built with Flutter for cross-platform compatibility, integrates Firebase for authentication and cloud functions, and uses a local SQLite database for data persistence.",
    technologies: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/ThePandaGroup/Eco-Panda'
  },
  {
    title: 'Health Recorder Mobile App',
    description:
      'A comprehensive Flutter application for tracking personal health and wellness activities, featuring emotion logging, diet tracking, and workout recording capabilities. It includes gamification elements, multi-language support, and a provider-based architecture for efficient data management and user experience.',
    technologies: ['Flutter', 'Dart', 'JavaScript', 'Firebase'],
    github: 'https://github.com/Claurentia/health-recorder'
  },
  {
    title: 'Panda-S E-commerce',
    description:
      'A full-stack e-commerce platform built with Angular and MongoDB. Features a dynamic product catalogue, shopping cart, user authentication, and order management. The Angular frontend delivers a responsive single-page experience with component-driven architecture, while a Node.js/Express backend exposes a RESTful API connected to MongoDB for persistent data storage.',
    technologies: ['Angular', 'TypeScript', 'MongoDB', 'HTML'],
    github: 'https://github.com/ThePandaGroup/Panda-S-Angular'
  },
  {
    title: 'Simple Shell',
    description:
      'A custom Unix-like shell implemented in C++ that demonstrates fundamental operating system concepts. The shell supports basic command execution and advanced pipe operations for command chaining. Key features include input parsing, process creation using fork(), pipe communication between processes, and proper memory management. The program handles multiple commands connected by pipes while maintaining parent-child process relationships.',
    technologies: ['C++', 'System calls (fork, pipe, execvp)', 'Process management', 'Input/output redirection'],
    github: 'https://github.com/Claurentia/Simple-Shell'
  },
  {
    title: 'Covid Database',
    description:
      'A C++ program implementing a custom hash table data structure to track and manage COVID-19 data records. The application features a hash table with separate chaining for collision resolution, allowing efficient storage and retrieval of COVID-19 statistics by country. Key features include file I/O operations for data loading, a command-line interface for database operations (add, remove, get, display), and data management capabilities with date-based updates.',
    technologies: ['C++', 'STL (vectors)', 'File I/O operations', 'Hash table', 'Object-oriented programming'],
    github: 'https://github.com/Claurentia/Covid-Database'
  },
  {
    title: 'Trivia Game',
    description:
      'A C++ command-line trivia game that fetches random questions from the Open Trivia Database API. The application features multiple-choice and true/false questions across various categories with different difficulty levels. The program processes JSON data, randomizes answer choices, tracks user scores, and provides immediate feedback with fun ASCII art rewards based on performance.',
    technologies: ['C++', 'CURL for API requests', 'JSON processing (nlohmann/json library)', 'STL (vectors, strings)', 'Object-oriented programming'],
    github: 'https://github.com/Claurentia/Trivia'
  },
]

export default projects
