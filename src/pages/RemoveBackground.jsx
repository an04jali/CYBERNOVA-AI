import React, { useState } from "react";
import axios from "axios";
import { removeBackground } from "@imgly/background-removal";

const RemoveBackground = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setResultImage(null);
    setError("");

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selected);
  };

  const saveToHistory = (base64) => {
    axios
      .post("https://cybernova-ai-backend.onrender.com/api/images", {
        type: "Background Removal",
        prompt: "Background removed",
        result: base64,
      })
      .catch((err) => {
        console.error("Failed to save history:", err.message);
      });
  };

  // Resize the result image down to a small thumbnail before saving to history,
  // since MongoDB has a 16MB document size limit and full-res PNGs can exceed it.
  const resizeImageForHistory = (blob, maxWidth = 600) => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((resizedBlob) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result.split(",")[1];
            resolve(base64);
          };
          reader.readAsDataURL(resizedBlob);
        }, "image/png");
      };
      img.src = URL.createObjectURL(blob);
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    setResultImage(null);

    try {
      const blob = await removeBackground(file);
      const resultUrl = URL.createObjectURL(blob);
      setResultImage(resultUrl);

      // Resize before saving to history to stay under MongoDB's size limit
      const base64Thumbnail = await resizeImageForHistory(blob, 600);
      saveToHistory(base64Thumbnail);
    } catch (err) {
      setError(err.message || "Failed to remove background");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "removed-bg.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          AI Background Remover
        </p>
        <h2 style={{ color: "white", fontSize: "32px", fontWeight: 800, marginBottom: "32px" }}>
          Remove image backgrounds instantly
        </h2>

        <form
          onSubmit={onSubmitHandler}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          {/* LEFT */}
          <div style={{ flex: "1 1 320px", minWidth: "280px" }}>
            <label
              htmlFor="bg-upload"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                border: "2px dashed rgba(6,182,212,0.3)",
                background: "#111827",
                height: "256px",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  style={{ height: "100%", width: "100%", objectFit: "contain" }}
                />
              ) : (
                <span style={{ color: "#94a3b8" }}>Click to upload an image</span>
              )}
            </label>
            <input
              id="bg-upload"
              type="file"
              accept="image/*"
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
              {loading ? "Removing background..." : "Remove Background"}
            </button>

            {error && (
              <p style={{ color: "#f87171", marginTop: "12px", fontSize: "14px" }}>
                {error}
              </p>
            )}
          </div>

          {/* RIGHT */}
          <div style={{ flex: "1 1 320px", minWidth: "280px" }}>
            <div
              style={{
                borderRadius: "16px",
                background: "#111827",
                border: "1px solid rgba(6,182,212,0.1)",
                height: "256px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundImage:
                  "linear-gradient(45deg, #1f2937 25%, transparent 25%, transparent 75%, #1f2937 75%), linear-gradient(45deg, #1f2937 25%, transparent 25%, transparent 75%, #1f2937 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 10px",
              }}
            >
              {resultImage ? (
                <img
                  src={resultImage}
                  alt="result"
                  style={{ height: "100%", width: "100%", objectFit: "contain" }}
                />
              ) : (
                <span style={{ color: "#94a3b8" }}>Result will appear here</span>
              )}
            </div>

            {resultImage && (
              <button
                type="button"
                onClick={handleDownload}
                style={{
                  marginTop: "16px",
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
                Download Image
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RemoveBackground;