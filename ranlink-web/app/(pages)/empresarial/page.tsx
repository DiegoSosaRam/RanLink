import type { Metadata } from "next";
import { Building } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import EnterpriseServicesSection from "@/components/EnterpriseServicesSection";
import EnterpriseContactForm from "@/components/EnterpriseContactForm";
import { NOMBRE_COMERCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Servicios empresariales | ${NOMBRE_COMERCIAL}`,
  description: `Conectividad para empresas con ${NOMBRE_COMERCIAL}: solicita una cotización y el equipo empresarial te contactará.`,
};

export default function EmpresarialPage() {
  return (
    <>
      <PageHero
        icon={Building}
        titulo="Servicios"
        resaltado="Empresariales"
        descripcion="Soluciones de conectividad para tu negocio."
      />
      <EnterpriseServicesSection />
      <EnterpriseContactForm />
    </>
  );
}
