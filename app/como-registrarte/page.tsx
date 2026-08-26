import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Check, Clock3, CreditCard, FileDown, MailCheck, MousePointerClick, ShieldCheck, UserRoundPlus } from "lucide-react";
import ByteFooter from "../ByteFooter";
import SiteHeader from "../SiteHeader";

const accountUrl = "https://ap2.factulinc.com.ar/loginc/200h1k1q1p1z1k1w1a0h130w220o0v";

export const metadata: Metadata = {
  title: "Cómo registrarte | Byte Conectividad",
  description: "Creá tu acceso al portal de Byte para consultar tu cuenta corriente, descargar facturas y pagar online.",
};

const steps = [
  { number: "01", icon: MousePointerClick, label: "INGRESÁ AL PORTAL", title: "Accedé a tu cuenta.", copy: "Desde cualquier página de Byte, tocá el botón “Accedé a tu cuenta”. Se abrirá el portal oficial de clientes." },
  { number: "02", icon: UserRoundPlus, label: "CREÁ TU USUARIO", title: "Elegí “Registrarse”.", copy: "En la pantalla de acceso, seleccioná la opción “Registrarse” para comenzar el alta de tu usuario." },
  { number: "03", icon: ShieldCheck, label: "COMPLETÁ TUS DATOS", title: "Usá tu correo de facturación.", copy: "Ingresá el mismo correo en el que recibís la factura mensual. Creá una contraseña, repetila y presioná “Aceptar”." },
  { number: "04", icon: Check, label: "TODO LISTO", title: "Ingresá y gestioná tu servicio.", copy: "Volvé a la pantalla de acceso e iniciá sesión con el correo y la contraseña que acabás de crear." },
];

const benefits = [
  [FileDown, "Facturas", "Consultá y descargá tus facturas."],
  [CreditCard, "Pagos online", "Pagá con débito, QR o billeteras virtuales."],
  [Clock3, "Disponible 24/7", "Gestioná tu cuenta cuando lo necesites."],
  [MailCheck, "Confirmación", "Recibí el comprobante de pago por email."],
] as const;

export default function RegisterPage() {
  return (
    <main className="register-page" id="inicio">
      <SiteHeader homePrefix="../" assetPrefix="../" requestHref="../solicitar-servicio/" registerHref="./" registerActive />

      <section className="register-hero">
        <div className="register-atmosphere" aria-hidden="true"><i /><i /><i /></div>
        <div className="register-hero__copy">
          <span className="register-kicker"><i /> ÁREA DE CLIENTES · GUÍA DE ACCESO</span>
          <h1>Registrate una vez.<br /><em>Gestioná todo más fácil.</em></h1>
          <p>Creá tu usuario con el mismo correo que usás para recibir la factura y accedé a toda la información de tu servicio desde un solo lugar.</p>
          <div className="register-hero__actions">
            <a className="button button-primary" href={accountUrl} target="_blank" rel="noreferrer">Empezar registro <span>↗</span></a>
            <a className="button button-secondary" href="#pasos">Ver el paso a paso <ArrowDown aria-hidden="true" /></a>
          </div>
          <span className="register-safe"><ShieldCheck aria-hidden="true" /> Acceso seguro al portal oficial de Byte</span>
        </div>

        <aside className="register-overview" aria-label="Funciones disponibles en el portal de clientes">
          <div className="register-overview__top"><span>MI CUENTA BYTE</span><b><i /> DISPONIBLE 24/7</b></div>
          <h2>Todo tu servicio,<br />en un solo lugar.</h2>
          <div className="register-overview__grid">
            {benefits.map(([Icon, title, copy]) => <article key={title}><Icon aria-hidden="true" /><div><strong>{title}</strong><p>{copy}</p></div></article>)}
          </div>
        </aside>
      </section>

      <section className="register-steps" id="pasos">
        <div className="register-steps__intro">
          <span className="section-tag">PASO A PASO</span>
          <h2>Tu cuenta lista<br /><em>en pocos minutos.</em></h2>
          <p>Seguí estos cuatro pasos para crear tu acceso y empezar a gestionar el servicio de forma simple.</p>
        </div>

        <div className="register-steps__list">
          {steps.map(({ number, icon: Icon, label, title, copy }) => (
            <article className="register-step" key={number}>
              <span className="register-step__number">{number}</span>
              <div className="register-step__icon"><Icon aria-hidden="true" /></div>
              <div className="register-step__content"><small>{label}</small><h3>{title}</h3><p>{copy}</p></div>
              <span className="register-step__status"><Check aria-hidden="true" /></span>
            </article>
          ))}
        </div>

        <div className="register-note"><ShieldCheck aria-hidden="true" /><div><strong>Un dato importante</strong><p>El correo debe coincidir con el que Byte tiene registrado para tu facturación. Si no coincide o necesitás ayuda, comunicate con nuestro equipo antes de continuar.</p></div></div>
      </section>

      <section className="register-final">
        <div><span className="register-kicker"><i /> ACCESO ONLINE</span><h2>Tu cuenta, siempre<br /><em>a mano.</em></h2><p>Consultá tu cuenta corriente, descargá facturas y realizá pagos online desde donde estés.</p></div>
        <a className="register-final__button" href={accountUrl} target="_blank" rel="noreferrer"><span>Ir al portal de clientes<small>Acceso externo seguro</small></span><ArrowUpRight aria-hidden="true" /></a>
      </section>

      <ByteFooter homePrefix="../" assetPrefix="../" requestHref="../solicitar-servicio/" registerHref="./" />
    </main>
  );
}