import User from '../models/User.js';
import Course from '../models/Course.js';
import Teacher from '../models/Teacher.js';
import Settings from '../models/Settings.js';

export const seedData = async () => {
  try {
    // 1. Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@techhub.com' });
    if (!adminExists) {
      console.log('Seeding initial admin user...');
      await User.create({
        name: 'Tech Hub Admin',
        email: 'admin@techhub.com',
        password: 'adminpassword123',
        role: 'admin'
      });
      console.log('Admin user created successfully: admin@techhub.com / adminpassword123');
    }

    // 2. Seed Teachers
    const teachersCount = await Teacher.countDocuments();
    if (teachersCount === 0) {
      console.log('Seeding teachers...');
      await Teacher.insertMany([
        {
          name: 'Dr. Arshad Mehmood',
          email: 'arshad@techhub.com',
          designation: 'Senior AI Researcher',
          bio: 'Machine Learning & Neural Networks expert.',
          specialization: ['AI', 'Machine Learning'],
          image: 'instructor_ai_1778326782354.png'
        },
        {
          name: 'Asad Ullah',
          email: 'asad@techhub.com',
          designation: 'Full Stack Web Developer',
          bio: 'MERN Stack & Cloud Architecture expert.',
          specialization: ['React', 'Node.js', 'MongoDB'],
          image: 'instructor_web_1778326811927.png'
        },
        {
          name: 'Mr. Farhan Ahmed',
          email: 'farhan@techhub.com',
          designation: 'Security Consultant',
          bio: 'Ethical Hacking & Network Security professional.',
          specialization: ['Cyber Security', 'Networking'],
          image: 'instructor_cyber_1778326831507.png'
        },
        {
          name: 'Ms. Zoya Qureshi',
          email: 'zoya@techhub.com',
          designation: 'Creative Director',
          bio: 'Visual Arts & Motion Graphics expert.',
          specialization: ['Graphic Design', 'Video Editing'],
          image: 'instructor_design_1778326854007.png'
        }
      ]);
    }

    // 3. Seed Courses
    const coursesCount = await Course.countDocuments();
    if (coursesCount === 0) {
      console.log('Seeding courses...');
      await Course.insertMany([
        { title: 'Artificial Intelligence (Machine Learning)', description: 'Deep dive into AI and ML algorithms.', duration: '3 Months', level: 'Advanced', category: 'AI & ML', instructor: 'Dr. Arshad Mehmood', isGovernmentFunded: true },
        { title: 'JavaScript Fullstack (MEAN/MERN)', description: 'Master full-stack development.', duration: '3 Months', level: 'Intermediate', category: 'Programming', instructor: 'Asad Ullah', isGovernmentFunded: true },
        { title: 'Advance Python Programming & Applications', description: 'Expert level Python training.', duration: '3 Months', level: 'Advanced', category: 'Programming', instructor: 'Asad Ullah', isGovernmentFunded: true },
        { title: 'Cyber Security (CEH)', description: 'Professional ethical hacking.', duration: '3 Months', level: 'Advanced', category: 'Cybersecurity', instructor: 'Mr. Farhan Ahmed', isGovernmentFunded: true },
        { title: 'Digital Marketing & SEO', description: 'Learn to grow businesses online.', duration: '3 Months', level: 'Intermediate', category: 'Business', instructor: 'Ms. Zoya Qureshi', isGovernmentFunded: true },
        { title: 'Graphic Design & Video Editing', description: 'Master visual communication.', duration: '3 Months', level: 'Intermediate', category: 'Design', instructor: 'Ms. Zoya Qureshi', isGovernmentFunded: true },
        { title: 'Certificate in IT (Web Development)', description: 'Start your journey in web development.', duration: '3 Months', level: 'Beginner', category: 'Programming', instructor: 'Asad Ullah', isGovernmentFunded: true }
      ]);
    }

    // 4. Seed Settings
    const settingsExists = await Settings.findOne({ key: 'main_content' });
    if (!settingsExists) {
      console.log('Seeding site settings...');
      await Settings.create({
        key: 'main_content',
        principal: {
          name: 'Muhammad Salman',
          designation: 'Principal, Tech Hub',
          image: 'principal_salman.png',
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
          { title: 'Innovation', description: 'Staying at the forefront of technological advancements.', icon: 'Zap', color: 'bg-indigo-50 text-indigo-600' },
          { title: 'Excellence', description: 'Committed to the highest standards of technical education.', icon: 'Award', color: 'bg-purple-50 text-purple-600' },
          { title: 'Integrity', description: 'Building trust through ethical practices.', icon: 'ShieldCheck', color: 'bg-emerald-50 text-emerald-600' },
          { title: 'Student-Centric', description: 'Focusing on the growth of individuals.', icon: 'Users', color: 'bg-blue-50 text-blue-600' }
        ],
        stats: [
          { label: 'Years Experience', value: '20+', icon: 'Award' },
          { label: 'Successful Graduates', value: '10,000+', icon: 'Users' },
          { label: 'IT Courses', value: '25+', icon: 'BookOpen' },
          { label: 'Expert Instructors', value: '50+', icon: 'Rocket' }
        ]
      });
    }
  } catch (err) {
    console.error('Error seeding data:', err.message);
  }
};
