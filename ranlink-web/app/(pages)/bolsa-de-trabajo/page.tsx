import type { Metadata } from "next";
import { Briefcase, Globe, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Dato } from "@/components/Pendiente";
import { FormularioBolsaTrabajo } from "@/components/FormularioBolsaTrabajo";
import { CORREO_CONTACTO, DOMICILIO, NOMBRE_COMERCIAL, TELEFONO, telefonoHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Bolsa de trabajo | ${NOMBRE_COMERCIAL}`,
  description: `Postúlate para formar parte del equipo de ${NOMBRE_COMERCIAL}: déjanos tus datos y adjunta tu CV en el correo.`,
};

export default function BolsaTrabajoPage() {
  const tel = telefonoHref();

  return (
    <>
      <PageHero
        icon={Briefcase}
        titulo="Únete a"
        resaltado={NOMBRE_COMERCIAL}
        descripcion={`Si te interesa formar parte del equipo de ${NOMBRE_COMERCIAL}, déjanos tus datos y cuéntanos qué área te interesa.`}
      />

      <section className="relative px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-md sm:p-8 md:p-12">
          <FormularioBolsaTrabajo />
        </div>
      </section>

      {/* Datos de contacto de la empresa */}
      <section className="relative px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-secondary">
            <MapPin className="h-4 w-4" />
            Contacto
          </div>
          <h2 className="text-3xl font-black tracking-tighter md:text-5xl">
            ¿Tienes <span className="gradient-text">dudas?</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-3xl border border-border bg-card/40 p-8 text-center backdrop-blur-md">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="mb-3 font-bold uppercase tracking-wider text-foreground">Dirección</h3>
              <p className="break-words text-sm leading-relaxed text-muted-foreground">
                <Dato valor={DOMICILIO} />
              </p>
            </div>

            <div className="flex flex-col items-center rounded-3xl border border-border bg-card/40 p-8 text-center backdrop-blur-md">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Phone className="h-7 w-7" />
              </div>
              <h3 className="mb-3 font-bold uppercase tracking-wider text-foreground">Teléfono</h3>
              <p className="break-words text-sm leading-relaxed text-muted-foreground">
                {tel ? (
                  <a href={tel} className="font-bold text-foreground hover:underline">
                    {TELEFONO}
                  </a>
                ) : (
                  <Dato valor={TELEFONO} />
                )}
              </p>
            </div>

            <div className="flex flex-col items-center rounded-3xl border border-border bg-card/40 p-8 text-center backdrop-blur-md">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <Globe className="h-7 w-7" />
              </div>
              <h3 className="mb-3 font-bold uppercase tracking-wider text-foreground">Correo</h3>
              <p className="break-all text-sm leading-relaxed text-muted-foreground">
                <Dato valor={CORREO_CONTACTO} />
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
