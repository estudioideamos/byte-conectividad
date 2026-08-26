import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Check, CircleUserRound, Clock3, CreditCard, FileDown, KeyRound, LayoutDashboard, MailCheck, MonitorSmartphone, MousePointerClick, QrCode, ReceiptText, ShieldCheck, UserRoundPlus, WalletCards } from "lucide-react";
import ByteFooter from "../ByteFooter";
import SiteHeader from "../SiteHeader";

const accountUrl = "https://ap2.factulinc.com.ar/loginc/200h1k1q1p1z1k1w1a0h130w220o0v";

export const metadata: Metadata = {
  title: "Cómo registrarte | Byte Conectividad",
  description: "Creá tu acceso al portal de Byte para consultar tu cuenta corriente, descargar facturas y pagar online.",
};

const steps = [
  {
    number: "01",
    icon: MonitorSmartphone,
    detailIcon: MousePointerClick,
    label: "INGRESÁ AL PORTAL",
    title: "Buscá “Accedé a tu cuenta”.",
    copy: "Encontrá el botón en la barra superior de cualquier página de Byte. Al tocarlo, vas a ingresar al portal oficial de clientes.",
    points: ["Está visible en todo el sitio", "Se abre en una pestaña segura"],
    focus: "TOCÁ ACCEDÉ A TU CUENTA",
    image: "../assets/register-step-01.jpg",
    alt: "Mockup de un celular que señala el acceso a la cuenta en la navegación del sitio de Byte",
  },
  {
    number: "02",
    icon: CircleUserRound,
    detailIcon: UserRoundPlus,
    label: "CREÁ TU USUARIO",
    title: "Elegí la opción “Registrarse”.",
    copy: "En la pantalla de ingreso, buscá la opción que aparece debajo de los campos de correo y contraseña. Desde ahí comienza el alta.",
    points: ["No completes el inicio de sesión todavía", "Seleccioná “Registrarse”"],
    focus: "ELEGÍ REGISTRARSE",
    image: "../assets/register-step-02.jpg",
    alt: "Mockup del portal de clientes que destaca la opción para crear un usuario",
  },
  {
    number: "03",
    icon: ShieldCheck,
    detailIcon: KeyRound,
    label: "COMPLETÁ TUS DATOS",
    title: "Usá tu correo de facturación.",
    copy: "Ingresá el mismo correo en el que recibís la factura mensual. Después, creá una contraseña segura y repetila para confirmarla.",
    points: ["Escribí el correo registrado en Byte", "Creá y repetí tu contraseña", "Presioná “Aceptar” para continuar"],
    focus: "CORREO + CONTRASEÑA",
    image: "../assets/register-step-03.jpg",
    alt: "Mockup de una notebook y un celular con el formulario seguro de registro",
  },
  {
    number: "04",
    icon: LayoutDashboard,
    detailIcon: ReceiptText,
    label: "TODO LISTO",
    title: "Ingresá y gestioná tu servicio.",
    copy: "Volvé a la pantalla de acceso e iniciá sesión con el correo y la contraseña que acabás de crear. Tu cuenta ya está lista para usar.",
    points: ["Consultá tu cuenta corriente", "Descargá facturas", "Pagá con débito, QR o billeteras virtuales"],
    focus: "CUENTA ACTIVA",
    image: "../assets/register-step-04.jpg",
    alt: "Mockup del panel de clientes con facturas, resumen de cuenta y opciones de pago",
  },
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
          <h1><span>Registrate una vez.</span><em>Gestioná todo más fácil.</em></h1>
          <p>Creá tu usuario con el mismo correo que usás para recibir la factura y accedé a toda la información de tu servicio desde un solo lugar.</p>
          <div className="register-hero__actions">
            <a className="button button-primary" href={accountUrl} target="_blank" rel="noreferrer">Empezar registro <span>↗</span></a>
            <a className="button button-secondary" href="#pasos">Ver el paso a paso <ArrowDown aria-hidden="true" /></a>
          </div>
          <span className="register-safe"><ShieldCheck aria-hidden="true" /> Acceso seguro al portal oficial de Byte</span>
        </div>

        <aside className="register-overview" aria-label="Funciones disponibles en el portal de clientes">
          <div className="register-overview__top"><span>MI CUENTA BYTE</span><b><i /> DISPONIBLE 24/7</b></div>
          <div className="register-overview__headline"><span>AUTOGESTIÓN ONLINE</span><h2>Tu cuenta Byte.<br /><em>Todo bajo control.</em></h2></div>
          <div className="register-overview__visual">
            <img src="../assets/register-account-command-center.jpg" width="1536" height="1024" alt="Portal de clientes de Byte disponible en computadora y celular" decoding="async" fetchPriority="high" />
            <span className="register-overview__live"><i /> SESIÓN SEGURA</span>
            <span className="register-overview__receipt"><MailCheck aria-hidden="true" /> COMPROBANTE POR EMAIL</span>
            <div className="register-overview__payments" aria-label="Medios de pago disponibles">
              <small>MEDIOS DE PAGO</small>
              <div>
                <span><CreditCard aria-hidden="true" /> Débito</span>
                <span><QrCode aria-hidden="true" /> QR</span>
                <span><WalletCards aria-hidden="true" /> Billeteras virtuales</span>
              </div>
            </div>
          </div>
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
          {steps.map(({ number, icon: Icon, detailIcon: DetailIcon, label, title, copy, points, focus, image, alt }) => (
            <article className="register-step" key={number}>
              <div className="register-step__visual">
                <img src={image} width="1536" height="1024" alt={alt} loading="lazy" decoding="async" />
                <span className="register-step__visual-number" aria-hidden="true">{number}</span>
                <span className="register-step__focus"><i />{focus}</span>
              </div>

              <div className="register-step__body">
                <div className="register-step__heading">
                  <div className="register-step__icon" aria-hidden="true"><Icon className="register-step__icon-main" /><DetailIcon className="register-step__icon-detail" /></div>
                  <div className="register-step__meta"><span>PASO {number}</span><small>{label}</small></div>
                  <span className="register-step__status"><Check aria-hidden="true" /></span>
                </div>
                <div className="register-step__content"><h3>{title}</h3><p>{copy}</p></div>
                <ul className="register-step__points">
                  {points.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}
                </ul>
              </div>
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