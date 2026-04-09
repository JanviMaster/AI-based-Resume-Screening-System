import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Candidates() {
  const location = useLocation();
  const jd = location.state?.jd;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!jd) {
        setData([]);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch("http://127.0.0.1:8000/job/match-resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ job_description: jd }),
        });

        const result = await res.json();

        if (!Array.isArray(result)) {
          console.error("Invalid response:", result);
          setData([]);
          return;
        }

        const formatted = result.map((item) => ({
          name: item.candidate,
          score: item.scores.final_score,
        }));

        setData(formatted);
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jd]);

  return (
    <Layout>
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Matched Candidates</h1>

      {/* Candidates Table */}
      {loading ? (
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <p className="text-gray-600">Loading candidates...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <p className="text-gray-500">No candidates found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="text-left">Score</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c, i) => (
                <tr key={i} className="border-t">
                  <td className="p-4">{c.name}</td>
                  <td>{c.score}%</td>
                  <td
                    className={
                      c.score > 70
                        ? "text-green-600 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {c.score > 70 ? "Shortlisted" : "Rejected"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        
        <button className="bg-blue-900 text-white p-4 rounded-xl shadow hover:bg-blue-950">
          Upload Resume
        </button>
        <button className="px-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          Upload JD
        </button>
      </div>

      {/* Recent Activity (placeholder) */}
      <div className="bg-white p-6 rounded-2xl shadow mt-10">
        <h3 className="text-lg font-semibold mb-4">Recent Matches</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✔ Candidate A matched for Frontend Developer</li>
          <li>✖ Candidate B rejected for Backend Engineer</li>
          <li>✔ Candidate C shortlisted for Data Analyst</li>
        </ul>
      </div>
    </Layout>
  );
}

export default Candidates;