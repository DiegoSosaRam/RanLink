import { NOMBRE_COMERCIAL } from "@/lib/constants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-black tracking-tight">{NOMBRE_COMERCIAL}</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Andamiaje inicial. Aquí va la portada.
      </p>
    </main>
  );
}
