import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadJD() {
  const [jd, setJd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!jd) {
      alert("Enter job description");
      return;
    }
    
    // Pass JD to next page
    navigate("/candidates", { state: { jd } });
  };

  return (
    <div>
      <h2>Enter Job Description</h2>

      <textarea
        rows="6"
        cols="50"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Match Candidates</button>
    </div>
  );
}

export default UploadJD;