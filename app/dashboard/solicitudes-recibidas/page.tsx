"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Solicitud {
  id: number;
  estado: string;
  mascota_id: number;
  mascota_nombre: string;
  mascota_raza: string;
  adoptante_nombre: string;
  created_at: string;
}

export default function SolicitudesRecibidasPage() {
  const [solicitudes, setSolicitudes] = useState<
    Solicitud[]
  >([]);

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

      const { data: mascotasRefugio } = await supabase
        .from("mascotas")
        .select("id,nombre,raza")
        .eq("refugio_id", user.id);

      if (!mascotasRefugio?.length) {
        setLoading(false);
        return;
      }

      const idsMascotas = mascotasRefugio.map(
        (m) => m.id
      );

      const { data: solicitudesData } = await supabase
        .from("solicitudes")
        .select("*")
        .in("mascota_id", idsMascotas);

      if (!solicitudesData?.length) {
        setLoading(false);
        return;
      }

      const idsAdoptantes = [
        ...new Set(
          solicitudesData.map(
            (s) => s.adoptante_id
          )
        ),
      ];

      const { data: adoptantes } = await supabase
        .from("profiles")
        .select("id,nombre")
        .in("id", idsAdoptantes);

      const solicitudesFormateadas =
        solicitudesData.map((solicitud) => {
          const mascota = mascotasRefugio.find(
            (m) => m.id === solicitud.mascota_id
          );

          const adoptante = adoptantes?.find(
            (a) => a.id === solicitud.adoptante_id
          );

          return {
            id: solicitud.id,
            mascota_id: solicitud.mascota_id,
            estado: solicitud.estado,
            mascota_nombre:
              mascota?.nombre || "Mascota",
            mascota_raza:
              mascota?.raza || "",
            adoptante_nombre:
              adoptante?.nombre ||
              "Usuario desconocido",
            created_at: solicitud.created_at,
          };
        });

      setSolicitudes(solicitudesFormateadas);
      setLoading(false);
    }

    cargarSolicitudes();
  }, []);

  async function actualizarEstado(
    id: number,
    mascotaId: number,
    estado: string
    ) {
    const { error } = await supabase
        .from("solicitudes")
        .update({ estado })
        .eq("id", id);

    if (error) {
        alert(error.message);
        return;
    }

    if (estado === "aceptada") {
        const { error: mascotaError } =
        await supabase
            .from("mascotas")
            .update({
            adoptada: true,
            })
            .eq("id", mascotaId);

        if (mascotaError) {
        alert(mascotaError.message);
        return;
        }
    }

  setSolicitudes((prev) =>
    prev.map((s) =>
      s.id === id
        ? { ...s, estado }
        : s
    )
  );
}

  function colorEstado(estado: string) {
    switch (estado) {
      case "aceptada":
        return "bg-green-100 text-green-800";

      case "rechazada":
        return "bg-red-100 text-red-800";

      default:
        return "bg-yellow-100 text-yellow-800";
    }
  }

  function textoEstado(estado: string) {
    switch (estado) {
      case "aceptada":
        return "✅ Aceptada";

      case "rechazada":
        return "❌ Rechazada";

      default:
        return "⏳ Pendiente";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">
          Cargando solicitudes...
        </p>
      </main>
    );
  }
    return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            📨 Solicitudes Recibidas
          </h1>

          <p className="text-gray-600 mb-8">
            Gestiona las solicitudes de adopción
            recibidas para tus mascotas.
          </p>

          {solicitudes.length === 0 ? (
            <div className="bg-gray-50 border rounded-xl p-6">
              <p className="text-gray-600">
                No has recibido solicitudes
                todavía.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {solicitudes.map((solicitud) => (
                <div
                  key={solicitud.id}
                  className="bg-gray-50 border rounded-xl p-6"
                >
                  <h2 className="text-xl font-bold text-gray-800">
                    {solicitud.mascota_nombre}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Raza:{" "}
                    {solicitud.mascota_raza}
                  </p>

                  <p className="text-gray-600 mt-2">
                    Adoptante:{" "}
                    <strong>
                      {solicitud.adoptante_nombre}
                    </strong>
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    Solicitud enviada el{" "}
                    {new Date(
                      solicitud.created_at
                    ).toLocaleDateString()}
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${colorEstado(
                        solicitud.estado
                      )}`}
                    >
                      {textoEstado(
                        solicitud.estado
                      )}
                    </span>

                    {solicitud.estado ===
                      "pendiente" && (
                      <>
                        <button
                          onClick={() =>
                            actualizarEstado(
                                solicitud.id,
                                solicitud.mascota_id,
                                "aceptada"
                            )
                            }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                          Aceptar
                        </button>

                        <button
                          onClick={() =>
                            actualizarEstado(
                              solicitud.id,
                                solicitud.mascota_id,
                              "rechazada"
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}