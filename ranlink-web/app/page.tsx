import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

// PROVISIONAL: muestra de la paleta y del cambio de tema mientras se construye
// la portada. El botón de tema se moverá al encabezado cuando exista.
const MUESTRAS = [
  { nombre: "Fondo", clase: "bg-background" },
  { nombre: "Tarjeta", clase: "bg-card" },
  { nombre: "Primario", clase: "bg-primary" },
  { nombre: "Brillo", clase: "bg-primary-glow" },
  { nombre: "Secundario", clase: "bg-secondary" },
  { nombre: "Acento", clase: "bg-accent" },
  { nombre: "Atenuado", clase: "bg-muted" },
];

export default function Home() {
  return (
    <main className="hero-gradient relative flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-16 text-center">
      <ThemeToggle className="fixed right-4 top-4 z-50" />

      <BrandLogo className="w-56 sm:w-72" />

      <div className="max-w-xl space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Paleta de <span className="gradient-text">identidad</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Vista provisional para revisar colores y tema. Aquí va la portada.
        </p>
      </div>

      <ul className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {MUESTRAS.map((m) => (
          <li key={m.nombre} className="card-gradient card-glow rounded-lg border border-border p-2">
            <div className={`h-14 rounded-md border border-border ${m.clase}`} />
            <p className="mt-2 text-xs font-medium">{m.nombre}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
