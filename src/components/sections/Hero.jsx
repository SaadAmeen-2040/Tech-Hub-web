import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Web Development",
    desc: "Learn HTML, CSS, JavaScript & React",
    img: "https://static.vecteezy.com/system/resources/thumbnails/006/709/644/small/abstract-modern-tech-of-programming-code-screen-developer-free-photo.jpg",
  },
  {
    title: "Graphic Design",
    desc: "Master Photoshop & Illustrator",
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
  },
  {
    title: "Freelancing",
    desc: "Earn online using Fiverr & Upwork",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="h-[80vh] mt-18 flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${slide.img})` }}
    >
      <div className="bg-black/60 p-8 rounded-xl max-w-xl">
        <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>

        <p className="mb-6">{slide.desc}</p>

        <button
          onClick={() =>
            navigate("/contact", { state: { program: slide.title } })
          }
          className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
        >
          Apply Now
        </button>
      </div>
    </section>
  );
}