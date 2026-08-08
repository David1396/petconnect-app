"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Solicitud {
  id: number;
  estado: string;
  mascota_id: number;
  created_at: string;
}

interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  imagen: string;
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [mascotas, setMascotas] = useState<Record<number, Mascota>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarSolicitudes() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: solicitudesData, error } = await supabase
        .from("solicitudes")
        .select("*")
        .eq("adoptante_id", user.id)
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setSolicitudes(solicitudesData || []);

      if (solicitudesData && solicitudesData.length > 0) {
        const idsMascotas = solicitudesData.map((s) => s.mascota_id);

        const { data: mascotasData } = await supabase
          .from("mascotas")
          .select("id,nombre,raza,imagen")
          .in("id", idsMascotas);

        if (mascotasData) {
          const mapa: Record<number, Mascota> = {};

          mascotasData.forEach((mascota) => {
            mapa[mascota.id] = mascota;
          });

          setMascotas(mapa);
        }
      }

      setLoading(false);
    }

    cargarSolicitudes();
  }, []);

  function obtenerColorEstado(estado: string) {
    switch (estado) {
      case "aceptada":
        return "bg-green-100 text-green-800";

      case "rechazada":
        return "bg-red-100 text-red-800";

      default:
        return "bg-yellow-100 text-yellow-800";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-600">Cargando solicitudes...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            📨 Mis Solicitudes
          </h1>

          <p className="text-gray-600 mb-8">
            Consulta el estado de todas tus solicitudes de adopción.
          </p>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border rounded-xl p-4 shadow">
              <h3 className="font-bold text-gray-800">Total</h3>
              <p className="text-2xl font-bold text-blue-600">
                {solicitudes.length}
              </p>
            </div>

            <div className="bg-white border rounded-xl p-4 shadow">
              <h3 className="font-bold text-gray-800">Pendientes</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {solicitudes.filter((s) => s.estado === "pendiente").length}
              </p>
            </div>

            <div className="bg-white border rounded-xl p-4 shadow">
              <h3 className="font-bold text-gray-800">Aceptadas</h3>
              <p className="text-2xl font-bold text-green-600">
                {solicitudes.filter((s) => s.estado === "aceptada").length}
              </p>
            </div>

            <div className="bg-white border rounded-xl p-4 shadow">
              <h3 className="font-bold text-gray-800">Rechazadas</h3>
              <p className="text-2xl font-bold text-red-600">
                {solicitudes.filter((s) => s.estado === "rechazada").length}
              </p>
            </div>
          </div>

          {solicitudes.length === 0 ? (
            <div className="bg-gray-50 border rounded-xl p-6">
              <p className="text-gray-600">
                Aún no has realizado solicitudes de adopción.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {solicitudes.map((solicitud) => {
                const mascota = mascotas[solicitud.mascota_id];

                return (
                  <div
                    key={solicitud.id}
                    className="bg-gray-50 border rounded-xl p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      <img
                        src={mascota?.imagen ||
                          "https://placehold.co/600x400"
                        }
                        alt={mascota?.nombre || "Mascota"}
                        className="w-45 h-45 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800">
                          {mascota?.nombre || "Mascota no encontrada"}
                        </h2>

                        <p className="text-gray-600 mt-2">
                          Raza: {mascota?.raza || "No disponible"}
                        </p>

                        <p className="text-gray-500 text-sm mt-2">
                          Solicitud enviada el{" "}
                          {new Date(
                            solicitud.created_at
                          ).toLocaleDateString()}
                        </p>

                        <div className="mt-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${obtenerColorEstado(
                              solicitud.estado
                            )}`}
                          >
                            {solicitud.estado === "aceptada"
                              ? "✅ Aceptada"
                              : solicitud.estado === "rechazada"
                              ? "❌ Rechazada"
                              : "⏳ Pendiente"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}