import type { Metadata } from "next";
import { HeroSection } from "@/components/inicio/HeroSection";
import { PricingSection } from "@/components/inicio/PricingSection";
import { ServicesSection } from "@/components/inicio/ServicesSection";
import { RequirementsSection } from "@/components/inicio/RequirementsSection";
import { CoverageSection } from "@/components/inicio/CoverageSection";
import { ContactSection } from "@/components/inicio/ContactSection";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { NOMBRE_COMERCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${NOMBRE_COMERCIAL} | Internet para hogar y empresa`,
  description: `Planes de internet de ${NOMBRE_COMERCIAL} para hogar y empresa. Consulta cobertura, requisitos y contrata con un asesor.`,
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesCarousel />
      <PricingSection />
      <ServicesSection />
      <RequirementsSection />
      <CoverageSection />
      <ContactSection />
    </>
  );
}
