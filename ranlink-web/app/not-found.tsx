import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p className="text-sm text-muted-foreground">
        La dirección que buscas no existe o cambió de lugar.
      </p>
      <Link href="/" className="text-secondary underline underline-offset-4">
        Volver al inicio
      </Link>
    </main>
  );
}
