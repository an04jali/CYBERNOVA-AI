import { useState } from "react";

const CHIPS = [
  "AI & Machine Learning", "Web3 & Blockchain", "Cybersecurity",
  "Cloud Architecture", "Prompt Engineering", "DevOps",
];

export default function WriteArticle() {
  const [topic, setTopic] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const generate = async () => {
    if (!topic.trim()) { setError("Please enter a topic first."); return; }
    setError(""); setLoading(true); setArticle(""); setMinimized(false);
    try {
      const res = await fetch("http://localhost:5000/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: topic }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setArticle(data.article);
    } catch (e) {
      setError(e.message?.includes("fetch")
        ? "Cannot reach server. Make sure your API is running on port 5000."
        : e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(article).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f0f6ff", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
        AI Article Writer
      </h1>
      <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 28px" }}>
        Generate professional AI-powered articles instantly.
      </p>

      {/* Input + Button Row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          onKeyDown={e => e.key === "Enter" && generate()}
          placeholder="Enter article topic…"
          style={{
            flex: 1, height: 52, background: "#0c1929",
            border: "1.5px solid #7dd3fc", borderRadius: 10,
            color: "#e2e8f0", fontSize: 14, padding: "0 16px",
            outline: "none", fontFamily: "inherit", boxSizing: "border-box",
          }}
        />
        <button
          onClick={generate}
          disabled={loading}
          style={{
            height: 52, padding: "0 26px",
            background: loading ? "#0f2030" : "#1e6a8a",
            border: `1.5px solid ${loading ? "#1e3a52" : "#38bdf8"}`,
            borderRadius: 10,
            color: loading ? "#2d5066" : "#bae6fd",
            fontSize: 15, fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 8,
            transition: "background 0.15s",
          }}
        >
          ✦ {loading ? "Generating…" : "Generate"}
        </button>
      </div>

      {/* Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
        {CHIPS.map(chip => (
          <button key={chip} onClick={() => setTopic(chip)} style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "5px 11px",
            borderRadius: 20, border: "1px solid #1e2d3d", background: "#161d27",
            color: "#64748b", cursor: "pointer", transition: "all 0.12s",
          }}>{chip}</button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: "#1a0d0d", border: "1px solid #7f1d1d", borderRadius: 8,
          color: "#f87171", fontSize: 12, padding: "10px 14px", marginBottom: 16,
          fontFamily: "'DM Mono', monospace",
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Status */}
      {loading && (
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#3a4a5c",
          display: "flex", alignItems: "center", gap: 7, marginBottom: 12,
        }}>
          <span style={{
            width: 13, height: 13, border: "1.5px solid #1e2d3d",
            borderTopColor: "#7dd3fc", borderRadius: "50%",
            display: "inline-block",
            animation: "spin 0.7s linear infinite",
          }} />
          Writing article about "{topic}"…
        </div>
      )}

      {/* Output Panel */}
      {(loading || article) && (
        <div style={{
          background: "#161d27", border: "1px solid #1e3a52",
          borderRadius: 10, overflow: "hidden",
        }}>
          {/* Output Header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "9px 14px", borderBottom: "1px solid #1e2d3d", background: "#0c1929",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b",
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: loading ? "#0ea5e9" : "#22c55e",
                display: "inline-block",
              }} />
              {loading ? "Generating…" : "Article ready"}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {article && (
                <button onClick={copy} style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 11,
                  background: "none", border: "1px solid #1e2d3d", borderRadius: 6,
                  color: "#64748b", padding: "4px 10px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              )}
              <button
                onClick={() => setMinimized(m => !m)}
                style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 13,
                  background: "none", border: "1px solid #1e2d3d", borderRadius: 6,
                  color: "#64748b", padding: "4px 8px", cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                {minimized ? "∨" : "∧"}
              </button>
            </div>
          </div>

          {/* Output Body */}
          {!minimized && (
            <pre style={{
              padding: 16, fontFamily: "'DM Mono', monospace", fontSize: 12.5,
              lineHeight: 1.75, color: "#94a3b8", whiteSpace: "pre-wrap",
              wordBreak: "break-word", maxHeight: 320, overflowY: "auto", margin: 0,
            }}>
              {loading ? "Writing your article…" : article}
            </pre>
          )}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}