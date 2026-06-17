import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Interview = () => {
  const [stage, setStage] = useState("setup"); // setup | interview | summary
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("mid");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [inputMode, setInputMode] = useState("type"); // type | speak
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qaPairs, setQaPairs] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [finalSummary, setFinalSummary] = useState("");

  const recognitionRef = useRef(null);
  const startTimeRef = useRef(null);
  const speechSupported = typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    if (!speechSupported) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      setAnswer(transcript.trim());
    };

    recognition.onerror = () => setIsRecording(false);

    recognitionRef.current = recognition;
  }, []);

  const startSetup = async (e) => {
    e.preventDefault();
    if (!role.trim()) return;

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/interview/questions", {
        role,
        level,
      });

      if (data.success) {
        setQuestions(data.questions);
        setStage("interview");
        setCurrentIndex(0);
        startTimeRef.current = Date.now();
      } else {
        setError(data.message || "Failed to generate questions");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setAnswer("");
      startTimeRef.current = Date.now();
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    setLoading(true);
    setError("");
    setCurrentFeedback(null);

    const durationSeconds = startTimeRef.current
      ? Math.round((Date.now() - startTimeRef.current) / 1000)
      : null;

    try {
      const { data } = await axios.post("http://localhost:5000/api/interview/analyze-answer", {
        question: questions[currentIndex],
        answer,
        durationSeconds: inputMode === "speak" ? durationSeconds : null,
        role,
      });

      if (data.success) {
        setCurrentFeedback(data.feedback);
        setQaPairs((prev) => [
          ...prev,
          { question: questions[currentIndex], answer, metrics: data.metrics },
        ]);
      } else {
        setError(data.message || "Failed to analyze answer");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    setAnswer("");
    setCurrentFeedback(null);
    startTimeRef.current = Date.now();

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishInterview();
    }
  };

  const finishInterview = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/interview/summary", {
        role,
        qaPairs,
      });

      if (data.success) {
        setFinalSummary(data.summary);
        setStage("summary");
      } else {
        setError(data.message || "Failed to generate summary");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStage("setup");
    setRole("");
    setQuestions([]);
    setCurrentIndex(0);
    setAnswer("");
    setQaPairs([]);
    setCurrentFeedback(null);
    setFinalSummary("");
    setError("");
  };

  const cardStyle = {
    borderRadius: "24px",
    border: "1px solid rgba(6,182,212,0.2)",
    background: "rgba(11,17,32,0.7)",
    backdropFilter: "blur(20px)",
    padding: "32px",
    maxWidth: "900px",
  };

  return (
    <div style={{ padding: "24px 40px" }}>
      <div style={cardStyle}>
        <p style={{ color: "#22d3ee", fontWeight: 600, marginBottom: "8px" }}>
          AI Interview Practice
        </p>

        {/* SETUP STAGE */}
        {stage === "setup" && (
          <>
            <h2 style={{ color: "white", fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>
              Practice your next interview
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "24px", fontSize: "14px" }}>
              Note: confidence and fluency scores are estimated from language patterns and pace,
              not actual voice tone or body language.
            </p>

            <form onSubmit={startSetup}>
              <label style={{ color: "#94a3b8", fontSize: "14px", display: "block", marginBottom: "8px" }}>
                Job title you're interviewing for
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer, Product Manager"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  background: "#111827",
                  border: "1px solid rgba(6,182,212,0.2)",
                  color: "white",
                  padding: "12px 16px",
                  marginBottom: "16px",
                  fontSize: "15px",
                }}
              />

              <label style={{ color: "#94a3b8", fontSize: "14px", display: "block", marginBottom: "8px" }}>
                Experience level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  background: "#111827",
                  border: "1px solid rgba(6,182,212,0.2)",
                  color: "white",
                  padding: "12px 16px",
                  marginBottom: "24px",
                  fontSize: "15px",
                }}
              >
                <option value="entry">Entry level</option>
                <option value="mid">Mid level</option>
                <option value="senior">Senior level</option>
              </select>

              <button
                type="submit"
                disabled={!role.trim() || loading}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  background: !role.trim() || loading ? "#475569" : "#22d3ee",
                  color: "#0b1120",
                  fontWeight: 700,
                  padding: "12px",
                  border: "none",
                  cursor: !role.trim() || loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Preparing questions..." : "Start Interview"}
              </button>

              {error && <p style={{ color: "#f87171", marginTop: "12px", fontSize: "14px" }}>{error}</p>}
            </form>
          </>
        )}

        {/* INTERVIEW STAGE */}
        {stage === "interview" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ color: "white", fontSize: "22px", fontWeight: 700 }}>
                {role} — Question {currentIndex + 1} of {questions.length}
              </h2>
              <div style={{ display: "flex", gap: "4px" }}>
                {questions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "24px",
                      height: "6px",
                      borderRadius: "3px",
                      background: i <= currentIndex ? "#22d3ee" : "#334155",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                background: "#111827",
                borderRadius: "16px",
                padding: "20px",
                color: "white",
                fontSize: "17px",
                marginBottom: "20px",
                border: "1px solid rgba(6,182,212,0.1)",
              }}
            >
              {questions[currentIndex]}
            </div>

            {!currentFeedback && (
              <>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setInputMode("type")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(6,182,212,0.3)",
                      background: inputMode === "type" ? "#22d3ee" : "transparent",
                      color: inputMode === "type" ? "#0b1120" : "#94a3b8",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    Type
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode("speak")}
                    disabled={!speechSupported}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(6,182,212,0.3)",
                      background: inputMode === "speak" ? "#22d3ee" : "transparent",
                      color: inputMode === "speak" ? "#0b1120" : "#94a3b8",
                      cursor: speechSupported ? "pointer" : "not-allowed",
                      fontSize: "13px",
                    }}
                  >
                    {speechSupported ? "Speak" : "Speak (unsupported)"}
                  </button>
                </div>

                {inputMode === "speak" && (
                  <button
                    type="button"
                    onClick={toggleRecording}
                    style={{
                      marginBottom: "12px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      border: "none",
                      background: isRecording ? "#f87171" : "#22d3ee",
                      color: "#0b1120",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </button>
                )}

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={inputMode === "speak" ? "Your speech will appear here..." : "Type your answer..."}
                  readOnly={inputMode === "speak" && isRecording}
                  style={{
                    width: "100%",
                    minHeight: "140px",
                    borderRadius: "12px",
                    background: "#111827",
                    border: "1px solid rgba(6,182,212,0.2)",
                    color: "white",
                    padding: "16px",
                    fontSize: "15px",
                    resize: "vertical",
                    marginBottom: "16px",
                  }}
                />

                <button
                  type="button"
                  onClick={submitAnswer}
                  disabled={!answer.trim() || loading}
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    background: !answer.trim() || loading ? "#475569" : "#22d3ee",
                    color: "#0b1120",
                    fontWeight: 700,
                    padding: "12px",
                    border: "none",
                    cursor: !answer.trim() || loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Analyzing..." : "Submit Answer"}
                </button>

                {error && <p style={{ color: "#f87171", marginTop: "12px", fontSize: "14px" }}>{error}</p>}
              </>
            )}

            {currentFeedback && (
              <>
                <div
                  style={{
                    background: "#111827",
                    borderRadius: "16px",
                    padding: "24px",
                    color: "#e2e8f0",
                    lineHeight: "1.7",
                    marginBottom: "16px",
                    border: "1px solid rgba(6,182,212,0.1)",
                  }}
                >
                  <ReactMarkdown>{currentFeedback}</ReactMarkdown>
                </div>

                <button
                  type="button"
                  onClick={nextQuestion}
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    background: "#22d3ee",
                    color: "#0b1120",
                    fontWeight: 700,
                    padding: "12px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {currentIndex < questions.length - 1 ? "Next Question" : "Finish Interview"}
                </button>
              </>
            )}
          </>
        )}

        {/* SUMMARY STAGE */}
        {stage === "summary" && (
          <>
            <h2 style={{ color: "white", fontSize: "28px", fontWeight: 800, marginBottom: "20px" }}>
              Interview Summary — {role}
            </h2>

            <div
              style={{
                background: "#111827",
                borderRadius: "16px",
                padding: "24px",
                color: "#e2e8f0",
                lineHeight: "1.7",
                marginBottom: "20px",
                border: "1px solid rgba(6,182,212,0.1)",
              }}
            >
              <ReactMarkdown>{finalSummary}</ReactMarkdown>
            </div>

            <button
              type="button"
              onClick={restart}
              style={{
                width: "100%",
                borderRadius: "12px",
                border: "1px solid rgba(6,182,212,0.4)",
                color: "#22d3ee",
                fontWeight: 700,
                padding: "12px",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Practice Another Interview
            </button>
          </>
        )}

        {loading && stage !== "setup" && !currentFeedback && stage !== "summary" && (
          <p style={{ color: "#94a3b8", marginTop: "12px", fontSize: "14px" }}>Processing...</p>
        )}
      </div>
    </div>
  );
};

export default Interview;