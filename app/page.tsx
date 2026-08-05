import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            🐾 PetConnect
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Conectamos mascotas que buscan un hogar con
            personas dispuestas a brindarles amor y cuidado.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/mascotas"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Ver Mascotas
            </Link>

            <Link
              href="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Registrarse
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              🐶 Adopta
            </h2>

            <p className="text-gray-600">
              Encuentra mascotas disponibles para adopción.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              🏠 Refugios
            </h2>

            <p className="text-gray-600">
              Publica mascotas y gestiona solicitudes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              ❤️ Conecta
            </h2>

            <p className="text-gray-600">
              Facilita el proceso de adopción responsable.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}