"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, Eye, Send, RotateCcw } from "lucide-react";

type FormStatus = "idle" | "success";

export default function ServiceRequestForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  function previewConfirmation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="request-success" role="status" aria-live="polite">
        <span className="request-success__icon"><CheckCircle2 aria-hidden="true" /></span>
        <span className="request-form__signal"><i /> VISTA DE CONFIRMACIÓN</span>
        <h2>Listo. Esta es la confirmación de la demo.</h2>
        <p>Por ahora, el formulario no envía ni guarda información. El envío definitivo se activará en una próxima etapa.</p>
        <button type="button" onClick={() => setStatus("idle")}>
          <RotateCcw aria-hidden="true" /> Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form className="request-form" onSubmit={previewConfirmation}>
      <div className="request-form__top">
        <span>SOLICITUD EN LÍNEA</span>
        <b>01</b>
      </div>

      <div className="request-form__intro">
        <span className="request-form__signal"><i /> RESPUESTA PERSONALIZADA</span>
        <h2>Contanos dónde querés conectarte.</h2>
        <p>Con tus datos verificamos la cobertura y te recomendamos la alternativa más conveniente.</p>
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

      <button className="request-submit" type="submit">
        <Send aria-hidden="true" />
        <span>Enviar solicitud</span>
        <i><ArrowUpRight aria-hidden="true" /></i>
      </button>

      <p className="request-privacy"><Eye aria-hidden="true" /> Demo visual: por ahora, los datos no se envían ni se guardan.</p>
    </form>
  );
}