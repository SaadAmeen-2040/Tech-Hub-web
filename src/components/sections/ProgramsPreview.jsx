import { programs } from "../../data/programs";
import { useNavigate } from "react-router-dom";

export default function ProgramsPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">
        Our Programs
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {programs.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            {/* Badge */}
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              FREE
            </span>

            <h3 className="text-xl font-bold mt-3 mb-2">{p.title}</h3>

            <p className="text-gray-600 mb-4">{p.description}</p>

            <p className="text-sm text-gray-500">
              Duration: {p.duration}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Level: {p.level}
            </p>

            <button
              onClick={() =>
                navigate("/contact", { state: { program: p.title } })
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}