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

      if (!user) {
        setNombre("");
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
    }

    cargarUsuario();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      cargarUsuario();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function cerrarSesion() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-white text-2xl font-bold flex items-center gap-2"
          >
            <span>🐾</span>
            <span>PetConnect</span>
          </Link>

          {/* Menú principal */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-blue-200 transition"
            >
              Inicio
            </Link>

            <Link
              href="/mascotas"
              className="text-white hover:text-blue-200 transition"
            >
              Mascotas
            </Link>

            <Link
              href="/perros"
              className="text-white hover:text-blue-200 transition"
            >
              🐶 Enciclopedia Canina
            </Link>
          </div>

          {/* Usuario */}
          <div className="flex items-center gap-4">
            {nombre ? (
              <>
                <span className="text-white font-medium">
                  Hola, {nombre} 👋
                </span>

                <Link
                  href="/dashboard"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={cerrarSesion}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-blue-200 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition"
                >
                  Registro
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}