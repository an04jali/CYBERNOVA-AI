import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setFileName(selected.name);
    setReview("");
    setError("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    setReview("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await axios.post(
        "https://cybernova-ai-backend.onrender.com/api/resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        setReview(data.review);
      } else {
        setError(data.message || "Failed to review resume");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px 40px" }}>
      <div
        style={{
          borderRadius: "24px",
          border: "1px solid rgba(6,182,212,0.2)",
          background: "rgba(11,17,32,0.7)",
          backdropFilter: "blur(20px)",
          padding: "32px",
          maxWidth: "900px",
        }}
      >
        <p style={{ color: "#22d3ee", fontWeight: 600, marginBottom: "8px" }}>
          AI Resume Reviewer
        </p>
        <h2 style={{ color: "white", fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>
          Get ATS, grammar & SEO insights for your resume
        </h2>
        <p style={{ color: "#94a3b8", marginBottom: "24px", fontSize: "14px" }}>
          Upload your resume as PDF or TXT to get a detailed analysis.
        </p>

        <form onSubmit={onSubmitHandler}>
          <label
            htmlFor="resume-upload"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              border: "2px dashed rgba(6,182,212,0.3)",
              background: "#111827",
              height: "140px",
              cursor: "pointer",
              textAlign: "center",
              padding: "16px",
            }}
          >
            <span style={{ color: "#94a3b8" }}>
              {fileName ? `Selected: ${fileName}` : "Click to upload your resume (PDF or TXT)"}
            </span>
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button
            type="submit"
            disabled={!file || loading}
            style={{
              marginTop: "16px",
              width: "100%",
              borderRadius: "12px",
              background: !file || loading ? "#475569" : "#22d3ee",
              color: "#0b1120",
              fontWeight: 700,
              padding: "12px",
              border: "none",
              cursor: !file || loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Analyzing resume..." : "Review Resume"}
          </button>

          {error && (
            <p style={{ color: "#f87171", marginTop: "12px", fontSize: "14px" }}>
              {error}
            </p>
          )}
        </form>

        {review && (
          <div
            style={{
              marginTop: "32px",
              background: "#111827",
              borderRadius: "16px",
              border: "1px solid rgba(6,182,212,0.1)",
              padding: "24px",
              color: "#e2e8f0",
              lineHeight: "1.7",
            }}
          >
            <ReactMarkdown>{review}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;