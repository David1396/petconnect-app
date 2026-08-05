"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Perfil {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

export default function DashboardPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(
    null
  );

  useEffect(() => {
    async function cargarPerfil() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setPerfil(data);
      }
    }

    cargarPerfil();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Dashboard
          </h1>

          {perfil ? (
            <>
              <p className="text-lg text-gray-700 mb-2">
                <strong>Nombre:</strong> {perfil.nombre}
              </p>

              <p className="text-lg text-gray-700 mb-2">
                <strong>Email:</strong> {perfil.email}
              </p>

              <p className="text-lg text-gray-700 mb-4">
                <strong>Rol:</strong> {perfil.rol}
              </p>

              <div className="border-t pt-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Bienvenido a PetConnect 🐾
                </h2>

                <p className="text-gray-600 mt-2">
                  Desde aquí podrás gestionar tu cuenta
                  y próximamente publicar mascotas,
                  revisar solicitudes y administrar tus
                  adopciones.
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-600">
              Cargando perfil...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}