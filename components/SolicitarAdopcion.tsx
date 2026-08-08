"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Props {
  mascotaId: number;
}

export default function SolicitarAdopcion({
  mascotaId,
}: Props) {
  const [rol, setRol] = useState("");
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function cargarUsuario() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCargando(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("rol")
        .eq("id", user.id)
        .single();

      if (data) {
        setRol(data.rol);
      }

      setCargando(false);
    }

    cargarUsuario();
  }, []);

  async function solicitarAdopcion() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("solicitudes")
      .insert({
        mascota_id: mascotaId,
        adoptante_id: user.id,
        estado: "pendiente",
      });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard/solicitudes");
  }

  if (cargando) {
    return null;
  }

  if (!rol) {
    return (
      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-block"
      >
        Inicia sesión para adoptar
      </Link>
    );
  }

  if (rol === "refugio") {
    return (
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg">
        Los refugios no pueden solicitar adopciones.
      </div>
    );
  }

  return (
    <button
      onClick={solicitarAdopcion}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
    >
      🐾 Solicitar Adopción
    </button>
  );
}