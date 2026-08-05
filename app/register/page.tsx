"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("adoptante");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          nombre,
          email,
          rol,
        });

      if (profileError) {
        alert(profileError.message);
        return;
      }

      alert("Cuenta creada correctamente");

      setNombre("");
      setEmail("");
      setPassword("");
      setRol("adoptante");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl mb-3">🐾</h1>

            <h2 className="text-3xl font-bold text-gray-800">
              Crear Cuenta
            </h2>

            <p className="text-gray-600 mt-3">
              Únete a PetConnect para adoptar
              mascotas o publicar animales que
              buscan un hogar.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              minLength={6}
              required
            />

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tipo de cuenta
              </label>

              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="adoptante">
                  🐾 Adoptante
                </option>

                <option value="refugio">
                  🏠 Refugio
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Crear Cuenta
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?
            </p>

            <Link
              href="/login"
              className="text-green-600 hover:underline font-semibold mt-1 inline-block"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}