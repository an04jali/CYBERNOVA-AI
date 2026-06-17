import { useState } from "react";

const imageStyles = [
  "Realistic",
  "Ghibli Style",
  "Anime Style",
  "Cartoon Style",
  "Fantasy Style",
  "3D Style",
  "Portrait Style",
  "Cyberpunk Style",
];

export default function GenerateImages() {
  const [input, setInput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!input.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/images/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `${selectedStyle}, ${input}`,
            width: 1024,
            height: 1024,
            steps: 28,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Image generation failed");
      }

      setImageUrl(`data:image/png;base64,${data.image}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await generateImage();
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        padding: "24px",
      }}
    >
      {/* Left Panel */}
      <form
        onSubmit={onSubmitHandler}
        style={{
          flex: 1,
          minWidth: "400px",
          background: "#0f1923",
          border: "1px solid #1e3a4a",
          borderRadius: "16px",
          padding: "24px",
          color: "#fff",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "28px",
          }}
        >
          🎨 AI Image Generator
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "10px",
          }}
        >
          Describe Your Image
        </p>

        <textarea
          rows="5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="A futuristic AI assistant standing in a neon cyberpunk city..."
          style={{
            width: "100%",
            background: "#162030",
            border: "1px solid #1e3a4a",
            borderRadius: "10px",
            padding: "14px",
            color: "#fff",
            resize: "none",
            boxSizing: "border-box",
          }}
        />

        <p
          style={{
            color: "#94a3b8",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          Style
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {imageStyles.map((style) => (
            <button
              type="button"
              key={style}
              onClick={() => setSelectedStyle(style)}
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                cursor: "pointer",
                border:
                  selectedStyle === style
                    ? "1px solid #7c3aed"
                    : "1px solid #1e3a4a",
                background:
                  selectedStyle === style
                    ? "#2e1065"
                    : "transparent",
                color:
                  selectedStyle === style
                    ? "#c4b5fd"
                    : "#94a3b8",
              }}
            >
              {style}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "24px",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            background:
              "linear-gradient(135deg,#00AD25,#04FF50)",
            color: "#000",
          }}
        >
          {loading ? "Generating..." : "🖼️ Generate Image"}
        </button>
      </form>

      {/* Right Panel */}
      <div
        style={{
          flex: 1,
          minWidth: "400px",
          background: "#0f1923",
          border: "1px solid #1e3a4a",
          borderRadius: "16px",
          padding: "24px",
          color: "#fff",
          minHeight: "550px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "28px",
          }}
        >
          🖼️ Generated Image
        </h2>

        {!imageUrl && !loading && !error && (
          <div
            style={{
              textAlign: "center",
              marginTop: "120px",
              color: "#64748b",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                marginBottom: "16px",
              }}
            >
              🖼️
            </div>

            Enter a prompt and click Generate Image
          </div>
        )}

        {loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: "120px",
            }}
          >
            <h3>Generating image...</h3>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              FLUX AI may take 10–30 seconds.
            </p>
          </div>
        )}

        {error && (
          <div
            style={{
              color: "#ef4444",
              textAlign: "center",
              marginTop: "120px",
            }}
          >
            {error}
          </div>
        )}

        {imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt="Generated"
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            />

            <a
              href={imageUrl}
              download="cybernova-image.png"
              style={{
                display: "inline-block",
                marginTop: "16px",
                color: "#00ff55",
                textDecoration: "none",
              }}
            >
              ⬇ Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}