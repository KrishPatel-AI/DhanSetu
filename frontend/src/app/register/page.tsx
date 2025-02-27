"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setName, email, password }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error ${res.status}: ${errorData.message}`);
      }
  
      const data = await res.json();
      console.log("Registration successful:", data);
      router.push("/login");
    } catch (err) {
      console.error("Register Error:", err);
      setError((err instanceof Error ? err.message : "Failed to register. Please try again."));
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
