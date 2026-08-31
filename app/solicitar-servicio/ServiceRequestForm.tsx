"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Eye, RotateCcw, Send } from "lucide-react";
import { submitContactForm, type ContactFormStatus } from "../lib/contactForm";

export default function ServiceRequestForm() {
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setStatusMessage("");

    try {
      const result = await submitContactForm(form, "service-request", startedAtRef.current);
      form.reset();
      startedAtRef.current = Date.now();
      setStatusMessage(result.message || "Recibimos tu solicitud. Te vamos a contactar a la brevedad.");
      setStatus("success");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "No pudimos enviar la solicitud. Intentá nuevamente.");
      setStatus("error");
    }
  }

  function resetForm() {
    startedAtRef.current = Date.now();
    setStatusMessage("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="request-success" role="status" aria-live="polite">
        <span className="request-success__icon"><CheckCircle2 aria-hidden="true" /></span>
        <span className="request-form__signal"><i /> SOLICITUD RECIBIDA</span>
        <h2>Listo. Tu consulta ya llegó a Byte.</h2>
        <p>{statusMessage}</p>
        <button type="button" onClick={resetForm}>
          <RotateCcw aria-hidden="true" /> Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form className="request-form" onSubmit={sendRequest}>
      <div className="request-form__top">
        <span>SOLICITUD EN LÍNEA</span>
        <b>01</b>
      </div>

      <div className="request-form__intro">
        <span className="request-form__signal"><i /> RESPUESTA PERSONALIZADA</span>
        <h2>Contanos dónde querés conectarte.</h2>
        <p>Con tus datos verificamos la cobertura y te recomendamos la alternativa más conveniente.</p>
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label>Empresa<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="request-field request-field--full">
        <span>¿Qué servicio te interesa?</span>
        <select name="service" defaultValue="" required>
          <option value="" disabled>Elegí una opción</option>
          <option value="Internet de banda ancha">Internet para el hogar</option>
          <option value="Internet simétrico">Internet simétrico para empresas</option>
          <option value="Zonas WiFi">Zonas WiFi</option>
          <option value="Asesoramiento personalizado">Necesito asesoramiento</option>
        </select>
      </label>

      <div className="request-form__grid">
        <label className="request-field">
          <span>Nombre y apellido</span>
          <input name="name" type="text" autoComplete="name" placeholder="¿Cómo te llamás?" required />
        </label>
        <label className="request-field">
          <span>Teléfono</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Tu número de contacto" required />
        </label>
      </div>

      <label className="request-field request-field--full">
        <span>Dirección del servicio</span>
        <input name="address" type="text" autoComplete="street-address" placeholder="Calle, número y localidad" required />
      </label>

      <label className="request-field request-field--full">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" inputMode="email" placeholder="nombre@email.com" required />
      </label>

      <button className="request-submit" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
        <Send aria-hidden="true" />
        <span>{status === "sending" ? "Enviando solicitud..." : "Enviar solicitud"}</span>
        <i><ArrowUpRight aria-hidden="true" /></i>
      </button>

      {status === "error" && (
        <p className="request-feedback request-feedback--error" role="alert">
          <AlertCircle aria-hidden="true" /> {statusMessage}
        </p>
      )}
      <p className="request-privacy"><Eye aria-hidden="true" /> Tus datos se envían de forma segura al equipo de Byte y no se comparten con terceros.</p>
    </form>
  );
}
