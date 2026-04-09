import Layout from "../components/Layout";
import { useState } from "react";
import { uploadResume } from "../services/api";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    try {
      setUploading(true);
      setSuccess(false);

      const res = await uploadResume(file);
      console.log(res);

      setSuccess(true);
      alert("Resume uploaded successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Upload Resume</h1>

      {/* Upload Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <p className="text-gray-600 mb-4">
          Select a resume file (PDF, DOCX) to upload and analyze.
        </p>

        {/* File Input */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {/* Success Message */}
        {success && (
          <p className="text-green-600 text-center mt-4 font-medium">
            ✅ Resume uploaded successfully!
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6 mt-10">
        <button className="px-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          Go to Dashboard
        </button>
        <button className="bg-blue-900 text-white p-4 rounded-xl shadow hover:bg-blue-950">
          Upload JD
        </button>
        
        
      </div>

      {/* Recent Uploads (placeholder) */}
      <div className="bg-white p-6 rounded-2xl shadow mt-10">
        <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
        <ul className="space-y-2 text-gray-700">
          <li>📄 Resume_JohnDoe.pdf uploaded</li>
          <li>📄 Resume_JaneSmith.docx uploaded</li>
          <li>📄 Resume_AlexLee.pdf uploaded</li>
        </ul>
      </div>
    </Layout>
  );
}

export default UploadResume;