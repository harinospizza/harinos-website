import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: "admin" | "staff") => void;
}

const AdminLogin: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = () => {
    if (id === "Harino's" && pass === "Pratim@nuj") {
      onSuccess("admin");
    } else if (id === "Harinos" && pass === "Staff_harinos") {
      onSuccess("staff");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-sm p-8 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Harino's Panel Login
        </h2>

        <input
          placeholder="Login ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-slate-200"
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-slate-200"
        />

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-red-600 text-white rounded-xl font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
