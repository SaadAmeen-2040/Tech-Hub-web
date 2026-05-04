import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function LeadForm() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: location.state?.program || "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Apply Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          {/* Auto-filled Program */}
          <input
            type="text"
            name="program"
            placeholder="Program of Interest"
            value={formData.program}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-gray-100"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}