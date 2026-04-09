import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function UploadJD() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!jd.trim()) {
      alert("Enter job description");
      return;
    }

    try {
      setLoading(true);
      setSuccess(false);

      // 🔗 Send JD to backend
      const res = await fetch("http://127.0.0.1:8000/upload-jd-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jd }),
      });

      const data = await res.json();
      console.log(data);

      setSuccess(true);

      // 👉 Navigate after processing
      navigate("/candidates", { state: { jd } });
    } catch (error) {
      console.error(error);
      alert("Error uploading JD ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Upload Job Description</h1>

      {/* Upload Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <p className="text-gray-600 mb-4">
          Paste or type the job description below to match candidates.
        </p>

        {/* Textarea */}
        <textarea
          rows="6"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-4 w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Match Candidates"}
        </button>

        {/* Success Message */}
        {success && (
          <p className="text-green-600 text-center mt-4 font-medium">
            ✅ Job description uploaded successfully!
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <button className="px-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          Go to Dashboard
        </button>
        <button className="bg-blue-900 text-white p-4 rounded-xl shadow hover:bg-blue-950">
          Upload Resume
        </button>
        
      </div>

      {/* Recent Activity (placeholder) */}
      <div className="bg-white p-6 rounded-2xl shadow mt-10">
        <h3 className="text-lg font-semibold mb-4">Recent Job Descriptions</h3>
        <ul className="space-y-2 text-gray-700">
          <li>📄 Frontend Developer JD uploaded</li>
          <li>📄 Backend Engineer JD uploaded</li>
          <li>📄 Data Analyst JD uploaded</li>
        </ul>
      </div>
    </Layout>
  );
}

export default UploadJD;