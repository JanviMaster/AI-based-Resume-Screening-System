import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Upload Resume", path: "/upload-resume" },
    { name: "Upload JD", path: "/upload-jd" },
    { name: "Candidates", path: "/candidates" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <div className="flex min-h-screen">
  {/* Sidebar */}
  <div className="w-64 bg-gray-900 text-white p-5">
    <h2 className="text-2xl font-bold mb-10">🌐 Smart Recruiter</h2>
    <nav className="flex flex-col gap-3">
      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`p-2 rounded-lg transition ${
            location.pathname === item.path
              ? "bg-blue-600"
              : "hover:bg-gray-700"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  </div>

  {/* Main Content */}
  <div className="flex-1 bg-gray-100 p-6">
    {/* Your page content here */}
  </div>
</div>
  );
}

export default Sidebar;