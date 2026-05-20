import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Models
import User from './models/User.js';
import Teacher from './models/Teacher.js';
import Course from './models/Course.js';
import Event from './models/Event.js';
import Blog from './models/Blog.js';
import Testimonial from './models/Testimonial.js';
import Gallery from './models/Gallery.js';
import Project from './models/Project.js';
import Service from './models/Service.js';
import Contact from './models/Contact.js';
import Admission from './models/Admission.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const seedAllDummy = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully.');

    // 1. Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@techhub.com' });
    if (!adminExists) {
      await User.create({
        name: 'Tech Hub Admin',
        email: 'admin@techhub.com',
        password: 'adminpassword123',
        role: 'admin'
      });
      console.log('✔ Seeded Admin User: admin@techhub.com / adminpassword123');
    } else {
      console.log('✔ Admin User already exists');
    }

    // 2. Seed Teachers / Instructors
    const teacherCount = await Teacher.countDocuments();
    if (teacherCount === 0) {
      await Teacher.insertMany([
        {
          name: 'Asad Ullah',
          designation: 'Senior Web Architect',
          bio: 'Asad is a software architect with 8+ years of industry experience building modular SaaS systems.',
          image: 'teacher1.png',
          email: 'asad@techhub.com',
          specialization: ['React', 'Node.js', 'MongoDB', 'GraphQL'],
          socialLinks: { linkedin: 'https://linkedin.com', whatsapp: '+923080000000' }
        },
        {
          name: 'Mr. Farhan Ahmed',
          designation: 'Cyber Security Lead',
          bio: 'Farhan is an expert ethical hacker and certified forensics investigator.',
          image: 'teacher2.png',
          email: 'farhan@techhub.com',
          specialization: ['Ethical Hacking', 'Digital Forensics', 'Penetration Testing'],
          socialLinks: { linkedin: 'https://linkedin.com', whatsapp: '+923080000001' }
        },
        {
          name: 'Ms. Zoya Qureshi',
          designation: 'UX/UI Designer',
          bio: 'Zoya designs intuitive products and teaches high-impact prototyping.',
          image: 'teacher3.png',
          email: 'zoya@techhub.com',
          specialization: ['Figma', 'Prototyping', 'User Research'],
          socialLinks: { linkedin: 'https://linkedin.com', whatsapp: '+923080000002' }
        }
      ]);
      console.log('✔ Seeded Teachers');
    } else {
      console.log('✔ Teachers already exist');
    }

    // 3. Seed Courses
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany([
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
        }
      ]);
      console.log('✔ Seeded Courses');
    } else {
      console.log('✔ Courses already exist');
    }

    // 4. Seed Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany([
        {
          title: 'Web 3.0 & Metaverse Masterclass',
          description: 'A comprehensive seminar exploring decentralized applications, smart contracts, and next-generation browser experiences.',
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
          time: '11:00 AM - 01:30 PM',
          venue: 'Main Seminar Hall, Tech Hub Campus',
          thumbnail: 'event1.jpg',
          category: 'Seminar',
          registrationLink: 'https://forms.gle/xyz',
          isFeatured: true
        },
        {
          title: 'React & Node JS Production Bootcamp',
          description: 'Hands-on live coding workshop building secure, deployment-ready fullstack apps from scratch.',
          date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
          time: '09:00 AM - 04:00 PM',
          venue: 'Lab 2, Tech Hub Campus',
          thumbnail: 'event2.jpg',
          category: 'Workshop',
          registrationLink: 'https://forms.gle/abc',
          isFeatured: false
        }
      ]);
      console.log('✔ Seeded Events');
    } else {
      console.log('✔ Events already exist');
    }

    // 5. Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany([
        {
          title: 'Getting Started with React in 2026',
          slug: 'getting-started-with-react-2026',
          excerpt: 'Learn the core principles of React v19, dynamic imports, server components, and native hydration.',
          content: 'React has evolved significantly. In 2026, developers are building highly optimized web applications using React Server Components, hydration states, and native web capabilities.\n\nKey Concepts:\n1. Server Components vs Client Components.\n2. Enhanced state transitions with useTransition.\n3. Dynamic route preloading.',
          author: 'Tech Hub Web Team',
          image: 'blog1.jpg',
          category: 'Web Development',
          tags: ['React', 'JavaScript', 'WebDev'],
          isPublished: true,
          views: 124
        },
        {
          title: 'Securing MongoDB Atlas Cloud Deployments',
          slug: 'securing-mongodb-atlas-deployments',
          excerpt: 'A step-by-step checklist to configure firewalls, TLS settings, and role-based cluster authentication.',
          content: 'Database security is vital. With MongoDB Atlas cloud, developers get automated firewalls, TLS encryption, IP whitelisting, and strict IAM access.\n\nMake sure to whitelist only active application servers and restrict public access keys.',
          author: 'Security Division',
          image: 'blog2.jpg',
          category: 'Cyber Security',
          tags: ['MongoDB', 'Cloud', 'Security'],
          isPublished: true,
          views: 89
        }
      ]);
      console.log('✔ Seeded Blogs');
    } else {
      console.log('✔ Blogs already exist');
    }

    // 6. Seed Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany([
        {
          studentName: 'Zahid Mahmood',
          courseName: 'Advance Web App Development',
          review: 'The structured training and expert instructors at Tech Hub helped me transition from a beginner developer into an industry-ready fullstack engineer. Highly recommended!',
          youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          rating: 5,
          image: 'zahid.jpg',
          isFeatured: true
        },
        {
          studentName: 'Ayesha Khan',
          courseName: 'Cyber Security',
          review: 'Incredible experience learning digital forensics. The lab environment matches global enterprise standards.',
          youtubeLink: '',
          rating: 5,
          image: 'ayesha.jpg',
          isFeatured: true
        }
      ]);
      console.log('✔ Seeded Testimonials');
    } else {
      console.log('✔ Testimonials already exist');
    }

    // 7. Seed Gallery Images
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany([
        {
          title: 'Advanced Computer Lab session',
          image: 'gallery_lab.jpg',
          category: 'Labs'
        },
        {
          title: 'Annual Graduation Ceremony',
          image: 'gallery_grad.jpg',
          category: 'Events'
        }
      ]);
      console.log('✔ Seeded Gallery Images');
    } else {
      console.log('✔ Gallery Images already exist');
    }

    // 8. Seed Student Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: 'Automated Pharmacy Inventory System',
          student: 'Saad Ameen',
          course: 'JavaScript Fullstack (MERN)',
          image: 'project_pharmacy.jpg',
          description: 'A robust cloud-based stock manager with barcode integrations, supplier logging, and sales dashboards.',
          tags: ['React', 'Node.js', 'MongoDB', 'Express'],
          type: 'MERN Stack'
        },
        {
          title: 'Threat Intel Dashboard',
          student: 'Hamza Ali',
          course: 'Cyber Security',
          image: 'project_threat.jpg',
          description: 'A visual scanner matching local port packets against known threat databases and sending SMTP alerts.',
          tags: ['Python', 'Network Security', 'React'],
          type: 'Cyber Security'
        }
      ]);
      console.log('✔ Seeded Projects');
    } else {
      console.log('✔ Projects already exist');
    }

    // 9. Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          title: 'Custom Software & SaaS Development',
          description: 'We design and scale cloud-native web portals, APIs, mobile products, and internal dashboards tailored to your enterprise.',
          icon: 'Code2',
          features: ['Scalable React/Node Architectures', 'MongoDB Cloud Integrations', 'High-Performance Rest APIs'],
          color: 'bg-indigo-600',
          highlight: true
        },
        {
          title: 'Corporate Security Audits & Trainings',
          description: 'Ensure your staff and local networks are secure against active threats with specialized white-hat penetration reports.',
          icon: 'ShieldAlert',
          features: ['Vulnerability Assessment', 'Staff Phishing Simulation', 'Compliance Reporting'],
          color: 'bg-purple-600',
          highlight: false
        }
      ]);
      console.log('✔ Seeded Services');
    } else {
      console.log('✔ Services already exist');
    }

    // 10. Seed Inquiries / Contacts
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      await Contact.insertMany([
        {
          name: 'Muhammad Ahmed',
          email: 'ahmed.bwp@gmail.com',
          phone: '+923050123456',
          subject: 'Admission inquiry for fullstack course',
          message: 'Hi, I want to know about the registration deadlines for the next fully-funded government batch.',
          isRead: false
        },
        {
          name: 'Jennifer Parker',
          email: 'jennifer@devscale.co',
          phone: '+15550199',
          subject: 'SaaS development partnership',
          message: 'Hello, we would like to hire your team for custom web portal design. Let us schedule a call.',
          isRead: true
        }
      ]);
      console.log('✔ Seeded Contact Inquiries');
    } else {
      console.log('✔ Contact Inquiries already exist');
    }

    // 11. Seed Admissions
    const admissionCount = await Admission.countDocuments();
    if (admissionCount === 0) {
      await Admission.insertMany([
        {
          fullName: 'Hamza Malik',
          fatherName: 'Muhammad Malik',
          email: 'hamza.malik@gmail.com',
          whatsapp: '+923081234567',
          phone: '+923081234567',
          cnic: '31202-1234567-1',
          dob: new Date('2001-05-15'),
          course: 'Advance Web App Development',
          qualification: 'Bachelors in CS',
          fieldOfStudy: 'Information Technology',
          address: 'Model Town A, Bahawalpur',
          guardianPhone: '+923007654321',
          status: 'Pending'
        },
        {
          fullName: 'Zainab Bibi',
          fatherName: 'Muhammad Tariq',
          email: 'zainab.tariq@gmail.com',
          whatsapp: '+923091122334',
          phone: '+923091122334',
          cnic: '31202-9876543-2',
          dob: new Date('2003-08-20'),
          course: 'JavaScript Fullstack (MERN/MEAN)',
          qualification: 'Intermediate',
          fieldOfStudy: 'Pre-Engineering',
          address: 'Satellite Town, Bahawalpur',
          guardianPhone: '+923018899776',
          status: 'Accepted'
        }
      ]);
      console.log('✔ Seeded Admissions');
    } else {
      console.log('✔ Admissions already exist');
    }

    console.log('All dummy data seeded successfully! You are ready to test the entire Admin Portal.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding dummy data:', err);
    process.exit(1);
  }
};

seedAllDummy();
