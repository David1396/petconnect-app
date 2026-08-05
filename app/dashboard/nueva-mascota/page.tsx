"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NuevaMascotaPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    const { error } = await supabase
      .from("mascotas")
      .insert({
        nombre,
        raza,
        edad: Number(edad),
        descripcion,
        imagen,
        refugio_id: user.id,
      });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard/mis-mascotas");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Nueva Mascota
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
            required
          />

          <input
            type="text"
            placeholder="Raza"
            value={raza}
            onChange={(e) =>
              setRaza(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
            required
          />

          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) =>
              setEdad(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
            required
          />

          <input
            type="text"
            placeholder="URL de imagen"
            value={imagen}
            onChange={(e) =>
              setImagen(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
          />

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) =>
              setDescripcion(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black"
            rows={4}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Crear Mascota
          </button>
        </form>
      </div>
    </main>
  );
}