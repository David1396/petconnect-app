"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function verificarSesion() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("nombre")
        .eq("id", user.id)
        .single();

      if (data) {
        setNombre(data.nombre);
      }

      setLoading(false);
    }

    verificarSesion();
  }, [router]);

  if (loading) {
    return <p className="p-8">Cargando...</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Dashboard
        </h1>

        <p className="text-lg text-gray-700">
          Bienvenido, <strong>{nombre}</strong> 👋
        </p>
      </div>
    </main>
  );
}