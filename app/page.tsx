"use client";
import { useState } from "react";

export default function UploadPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [file, setFile] = useState(null);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    const res = await fetch("https://vivocad-upload.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const login = async () => {
    const res = await fetch("https://vivocad-upload.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setToken(data.token);
    setMessage(data.message || "Login erfolgreich");
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage("Bitte wähle eine Datei aus.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("material", material || "Unbekannt");
    formData.append("color", color || "Unbekannt");

    const res = await fetch("https://vivocad-upload.onrender.com/upload", {
      method: "POST",
      headers: { "x-access-token": token },
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">VIVOCAD Upload Portal</h1>

      <div className="space-y-3">
        <input
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          placeholder="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <div className="flex gap-2">
          <button onClick={register} className="bg-gray-300 px-4 py-2 rounded">
            Registrieren
          </button>
          <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      </div>

      {token && (
        <div className="space-y-3 border-t pt-4">
         <input
  type="file"
  onChange={(e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }}
/>

          <input
            placeholder="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full border rounded p-2"
          />
          <input
            placeholder="VITA Zahnfarbe"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border rounded p-2"
          />
          <button onClick={uploadFile} className="bg-green-500 text-white px-4 py-2 rounded">
            Datei hochladen
          </button>
        </div>
      )}

      {message && <p className="text-center text-green-600">{message}</p>}
    </main>
  );
}
