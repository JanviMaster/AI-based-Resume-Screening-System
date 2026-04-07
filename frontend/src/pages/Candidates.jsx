import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Candidates() {
  const location = useLocation();
  const jd = location.state?.jd;

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (jd) {
      fetchResults();
    }
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/match-resume", null, {
  params: {
    job_description: jd,
  },
});
      setResults(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Matched Candidates</h2>

      {results.map((item, index) => (
        <div key={index}>
          <h3>{item.candidate}</h3>
          <p>Final Score: {item.scores.final_score}</p>
          <p>Skill Score: {item.scores.skill_score}</p>
          <p>Similarity Score: {item.scores.similarity_score}</p>
          <p>Experience Score: {item.scores.experience_score}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Candidates;