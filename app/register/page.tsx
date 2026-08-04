"use client";

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

    const { data, error } =
      await supabase.auth.signUp({
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
      console.error(profileError);
      alert(profileError.message);
      return;
    }


      alert("Usuario registrado");
    }
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Registro
      </h1>

      <form
        onSubmit={handleRegister}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          className="w-full p-3 border rounded text-black"
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 border rounded text-black"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 border rounded text-black"
        />

        <select
          value={rol}
          onChange={(e) =>
            setRol(e.target.value)
          }
          className="w-full p-3 border rounded text-black"
        >
          <option value="adoptante">
            Adoptante
          </option>

          <option value="refugio">
            Refugio
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </main>
  );
}
