"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Perfil {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

export default function DashboardPage() {

const [perfil, setPerfil] = useState<Perfil | null>(null);

const [cantidadMascotas, setCantidadMascotas] = useState(0);

const [cantidadSolicitudes, setCantidadSolicitudes] = useState(0);

  useEffect(() => {
    async function cargarDatos() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: perfilData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!perfilData) return;

      setPerfil(perfilData);

      if (perfilData.rol === "refugio") {
        const { count } = await supabase
          .from("mascotas")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("refugio_id", user.id);

        setCantidadMascotas(count || 0);
      }

      if (perfilData.rol === "adoptante") {
        const { count: mascotasDisponibles } =
          await supabase
            .from("mascotas")
            .select("*", {
              count: "exact",
              head: true,
            });

        setCantidadMascotas(
          mascotasDisponibles || 0
        );

        const {
          count: solicitudesRealizadas,
        } = await supabase
          .from("solicitudes")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("adoptante_id", user.id);

        setCantidadSolicitudes(
          solicitudesRealizadas || 0
        );
      }
    }

    cargarDatos();
  }, []);

  if (!perfil) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Cargando dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Dashboard
          </h1>

          <p className="text-lg text-gray-700 mb-2">
            Bienvenido,{" "}
            <strong>{perfil.nombre}</strong> 👋
          </p>

          <p className="text-gray-600 mb-8">
            Rol: <strong>{perfil.rol}</strong>
          </p>

          {perfil.rol === "refugio" && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border rounded-xl p-6 shadow">
                  <h3 className="text-lg font-bold text-gray-800">
                    🐾 Mascotas Publicadas
                  </h3>

                  <p className="text-3xl font-bold text-green-600 mt-3">
                    {cantidadMascotas}
                  </p>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow">
                  <h3 className="text-lg font-bold text-gray-800">
                    📝 Solicitudes Recibidas
                  </h3>

                  <p className="text-3xl font-bold text-blue-600 mt-3">
                    {cantidadSolicitudes}
                  </p>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow">
                  <h3 className="text-lg font-bold text-gray-800">
                    🏠 Estado
                  </h3>

                  <p className="text-xl font-bold text-purple-600 mt-4">
                    Refugio activo
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Link className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700 transition" href="/dashboard/nueva-mascota">
                  <h2 className="text-2xl font-bold">
                    ➕ Publicar Mascota
                  </h2>

                  <p className="mt-2">
                    Registrar una nueva mascota.
                  </p>
                </Link>

                <Link className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700 transition" href="/dashboard/mis-mascotas">
                  <h2 className="text-2xl font-bold">
                    📋 Mis Mascotas
                  </h2>

                  <p className="mt-2">
                    Administrar mascotas publicadas.
                  </p>
                </Link>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-3">
                  💡 Consejo para Refugios
                </h3>

                <p className="text-gray-700">
                  Mantén actualizada la información
                  de tus mascotas para aumentar las
                  posibilidades de adopción y facilitar
                  el contacto con los adoptantes.
                </p>
              </div>
            </>
          )}

          {perfil.rol === "adoptante" && (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border rounded-xl p-6 shadow">
                  <h3 className="text-lg font-bold text-gray-800">
                    🐶 Mascotas Disponibles
                  </h3>

                  <p className="text-3xl font-bold text-blue-600 mt-3">
                    {cantidadMascotas}
                  </p>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow">
                  <h3 className="text-lg font-bold text-gray-800">
                    📨 Solicitudes Realizadas
                  </h3>

                  <p className="text-3xl font-bold text-green-600 mt-3">
                    {cantidadSolicitudes}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Link className="bg-purple-600 text-white p-6 rounded-xl shadow hover:bg-purple-700 transition" href="/mascotas">
                  <h2 className="text-2xl font-bold">
                    🐾 Ver Mascotas
                  </h2>

                  <p className="mt-2">
                    Explorar mascotas disponibles.
                  </p>
                </Link>

                <Link className="bg-orange-500 text-white p-6 rounded-xl shadow hover:bg-orange-600 transition" href="/dashboard/mis-solicitudes">
                  <h2 className="text-2xl font-bold">
                    📨 Mis Solicitudes
                  </h2>

                  <p className="mt-2">
                    Revisar solicitudes realizadas.
                  </p>
                </Link>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  💡 Consejos para Adoptar
                </h3>

                <ul className="space-y-2 text-gray-700">
                  <li>
                    ✅ Conoce bien a la mascota antes
                    de adoptar.
                  </li>

                  <li>
                    ✅ Verifica que dispones de tiempo
                    y espacio suficientes.
                  </li>

                  <li>
                    ✅ Consulta todas tus dudas con el
                    refugio.
                  </li>

                  <li>
                    ✅ La adopción es un compromiso a
                    largo plazo.
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}