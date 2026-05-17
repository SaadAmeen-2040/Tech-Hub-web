import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Teacher from './models/Teacher.js';

dotenv.config({ path: './server/.env' });

const seedTeachers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding teachers');

    const teachersData = [
      {
        name: "Asad Ullah",
        email: "asad@techhub.com",
        designation: "Full Stack Web Developer",
        bio: "Expert in MERN Stack, Cloud Architecture, and modern Web App Development. Leading the NAVTTC Advance Web App & JavaScript Fullstack tracks.",
        image: "instructor_web_1778326811927.png",
        specialization: ["MERN Stack", "Cloud Architecture", "Web Development"],
        socialLinks: { linkedin: "https://linkedin.com", whatsapp: "+923001234567" }
      },
      {
        name: "Mr. Farhan Ahmed",
        email: "farhan@techhub.com",
        designation: "Security Consultant",
        bio: "Specialist in Ethical Hacking, Network Security, and Digital Forensics. Guiding students in CEH and CHFI global certifications.",
        image: "instructor_cyber_1778326831507.png",
        specialization: ["Ethical Hacking", "Network Security", "Digital Forensics"],
        socialLinks: { linkedin: "https://linkedin.com", whatsapp: "+923001234567" }
      },
      {
        name: "Ms. Zoya Qureshi",
        email: "zoya@techhub.com",
        designation: "Creative Director",
        bio: "UI/UX & Digital Growth Expert. Empowering students in Google UX Design, Graphic Design, and Digital Marketing strategies.",
        image: "instructor_design_1778326854007.png",
        specialization: ["UI/UX Design", "Digital Marketing", "Graphic Design"],
        socialLinks: { linkedin: "https://linkedin.com", whatsapp: "+923001234567" }
      },
      {
        name: "Dr. Arshad Mehmood",
        email: "arshad@techhub.com",
        designation: "Senior AI Researcher",
        bio: "Veteran AI Researcher specializing in Machine Learning, Deep Learning, and Neural Networks. Mentoring advanced IT professionals.",
        image: "instructor_ai_1778326782354.png",
        specialization: ["Machine Learning", "Neural Networks", "Artificial Intelligence"],
        socialLinks: { linkedin: "https://linkedin.com", whatsapp: "+923001234567" }
      }
    ];

    for (const teacher of teachersData) {
      const existing = await Teacher.findOne({ email: teacher.email });
      if (existing) {
        await Teacher.findOneAndUpdate({ email: teacher.email }, teacher);
        console.log(`Updated existing teacher: ${teacher.name}`);
      } else {
        await Teacher.create(teacher);
        console.log(`Created new teacher: ${teacher.name}`);
      }
    }

    console.log('Teachers seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding teachers:', err);
    process.exit(1);
  }
};

seedTeachers();
