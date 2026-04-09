const BASE_URL = "http://127.0.0.1:8000"; // your backend

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
// http://127.0.0.1:8000/resume/upload-resume
  const res = await fetch(`${BASE_URL}/resume/upload-resume`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const uploadJD = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload-jd`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const getCandidates = async () => {
  const res = await fetch(`${BASE_URL}/candidates`);
  return res.json();
};

export const getAnalytics = async () => {
  const res = await fetch(`${BASE_URL}/analytics`);
  return res.json();
};