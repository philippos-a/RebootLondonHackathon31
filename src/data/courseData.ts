
export interface Course {
  id: string;
  title: string;
  description: string;
  logo: string;
  type: 'technical' | 'soft';
  category: 'learn' | 'practice';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  linkedInPostTemplate?: string;
}

// Mock courses data
export const courses: Course[] = [
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Learn the core concepts of JavaScript programming including variables, functions, and objects.',
    logo: '📘',
    type: 'technical',
    category: 'learn',
    duration: '4 weeks',
    level: 'beginner',
    linkedInPostTemplate: "Excited to share that I've completed the JavaScript Fundamentals course! #JavaScript #WebDevelopment #ContinuousLearning"
  },
  {
    id: 'react-basics',
    title: 'React Basics',
    description: 'Introduction to React library, components, states, and props.',
    logo: '⚛️',
    type: 'technical',
    category: 'learn',
    duration: '6 weeks',
    level: 'intermediate',
    linkedInPostTemplate: "I've just completed the React Basics course and can now build interactive UIs! #React #FrontendDevelopment #WebDev"
  },
  {
    id: 'data-structures',
    title: 'Data Structures & Algorithms',
    description: 'Understand fundamental data structures and algorithms for efficient code.',
    logo: '🧮',
    type: 'technical',
    category: 'learn',
    duration: '8 weeks',
    level: 'advanced',
    linkedInPostTemplate: "Proud to have completed the Data Structures & Algorithms course! Ready to write more efficient code. #DSA #Programming #ComputerScience"
  },
  {
    id: 'coding-challenge',
    title: 'Weekly Coding Challenges',
    description: 'Practice your coding skills with real-world problems and get feedback.',
    logo: '🧩',
    type: 'technical',
    category: 'practice',
    duration: 'Ongoing',
    level: 'intermediate',
    linkedInPostTemplate: "I've been consistently solving weekly coding challenges to sharpen my problem-solving skills! #CodingChallenge #ProblemSolving"
  },
  {
    id: 'github-portfolio',
    title: 'Build Your GitHub Portfolio',
    description: 'Create and optimize your GitHub profile to showcase your skills to employers.',
    logo: '🐙',
    type: 'technical',
    category: 'practice',
    duration: '2 weeks',
    level: 'beginner',
    linkedInPostTemplate: "Check out my newly optimized GitHub portfolio! Open to new opportunities in tech. #GitHubPortfolio #OpenToWork #SoftwareDevelopment"
  },
  {
    id: 'communication-skills',
    title: 'Effective Communication',
    description: 'Develop skills to communicate clearly and confidently in professional settings.',
    logo: '🗣️',
    type: 'soft',
    category: 'learn',
    duration: '3 weeks',
    level: 'beginner',
    linkedInPostTemplate: "Just completed a course on Effective Communication! Ready to bring these skills to my next role. #CommunicationSkills #ProfessionalDevelopment"
  },
  {
    id: 'time-management',
    title: 'Time Management & Productivity',
    description: 'Learn techniques to manage your time effectively and boost productivity.',
    logo: '⏰',
    type: 'soft',
    category: 'learn',
    duration: '2 weeks',
    level: 'beginner',
    linkedInPostTemplate: "I've enhanced my time management skills through this productivity course! #TimeManagement #Productivity #ProfessionalGrowth"
  },
  {
    id: 'leadership',
    title: 'Leadership Skills',
    description: 'Develop leadership qualities that will help you advance in your career.',
    logo: '👑',
    type: 'soft',
    category: 'learn',
    duration: '5 weeks',
    level: 'intermediate',
    linkedInPostTemplate: "I've completed a comprehensive Leadership Skills course and am excited to apply these principles in my work! #Leadership #CareerDevelopment"
  },
  {
    id: 'mock-interviews',
    title: 'Mock Technical Interviews',
    description: 'Practice technical interviews with experienced professionals and get feedback.',
    logo: '🎯',
    type: 'soft',
    category: 'practice',
    duration: 'Flexible',
    level: 'intermediate',
    linkedInPostTemplate: "I've been preparing for my job search with mock technical interviews! Feeling confident and ready for real interviews. #JobSearch #TechnicalInterview #PreparedForSuccess"
  },
  {
    id: 'networking',
    title: 'Networking Workshop',
    description: 'Learn how to build and maintain professional relationships.',
    logo: '🔄',
    type: 'soft',
    category: 'practice',
    duration: '1 week',
    level: 'beginner',
    linkedInPostTemplate: "Just participated in an insightful networking workshop! Excited to expand my professional connections. #Networking #ProfessionalDevelopment #CareerGrowth"
  }
];

export const getCoursesByType = (type: 'technical' | 'soft', category: 'learn' | 'practice') => {
  return courses.filter(course => course.type === type && course.category === category);
};

export const getCourseById = (id: string) => {
  return courses.find(course => course.id === id);
};
