import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from './models/Course.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding courses');

    const navttcCourses = [
      {
        title: "Advance Web App Development",
        description: "Master modern web application architecture, progressive web apps, and enterprise-grade frontend frameworks.",
        duration: "3 Months",
        level: "Advanced",
        category: "Web Development",
        isGovernmentFunded: true,
        instructor: "Asad Ullah",
        price: 0,
        slug: "advance-web-app-development"
      },
      {
        title: "JavaScript Fullstack (MERN/MEAN)",
        description: "Comprehensive training in MongoDB, Express, React/Angular, and Node.js for scalable fullstack solutions.",
        duration: "3 Months",
        level: "Advanced",
        category: "Web Development",
        isGovernmentFunded: true,
        instructor: "Asad Ullah",
        price: 0,
        slug: "javascript-fullstack-mern-mean"
      },
      {
        title: "Cyber Security (CEH, CHFI)",
        description: "Professional ethical hacking and computer hacking forensic investigation with international certification standards.",
        duration: "3 Months",
        level: "Advanced",
        category: "Cyber Security",
        isGovernmentFunded: true,
        instructor: "Mr. Farhan Ahmed",
        price: 0,
        slug: "cyber-security-ceh-chfi"
      },
      {
        title: "Google UX Design",
        description: "Learn user experience design, wireframing, prototyping, and user research following Google design principles.",
        duration: "3 Months",
        level: "Intermediate",
        category: "Design",
        isGovernmentFunded: true,
        instructor: "Ms. Zoya Qureshi",
        price: 0,
        slug: "google-ux-design"
      },
      {
        title: "Digital Forensics",
        description: "Investigate cyber crimes, analyze digital evidence, and master forensic tools for enterprise security.",
        duration: "3 Months",
        level: "Advanced",
        category: "Cyber Security",
        isGovernmentFunded: true,
        instructor: "Mr. Farhan Ahmed",
        price: 0,
        slug: "digital-forensics"
      },
      {
        title: "Artificial Intelligence (Machine Learning)",
        description: "Deep dive into AI and ML algorithms to build intelligent systems.",
        duration: "3 Months",
        level: "Advanced",
        category: "Artificial Intelligence",
        isGovernmentFunded: true,
        instructor: "Dr. Arshad Mehmood",
        price: 0,
        slug: "artificial-intelligence-machine-learning"
      }
    ];

    for (const courseData of navttcCourses) {
      const existing = await Course.findOne({ slug: courseData.slug });
      if (existing) {
        await Course.findOneAndUpdate({ slug: courseData.slug }, courseData);
        console.log(`Updated existing course: ${courseData.title}`);
      } else {
        await Course.create(courseData);
        console.log(`Created new course: ${courseData.title}`);
      }
    }

    console.log('NAVTTC courses seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding courses:', err);
    process.exit(1);
  }
};

seedCourses();
