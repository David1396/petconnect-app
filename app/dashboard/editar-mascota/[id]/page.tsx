"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditarMascotaPage() {
  const params = useParams();
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [descripcion, setDescripcion] =
    useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    async function cargarMascota() {
      const { data } = await supabase
        .from("mascotas")
        .select("*")
        .eq("id", params.id)
        .single();

      if (data) {
        setNombre(data.nombre);
        setRaza(data.raza);
        setEdad(data.edad.toString());
        setDescripcion(data.descripcion || "");
        setImagen(data.imagen || "");
      }
    }

    cargarMascota();
  }, [params.id]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("mascotas")
      .update({
        nombre,
        raza,
        edad: Number(edad),
        descripcion,
        imagen,
      })
      .eq("id", params.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Mascota actualizada");

    router.push("/dashboard/mis-mascotas");
  }

  return (
    <main className="p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          Editar Mascota
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
            className="w-full p-3 border rounded text-black"
          />

          <input
            type="text"
            value={raza}
            onChange={(e) =>
              setRaza(e.target.value)
            }
            className="w-full p-3 border rounded text-black"
          />

          <input
            type="number"
            value={edad}
            onChange={(e) =>
              setEdad(e.target.value)
            }
            className="w-full p-3 border rounded text-black"
          />

          <input
            type="text"
            value={imagen}
            onChange={(e) =>
              setImagen(e.target.value)
            }
            className="w-full p-3 border rounded text-black"
          />

          <textarea
            value={descripcion}
            onChange={(e) =>
              setDescripcion(e.target.value)
            }
            className="w-full p-3 border rounded text-black"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </main>
  );
}