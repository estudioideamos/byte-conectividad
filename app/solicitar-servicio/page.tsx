import type { Metadata } from "next";
import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import SiteHeader from "../SiteHeader";
import ByteFooter from "../ByteFooter";
import ServiceRequestForm from "./ServiceRequestForm";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Solicitar servicio | Byte Conectividad",
  description: "Solicitá internet para tu hogar o empresa. Evaluamos la cobertura en tu ubicación y te contactamos con una solución personalizada.",
};

const steps = [
  ["01", "Completá tus datos", "Solo necesitamos la información esencial para ubicarte."],
  ["02", "Evaluamos cobertura", "Revisamos la alternativa disponible para tu dirección."],
  ["03", "Te contactamos", "Un asesor local te explica la mejor opción para vos."],
];

export default function RequestServicePage() {
  return (
    <main className="request-page" id="inicio">
      <SiteHeader homePrefix="../" assetPrefix="../" requestHref="./" requestActive />

      <section className="request-hero">
        <div className="request-atmosphere" aria-hidden="true"><i /><i /><i /></div>

        <div className="request-copy">
          <span className="request-kicker"><i /> SOLICITAR SERVICIO · LINCOLN Y LA REGIÓN</span>
          <h1>La conexión que necesitás.<br /><em>Donde la necesitás.</em></h1>
          <p>Contanos dónde estás y qué servicio buscás. Nuestro equipo evalúa la cobertura y te contacta con una propuesta pensada para tu ubicación.</p>

          <div className="request-trust">
            <span><Check aria-hidden="true" /> Evaluación personalizada</span>
            <span><Check aria-hidden="true" /> Atención de un equipo local</span>
          </div>

          <div className="request-steps" aria-label="Cómo funciona la solicitud">
            {steps.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h2>{title}</h2><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>

        <div className="request-form-wrap">
          <ServiceRequestForm />
        </div>
      </section>

      <section className="request-assistance">
        <div>
          <span className="request-kicker"><i /> ¿PREFERÍS HABLAR CON NOSOTROS?</span>
          <h2>Estamos cerca para ayudarte.</h2>
          <p>Podés comunicarte con Byte de lunes a viernes y recibir atención personalizada de nuestro equipo en Lincoln.</p>
        </div>
        <div className="request-assistance__links">
          <a href="tel:+542355448231"><Phone aria-hidden="true" /><span><small>TELÉFONO</small>2355 448231</span><ArrowUpRight aria-hidden="true" /></a>
          <a href="mailto:info@byteinformatica.com.ar"><Mail aria-hidden="true" /><span><small>EMAIL GENERAL</small>info@byteinformatica.com.ar</span><ArrowUpRight aria-hidden="true" /></a>
          <a href="https://maps.google.com/?q=Rivadavia+1286+Lincoln+Buenos+Aires" target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span><small>OFICINA</small>Rivadavia 1286 · Lincoln</span><ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>

      <ByteFooter homePrefix="../" assetPrefix="../" requestHref="./" />
    </main>
  );
}