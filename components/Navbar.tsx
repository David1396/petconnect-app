"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    async function cargarUsuario() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("nombre")
        .eq("id", user.id)
        .single();

      if (data) {
        setNombre(data.nombre);
      }
    }

    cargarUsuario();
  }, []);

  async function cerrarSesion() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex gap-6">
          <Link href="/">Inicio</Link>
          <Link href="/mascotas">Mascotas</Link>
          <Link href="/perros">Perros API</Link>
        </div>

        <div className="flex gap-4 items-center">
          {nombre ? (
            <>
              <span>Hola, {nombre} 👋</span>

              <Link href="/dashboard">
                Dashboard
              </Link>

              <button
                onClick={cerrarSesion}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}