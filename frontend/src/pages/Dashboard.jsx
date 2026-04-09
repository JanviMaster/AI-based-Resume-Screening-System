import Layout from "../components/Layout";
import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    shortlisted: 0,
    rejected: 0,
  });

  const jd = "web development html css javascript"; // example JD

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/job/match-resume?job_description=${jd}`,
          { method: "POST" }
        );

        const result = await response.json();
        console.log("API Result:", result);

        if (!Array.isArray(result)) return;

        const total = result.length;
        const shortlisted = result.filter(
          (c) => c.scores.final_score > 70
        ).length;
        const rejected = total - shortlisted;

        setStats({ total, shortlisted, rejected });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const shortlistedPercent =
    stats.total > 0 ? (stats.shortlisted / stats.total) * 100 : 0;

  return (
    <Layout>
      {/* Welcome Card */}
      <div className="bg-blue-50 p-6 rounded-2xl shadow mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Recruiter!</h1>
        <p className="text-gray-600">
          You have {stats.shortlisted} shortlisted candidates ready for review.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Total Candidates</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Shortlisted</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.shortlisted}
          </p>
          {/* Progress bar */}
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${shortlistedPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p className="text-3xl font-bold text-red-500">{stats.rejected}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <button 
        // className="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700"
        className="px-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 text-white"
        >
          Upload Resume
        </button>
        <button 
        className="bg-blue-900 text-white p-4 rounded-xl shadow hover:bg-blue-950"
        // classname="px-2  bg-gradient-to-r from-purple-400 to-pink-500 text-white"
        >
          Upload JD
        </button>
        
      </div>

      {/* Recent Activity (placeholder) */}
      <div className="bg-white p-6 rounded-2xl shadow mt-10">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✔ Candidate A shortlisted</li>
          <li>✖ Candidate B rejected</li>
          <li>✔ Candidate C shortlisted</li>
        </ul>
      </div>
    </Layout>
  );
}

export default Dashboard;