import { useState } from "react";

export default function ContactMe() {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");

  const phoneNumber = "7874588173"; // your WhatsApp number

  const handleSend = () => {
    if (!name.trim() || !query.trim()) return;

    const finalMessage =
`📨 *Portfolio Contact Request*

👤 *Name:* ${name}
📝 *Query:* ${query}`;



    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Enter your query</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Your Query"
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleSend}
        disabled={!name.trim() || !query.trim()}
        style={{
          marginTop: "10px",
          padding: "12px 20px",
          backgroundColor:
            name.trim() && query.trim() ? "#25D366" : "#97e6ba",
          border: "none",
          borderRadius: "6px",
          color: "#fff",
          fontSize: "16px",
          cursor: name.trim() && query.trim() ? "pointer" : "not-allowed",
          opacity: name.trim() && query.trim() ? 1 : 0.6,
          width: "100%",
        }}
      >
        Send on WhatsApp
      </button>
    </div>
  );
}
