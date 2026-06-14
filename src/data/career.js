// src/data/career.js
// Career entries — newest first

const career = [
  {
    id: 'ploom',
    role: 'Frontend Software Engineer',
    company: 'Ploom, Inc.',
    type: 'Part-time · Remote',
    location: 'Austin, TX',
    start: 'Jun 2026',
    end: 'Present',
    status: 'ACTIVE',
    description: [
      'Building and maintaining frontend features as a part-time remote engineer, contributing to production-grade web interfaces with a focus on clean, performant UI.'
    ],
    tags: ['Frontend', 'Remote']
  },
  {
    id: 'mystage-sde',
    role: 'Software Developer',
    company: 'MyStage Music',
    type: 'Full-time · Remote',
    location: 'Wisconsin, US',
    start: 'Feb 2026',
    end: 'Present',
    status: 'ACTIVE',
    description: [
      'Driving full-stack feature development on a music-tech platform connecting artists and fans, continuing and expanding the work initiated during the internship phase.'
    ],
    tags: ['Full-Stack', 'Remote', 'Music Tech']
  },
  {
    id: 'seattleu-ta',
    role: 'Teaching Assistant — UX Design',
    company: 'Seattle University',
    type: 'Part-time · Hybrid',
    location: 'Seattle, WA',
    start: 'Sep 2025',
    end: 'Dec 2025',
    status: 'COMPLETED',
    description: [
      'Mentored graduate students on UX design principles and Figma prototyping, delivering detailed technical feedback on design assignments.',
      'Collaborated with faculty to refine course materials and grading criteria for graduate-level design courses.'
    ],
    tags: ['UX Design', 'Figma', 'Teaching']
  },
  {
    id: 'mystage-intern',
    role: 'Software Engineer Intern',
    company: 'MyStage Music',
    type: 'Part-time · Remote',
    location: 'Wisconsin, US',
    start: 'Jan 2025',
    end: 'Sep 2025',
    status: 'COMPLETED',
    description: [
      'Architected the backend data flow for the "Festival" interactive map using Cloud Functions to aggregate admin inputs into optimized Firebase collections, enabling sub-second retrieval for event navigation.',
      'Developed the "Artist Pro" admin dashboard with secure registration workflows and real-time data sync, enabling non-technical staff to manage hundreds of vendor assets and artist profiles.',
      'Engineered the "Fan Experience" dashboard in FlutterFlow with Firestore, supporting real-time monetization features including instant tips and priority song requests.',
      'Led a 3-person engineering team, managing sprint cycles and establishing CI/CD pipelines with GitHub Actions to ensure code consistency and reduce deployment downtime.'
    ],
    tags: ['Flutter', 'Firebase', 'Cloud Functions', 'CI/CD', 'Team Lead']
  },
  {
    id: 'amazon',
    role: 'Software Engineer (Capstone)',
    company: 'Amazon',
    type: 'Internship · Hybrid',
    location: 'Seattle, WA',
    start: 'Sep 2023',
    end: 'Jun 2024',
    status: 'COMPLETED',
    description: [
      'Engineered a serverless feedback analysis pipeline using AWS Lambda and DynamoDB to automate social media monitoring for the Alexa Sensitive Content Intelligence (ASCI) team, replacing manual workflows.',
      'Deployed NLP models via AWS Comprehend to categorize customer feedback into 5 safety topics and detect negative sentiment at scale.',
      'Built a React internal dashboard to visualize real-time trends and keyword clouds, helping stakeholders surface blind spots in customer safety data.'
    ],
    tags: ['AWS', 'Lambda', 'DynamoDB', 'React', 'NLP']
  },
  {
    id: 'cs-grader',
    role: 'CS Grader — Database Systems',
    company: 'Seattle University',
    type: 'Part-time · Remote',
    location: 'Seattle, WA',
    start: 'Sep 2023',
    end: 'Sep 2024',
    status: 'COMPLETED',
    description: [
      'Evaluated advanced SQL queries and schema designs (ERD, normalization 1NF–BCNF), ensuring submissions met requirements for logical correctness and referential integrity.',
      'Provided detailed code reviews and debugging feedback to help students understand complex database architecture concepts.'
    ],
    tags: ['SQL', 'Database Design', 'Code Review']
  },
  {
    id: 'astra-honda',
    role: 'Software Engineer Intern',
    company: 'PT Astra Honda Motor',
    type: 'Internship · On-site',
    location: 'Jakarta, Indonesia',
    start: 'Jun 2023',
    end: 'Aug 2023',
    status: 'COMPLETED',
    description: [
      'Designed and developed a secure internal web portal using Java Spring with token-based session management to ensure data integrity.',
      'Built a .NET inventory management application integrated with SQL databases, streamlining internal tracking workflows and reducing manual data entry.',
      'Conducted system design and QA testing for internal tools, translating business requirements into technical specs for stable deployment.'
    ],
    tags: ['Java Spring', '.NET', 'SQL', 'QA']
  }
]

export default career
