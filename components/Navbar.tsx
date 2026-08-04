import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex gap-6">
        <Link href="/">Inicio</Link>
        <Link href="/mascotas">Mascotas</Link>
        <Link href="/perros">Perros API</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Registro</Link>
      </div>
    </nav>
  );
}