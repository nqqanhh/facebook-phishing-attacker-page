import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("⏳ Đang gửi...");
    try {
      const res = await axios.post(
        "https://facebook-phishing-project.onrender.com/api/auth/send-email",
        formData
      );
      if (res.data.success) {
        setStatus("✅ Gửi email thành công!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Gửi thất bại: " + (res.data.message || "Không rõ lỗi."));
      }
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || err.message || "Không xác định.";
      setStatus("❌ Có lỗi khi gửi email: " + errorMsg);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f0f4f8",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "500px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    status: {
      marginTop: "20px",
      textAlign: "center",
      fontWeight: "bold",
      color: "#444",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📧 Gửi Email</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            name="name"
            placeholder="👤 Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            name="email"
            type="email"
            placeholder="📩 Email của bạn"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            style={styles.input}
            name="message"
            placeholder="📝 Nội dung cần gửi"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button style={styles.button} type="submit">
            📨 Gửi Email
          </button>
        </form>
        <p style={styles.status}>{status}</p>
      </div>
    </div>
  );
}

export default App;
