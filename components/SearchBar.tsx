"use client";

interface SearchBarProps {
  valor: string;
  onChange: (texto: string) => void;
}

export default function SearchBar({
  valor,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Buscar mascota..."
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border-2 border-blue-500 bg-white rounded-lg mb-6 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}