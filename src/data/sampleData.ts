import { Employee } from '../types';

export const sampleEmployeeData: Employee[] = [
  // Software Engineers - India
  { id: 1, yearsExperience: 2, educationLevel: "Bachelor's", jobTitle: "Software Engineer", location: "Bangalore", companySize: "Large", skills: ["JavaScript", "React", "Node.js"], salary: 800000, industry: "Technology", workMode: "Hybrid" },
  { id: 2, yearsExperience: 5, educationLevel: "Master's", jobTitle: "Senior Software Engineer", location: "Hyderabad", companySize: "Large", skills: ["Python", "Django", "AWS", "Docker"], salary: 1800000, industry: "Technology", workMode: "Remote" },
  { id: 3, yearsExperience: 1, educationLevel: "Bachelor's", jobTitle: "Junior Software Engineer", location: "Pune", companySize: "Medium", skills: ["Java", "Spring Boot"], salary: 600000, industry: "Technology", workMode: "Office" },
  { id: 4, yearsExperience: 8, educationLevel: "Master's", jobTitle: "Tech Lead", location: "Mumbai", companySize: "Large", skills: ["Java", "Microservices", "Kubernetes", "Leadership"], salary: 2800000, industry: "Technology", workMode: "Hybrid" },
  { id: 5, yearsExperience: 3, educationLevel: "Bachelor's", jobTitle: "Frontend Developer", location: "Chennai", companySize: "Medium", skills: ["React", "TypeScript", "CSS"], salary: 1200000, industry: "Technology", workMode: "Remote" },
  
  // Data Scientists - India
  { id: 6, yearsExperience: 4, educationLevel: "Master's", jobTitle: "Data Scientist", location: "Bangalore", companySize: "Large", skills: ["Python", "Machine Learning", "SQL", "Pandas"], salary: 1600000, industry: "Technology", workMode: "Hybrid" },
  { id: 7, yearsExperience: 6, educationLevel: "PhD", jobTitle: "Senior Data Scientist", location: "Delhi", companySize: "Large", skills: ["Python", "Deep Learning", "TensorFlow", "Statistics"], salary: 2500000, industry: "Technology", workMode: "Remote" },
  { id: 8, yearsExperience: 2, educationLevel: "Master's", jobTitle: "Data Analyst", location: "Kolkata", companySize: "Medium", skills: ["Python", "SQL", "Tableau"], salary: 900000, industry: "Finance", workMode: "Office" },
  
  // Product Managers - India
  { id: 9, yearsExperience: 5, educationLevel: "MBA", jobTitle: "Product Manager", location: "Bangalore", companySize: "Large", skills: ["Strategy", "Analytics", "Agile"], salary: 2200000, industry: "Technology", workMode: "Hybrid" },
  { id: 10, yearsExperience: 3, educationLevel: "Bachelor's", jobTitle: "Associate Product Manager", location: "Gurgaon", companySize: "Medium", skills: ["Product Strategy", "User Research"], salary: 1400000, industry: "E-commerce", workMode: "Office" },
  
  // DevOps Engineers - India
  { id: 11, yearsExperience: 4, educationLevel: "Bachelor's", jobTitle: "DevOps Engineer", location: "Pune", companySize: "Medium", skills: ["AWS", "Docker", "Jenkins", "Terraform"], salary: 1500000, industry: "Technology", workMode: "Remote" },
  { id: 12, yearsExperience: 6, educationLevel: "Master's", jobTitle: "Senior DevOps Engineer", location: "Bangalore", companySize: "Large", skills: ["Kubernetes", "AWS", "CI/CD", "Monitoring"], salary: 2300000, industry: "Technology", workMode: "Hybrid" },
  
  // International locations for comparison
  { id: 13, yearsExperience: 5, educationLevel: "Master's", jobTitle: "Software Engineer", location: "San Francisco", companySize: "Large", skills: ["Python", "React", "AWS"], salary: 9500000, industry: "Technology", workMode: "Hybrid" },
  { id: 14, yearsExperience: 3, educationLevel: "Bachelor's", jobTitle: "Software Engineer", location: "London", companySize: "Large", skills: ["JavaScript", "Node.js", "MongoDB"], salary: 4200000, industry: "Technology", workMode: "Remote" },
  { id: 15, yearsExperience: 4, educationLevel: "Master's", jobTitle: "Data Scientist", location: "Toronto", companySize: "Medium", skills: ["Python", "ML", "SQL"], salary: 5800000, industry: "Technology", workMode: "Hybrid" },
  
  // More Indian roles
  { id: 16, yearsExperience: 7, educationLevel: "Master's", jobTitle: "Engineering Manager", location: "Bangalore", companySize: "Large", skills: ["Leadership", "Java", "Architecture"], salary: 3200000, industry: "Technology", workMode: "Hybrid" },
  { id: 17, yearsExperience: 2, educationLevel: "Bachelor's", jobTitle: "QA Engineer", location: "Noida", companySize: "Medium", skills: ["Testing", "Selenium", "Java"], salary: 700000, industry: "Technology", workMode: "Office" },
  { id: 18, yearsExperience: 4, educationLevel: "Bachelor's", jobTitle: "Backend Developer", location: "Hyderabad", companySize: "Large", skills: ["Node.js", "MongoDB", "Express"], salary: 1600000, industry: "Technology", workMode: "Remote" },
  { id: 19, yearsExperience: 6, educationLevel: "Master's", jobTitle: "Machine Learning Engineer", location: "Mumbai", companySize: "Large", skills: ["Python", "TensorFlow", "MLOps"], salary: 2400000, industry: "Technology", workMode: "Hybrid" },
  { id: 20, yearsExperience: 3, educationLevel: "Bachelor's", jobTitle: "Mobile Developer", location: "Chennai", companySize: "Medium", skills: ["React Native", "Flutter", "Firebase"], salary: 1300000, industry: "Technology", workMode: "Remote" },
  
  // Finance & Consulting - India
  { id: 21, yearsExperience: 4, educationLevel: "MBA", jobTitle: "Business Analyst", location: "Mumbai", companySize: "Large", skills: ["Excel", "SQL", "PowerBI"], salary: 1800000, industry: "Finance", workMode: "Office" },
  { id: 22, yearsExperience: 6, educationLevel: "Master's", jobTitle: "Financial Analyst", location: "Delhi", companySize: "Large", skills: ["Financial Modeling", "Excel", "Python"], salary: 2000000, industry: "Finance", workMode: "Hybrid" },
  { id: 23, yearsExperience: 3, educationLevel: "MBA", jobTitle: "Management Consultant", location: "Bangalore", companySize: "Large", skills: ["Strategy", "Analytics", "Presentation"], salary: 2500000, industry: "Consulting", workMode: "Hybrid" },
  
  // Design & Marketing - India
  { id: 24, yearsExperience: 4, educationLevel: "Bachelor's", jobTitle: "UX Designer", location: "Bangalore", companySize: "Medium", skills: ["Figma", "User Research", "Prototyping"], salary: 1400000, industry: "Technology", workMode: "Hybrid" },
  { id: 25, yearsExperience: 5, educationLevel: "Master's", jobTitle: "Digital Marketing Manager", location: "Mumbai", companySize: "Large", skills: ["SEO", "Google Ads", "Analytics"], salary: 1600000, industry: "E-commerce", workMode: "Remote" },
  
  // Sales - India
  { id: 26, yearsExperience: 3, educationLevel: "Bachelor's", jobTitle: "Sales Executive", location: "Delhi", companySize: "Medium", skills: ["CRM", "Communication", "Negotiation"], salary: 800000, industry: "Technology", workMode: "Office" },
  { id: 27, yearsExperience: 6, educationLevel: "MBA", jobTitle: "Sales Manager", location: "Mumbai", companySize: "Large", skills: ["Team Management", "Salesforce", "Strategy"], salary: 2200000, industry: "Technology", workMode: "Hybrid" },
  
  // Additional tech roles
  { id: 28, yearsExperience: 8, educationLevel: "Master's", jobTitle: "Principal Engineer", location: "Bangalore", companySize: "Large", skills: ["System Design", "Leadership", "Java"], salary: 4000000, industry: "Technology", workMode: "Hybrid" },
  { id: 29, yearsExperience: 5, educationLevel: "Bachelor's", jobTitle: "Cloud Architect", location: "Hyderabad", companySize: "Large", skills: ["AWS", "Azure", "Architecture"], salary: 2800000, industry: "Technology", workMode: "Remote" },
  { id: 30, yearsExperience: 2, educationLevel: "Master's", jobTitle: "Research Engineer", location: "Bangalore", companySize: "Large", skills: ["AI", "Research", "Python"], salary: 1800000, industry: "Technology", workMode: "Hybrid" },
  
  // Startup ecosystem
  { id: 31, yearsExperience: 4, educationLevel: "Bachelor's", jobTitle: "Full Stack Developer", location: "Bangalore", companySize: "Small", skills: ["MERN Stack", "AWS", "Docker"], salary: 1500000, industry: "Technology", workMode: "Remote" },
  { id: 32, yearsExperience: 7, educationLevel: "Master's", jobTitle: "CTO", location: "Mumbai", companySize: "Small", skills: ["Leadership", "Architecture", "Strategy"], salary: 5000000, industry: "Technology", workMode: "Hybrid" },
  
  // Emerging roles
  { id: 33, yearsExperience: 3, educationLevel: "Master's", jobTitle: "Blockchain Developer", location: "Pune", companySize: "Medium", skills: ["Solidity", "Web3", "Smart Contracts"], salary: 2000000, industry: "Technology", workMode: "Remote" },
  { id: 34, yearsExperience: 4, educationLevel: "Bachelor's", jobTitle: "Cybersecurity Analyst", location: "Chennai", companySize: "Large", skills: ["Security", "Penetration Testing", "CISSP"], salary: 1800000, industry: "Technology", workMode: "Hybrid" },
  { id: 35, yearsExperience: 5, educationLevel: "Master's", jobTitle: "AI Engineer", location: "Bangalore", companySize: "Large", skills: ["Deep Learning", "NLP", "Computer Vision"], salary: 2600000, industry: "Technology", workMode: "Remote" },
];

export const educationLevels = ["High School", "Bachelor's", "Master's", "PhD", "MBA"];

export const jobTitles = [
  "Junior Software Engineer", "Software Engineer", "Senior Software Engineer", "Tech Lead", "Engineering Manager", "Principal Engineer", "CTO",
  "Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer",
  "Data Scientist", "Senior Data Scientist", "Data Analyst", "Machine Learning Engineer", "AI Engineer", "Research Engineer",
  "Product Manager", "Senior Product Manager", "Associate Product Manager",
  "DevOps Engineer", "Senior DevOps Engineer", "Cloud Architect",
  "UX Designer", "UI Designer", "Product Designer",
  "QA Engineer", "Test Engineer", "SDET",
  "Business Analyst", "Financial Analyst", "Management Consultant",
  "Digital Marketing Manager", "Marketing Manager", "Growth Manager",
  "Sales Executive", "Sales Manager", "Account Manager",
  "Blockchain Developer", "Cybersecurity Analyst", "Security Engineer"
];

export const locations = [
  // Indian cities
  "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Gurgaon", "Noida", "Ahmedabad", "Jaipur", "Kochi",
  // International cities
  "San Francisco", "New York", "London", "Toronto", "Singapore", "Dubai", "Berlin", "Amsterdam", "Sydney", "Tokyo"
];

export const companySizes = ["Small", "Medium", "Large"];

export const industries = ["Technology", "Finance", "E-commerce", "Healthcare", "Consulting", "Manufacturing", "Education", "Government"];

export const workModes = ["Office", "Remote", "Hybrid"];

export const allSkills = [
  // Programming Languages
  "JavaScript", "Python", "Java", "TypeScript", "C++", "Go", "Rust", "C#", "PHP", "Ruby", "Swift", "Kotlin",
  
  // Frontend Technologies
  "React", "Angular", "Vue.js", "HTML", "CSS", "SASS", "Tailwind CSS", "Bootstrap", "jQuery",
  
  // Backend Technologies
  "Node.js", "Express", "Django", "Flask", "Spring Boot", "ASP.NET", "Ruby on Rails", "Laravel",
  
  // Databases
  "MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Oracle", "SQL Server", "Cassandra",
  
  // Cloud & DevOps
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible", "CI/CD",
  
  // Data Science & ML
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "R", "Tableau", "Power BI",
  
  // Mobile Development
  "React Native", "Flutter", "iOS", "Android", "Xamarin",
  
  // Other Technologies
  "Git", "Linux", "Microservices", "GraphQL", "REST API", "WebSockets", "Blockchain", "Solidity", "Web3",
  
  // Soft Skills
  "Leadership", "Team Management", "Communication", "Problem Solving", "Project Management", "Agile", "Scrum",
  
  // Design & UX
  "Figma", "Adobe Creative Suite", "Sketch", "User Research", "Prototyping", "Design Systems",
  
  // Business & Analytics
  "Excel", "PowerPoint", "Strategy", "Business Analysis", "Financial Modeling", "SEO", "Google Ads", "CRM", "Salesforce"
];