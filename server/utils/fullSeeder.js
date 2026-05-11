import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from '../models/Course.js';
import Teacher from '../models/Teacher.js';
import Settings from '../models/Settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const courses = [
  {
    title: 'Artificial Intelligence (Machine Learning)',
    description: 'Deep dive into AI and ML algorithms to build intelligent systems.',
    duration: '3 Months',
    level: 'Advanced',
    category: 'AI & ML',
    instructor: 'Dr. Arshad Mehmood',
    isGovernmentFunded: true
  },
  {
    title: 'JavaScript Fullstack (MEAN/MERN)',
    description: 'Master full-stack development using MongoDB, Express, React/Angular, and Node.js.',
    duration: '3 Months',
    level: 'Intermediate',
    category: 'Programming',
    instructor: 'Asad Ullah',
    isGovernmentFunded: true
  },
  {
    title: 'Advance Python Programming & Applications',
    description: 'Expert level Python training for data science and automation.',
    duration: '3 Months',
    level: 'Advanced',
    category: 'Programming',
    instructor: 'Asad Ullah',
    isGovernmentFunded: true
  },
  {
    title: 'Cyber Security (CEH)',
    description: 'Professional ethical hacking course with international certification.',
    duration: '3 Months',
    level: 'Advanced',
    category: 'Cybersecurity',
    instructor: 'Mr. Farhan Ahmed',
    isGovernmentFunded: true
  },
  {
    title: 'Digital Marketing & SEO',
    description: 'Learn to grow businesses online using search engines and social media.',
    duration: '3 Months',
    level: 'Intermediate',
    category: 'Business',
    instructor: 'Ms. Zoya Qureshi',
    isGovernmentFunded: true
  },
  {
    title: 'Graphic Design & Video Editing',
    description: 'Master visual communication through graphic design and video production.',
    duration: '3 Months',
    level: 'Intermediate',
    category: 'Design',
    instructor: 'Ms. Zoya Qureshi',
    isGovernmentFunded: true
  },
  {
    title: 'Certificate in IT (Web Development)',
    description: 'Start your journey in web development with essential IT certifications.',
    duration: '3 Months',
    level: 'Beginner',
    category: 'Programming',
    instructor: 'Asad Ullah',
    isGovernmentFunded: true
  }
];

const teachers = [
  {
    name: 'Dr. Arshad Mehmood',
    email: 'arshad@techhub.com',
    designation: 'Senior AI Researcher',
    bio: 'Machine Learning & Neural Networks expert with decades of experience.',
    specialization: ['AI', 'Machine Learning', 'Neural Networks'],
    image: 'instructor-1.png'
  },
  {
    name: 'Asad Ullah',
    email: 'asad@techhub.com',
    designation: 'Full Stack Web Developer',
    bio: 'MERN Stack & Cloud Architecture expert teaching modern web technologies.',
    specialization: ['React', 'Node.js', 'MongoDB', 'Cloud'],
    image: 'instructor-2.png'
  },
  {
    name: 'Mr. Farhan Ahmed',
    email: 'farhan@techhub.com',
    designation: 'Security Consultant',
    bio: 'Ethical Hacking & Network Security professional with international certification.',
    specialization: ['Cyber Security', 'Ethical Hacking', 'Networking'],
    image: 'instructor-3.png'
  },
  {
    name: 'Ms. Zoya Qureshi',
    email: 'zoya@techhub.com',
    designation: 'Creative Director',
    bio: 'Visual Arts & Motion Graphics expert guiding students in creative fields.',
    specialization: ['Graphic Design', 'Video Editing', 'Motion Graphics'],
    image: 'instructor-4.png'
  }
];

const settings = {
  key: 'main_content',
  principal: {
    name: 'Muhammad Salman',
    designation: 'Principal, Tech Hub',
    message: [
      'Welcome to Tech Hub Innovation Center Bahawalpur. Our mission is to transform the technological landscape of our region by providing world-class, free IT education to the youth.',
      'We believe that skill development is the key to economic prosperity. Through our partnership with NAVTTC and PMYSDP, we ensure that every student who enters our doors receives the highest standard of technical training and international certification.',
      'Our doors are always open to those who dare to dream and are ready to work hard to achieve professional excellence in the global tech market.'
    ],
    visionaryTitle: 'Principal & IT Visionary'
  },
  mission: 'To empower individuals and organizations with the knowledge and skills needed to excel in the rapidly evolving field of Information Technology. We are committed to providing high-quality, comprehensive, and practical IT training programs that equip our students with the latest industry-relevant skills, tools, and technologies.',
  vision: 'To be the preferred choice for IT training, recognized for our excellence, integrity, and commitment to student satisfaction. We strive to highlight the inner potential of students in order to develop the competitive character needed to face the professional world in Pakistan and beyond.',
  coreValues: [
    {
      title: 'Innovation',
      description: 'Staying at the forefront of technological advancements to provide the most relevant training.',
      icon: 'Zap',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Excellence',
      description: 'Committed to the highest standards of technical education and practical hands-on learning.',
      icon: 'Award',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Integrity',
      description: 'Building trust through ethical practices and transparent communication with our students.',
      icon: 'ShieldCheck',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Student-Centric',
      description: 'Focusing on the growth and perception of individuals to help them face the professional world.',
      icon: 'Users',
      color: 'bg-blue-50 text-blue-600'
    }
  ],
  stats: [
    { label: 'Years Experience', value: '20+', icon: 'Award' },
    { label: 'Successful Graduates', value: '10,000+', icon: 'Users' },
    { label: 'IT Courses', value: '25+', icon: 'BookOpen' },
    { label: 'Expert Instructors', value: '50+', icon: 'Rocket' }
  ]
};

const runSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for seeding...');

    // Clear existing data
    await Course.deleteMany();
    await Teacher.deleteMany();
    await Settings.deleteMany();

    // Seed Courses
    await Course.insertMany(courses);
    console.log('Courses seeded successfully');

    // Seed Teachers
    await Teacher.insertMany(teachers);
    console.log('Teachers seeded successfully');

    // Seed Settings
    await Settings.create(settings);
    console.log('Site settings seeded successfully');

    console.log('All data seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
};

runSeeder();
