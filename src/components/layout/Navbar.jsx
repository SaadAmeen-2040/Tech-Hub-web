import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <h2>Tech Hub</h2>
      <Link to="/">Home</Link> |{" "}
      <Link to="/programs">Programs</Link> |{" "}
      <Link to="/contact">Contact</Link>
    </nav>
  );
}