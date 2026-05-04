import { programs } from "../../data/programs";
import { useNavigate } from "react-router-dom";

export default function ProgramsPreview() {
  const navigate = useNavigate(); // ✅ add this

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our Programs
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {programs.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-gray-600 mb-2">{p.description}</p>

            <p className="text-sm text-gray-500">
              Duration: {p.duration}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Level: {p.level}
            </p>

            {/* ✅ FIXED BUTTON */}
            <button
              onClick={() => navigate("/contact")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}