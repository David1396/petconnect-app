"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  edad: number;
  imagen: string;
  adoptada: boolean;
}

export default function MisMascotasPage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  useEffect(() => {
    async function cargarMascotas() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("mascotas")
        .select("*")
        .eq("refugio_id", user.id);

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setMascotas(data);
      }
    }

    cargarMascotas();
  }, []);

  async function eliminarMascota(id: number) {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar esta mascota?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("mascotas")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setMascotas(
      mascotas.filter(
        (mascota) => mascota.id !== id
      )
    );

    alert("Mascota eliminada correctamente");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Mis Mascotas
        </h1>

        {mascotas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-600">
              Aún no has publicado mascotas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mascotas.map((mascota) => (
              <div
                key={mascota.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={
                    mascota.imagen ||
                    "https://placehold.co/600x400"
                  }
                  alt={mascota.nombre}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800">
                    {mascota.nombre}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Raza: {mascota.raza}
                  </p>

                  <p className="text-gray-500 mt-1">
                    {mascota.edad} años
                  </p>

                  <div className="mt-3">
                    {mascota.adoptada ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✅ Adoptada
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        🟢 Disponible
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-5">
                    {!mascota.adoptada ? (
                      <>
                        <Link
                          href={`/dashboard/editar-mascota/${mascota.id}`}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium transition"
                        >
                          Editar
                        </Link>

                        <button
                          onClick={() =>
                            eliminarMascota(mascota.id)
                          }
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
                        >
                          Eliminar
                        </button>
                      </>
                    ) : (
                      <div className="w-full text-center bg-green-100 text-green-800 py-2 rounded-lg font-medium">
                        ✅ Mascota adoptada
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}