import Layout from "../components/Layout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Shortlisted", value: 45 },
  { name: "Rejected", value: 75 },
];

function Analytics() {
  return (
    <Layout>
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      {/* Chart Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Candidate Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

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
        <h3 className="text-lg font-semibold mb-4">Recent Analytics</h3>
        <ul className="space-y-2 text-gray-700">
          <li>📊 45 candidates shortlisted this week</li>
          <li>📊 75 candidates rejected this week</li>
          <li>📊 Shortlist rate improved by 10% compared to last week</li>
        </ul>
      </div>
    </Layout>
  );
}

export default Analytics;