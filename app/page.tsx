"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpDown,
  Building2,
  DraftingCompass,
  Headphones,
  House,
  MapPin,
  MessageCircle,
  MonitorCheck,
  Network,
  Radio,
  RadioTower,
  Router,
  Share2,
  TrendingUp,
  Wifi,
} from "lucide-react";
import SiteHeader from "./SiteHeader";
import ByteFooter from "./ByteFooter";
import { submitContactForm, type ContactFormStatus } from "./lib/contactForm";

const services = [
  { number: "01", label: "PARA TU HOGAR", title: "Internet de banda ancha", copy: "Internet de alta velocidad a través de nuestra red inalámbrica, con una conexión estable y soporte local.", points: ["Navegación fluida", "Instalación personalizada", "Soporte cercano"], icon: "signal" },
  { number: "02", label: "PARA EMPRESAS", title: "Internet simétrico", copy: "La misma velocidad de subida y de bajada para trabajar, compartir archivos y hacer videollamadas con el rendimiento que tu empresa necesita.", points: ["Subida y bajada equivalentes", "Mayor rendimiento", "Solución profesional"], icon: "sync" },
  { number: "03", label: "SOLUCIONES A MEDIDA", title: "Zonas WiFi", copy: "Redes WiFi diseñadas para oficinas, estancias, hoteles y grandes espacios, con cobertura optimizada para cada entorno.", points: ["Diseño a medida", "Cobertura optimizada", "Escalabilidad"], icon: "nodes" },
];

const locations = ["Lincoln", "General Pinto", "Arenaza", "El Triunfo", "Bayauca", "Bermúdez"];
const advantages = [
  ["01", "Red monitoreada", "Monitoreamos nuestra infraestructura de forma constante para ofrecer una conexión estable y confiable."],
  ["02", "Atención personalizada", "Un equipo local que conoce la zona, entiende tus necesidades y está cerca cuando lo necesitás."],
  ["03", "Cobertura regional", "Llevamos conectividad a ciudades y zonas rurales donde la distancia suele ser un desafío."],
];
const features = [
  ["home", "Hogares conectados", "Internet para estudiar, entretenerte, trabajar y compartir sin interrupciones."],
  ["business", "Empresas ágiles", "La misma velocidad de subida y bajada para que tu empresa trabaje sin demoras."],
  ["rural", "Alcance rural", "Infraestructura pensada para llevar conectividad a lugares donde otros no llegan."],
  ["wifi", "WiFi a medida", "Cobertura inteligente para oficinas, estancias, hoteles y grandes espacios."],
  ["support", "Soporte local", "Un equipo real y cercano, listo para ayudarte cuando lo necesitás."],
  ["growth", "Una red que crece", "Ampliamos nuestra infraestructura al ritmo de las necesidades de la región."],
];

const processSteps = [
  { number: "01", icon: "location", title: "Relevamos tu zona", copy: "Analizamos tu ubicación, la cobertura disponible y lo que necesitás." },
  { number: "02", icon: "design", title: "Diseñamos la solución", copy: "Definimos la tecnología y el alcance más adecuados para vos." },
  { number: "03", icon: "install", title: "Activamos tu conexión", copy: "Instalamos el servicio y dejamos todo listo para que te conectes." },
  { number: "04", icon: "monitor", title: "Seguimos a tu lado", copy: "Monitoreamos la red y te brindamos soporte local siempre que lo necesites." },
];

const iconGlyphs = {
  signal: Radio,
  sync: ArrowUpDown,
  nodes: Share2,
  advantage01: Activity,
  advantage02: MessageCircle,
  advantage03: Network,
  home: House,
  business: Building2,
  rural: RadioTower,
  wifi: Wifi,
  support: Headphones,
  growth: TrendingUp,
  location: MapPin,
  design: DraftingCompass,
  install: Router,
  monitor: MonitorCheck,
} as const;

function IconGlyph({ name }: { name: string }) {
  const Glyph = iconGlyphs[name as keyof typeof iconGlyphs] ?? Network;
  return (
    <>
      <Glyph className="icon-glyph" strokeWidth={1.65} aria-hidden="true" />
      <span className="icon-spark" aria-hidden="true" />
    </>
  );
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formStartedAtRef = useRef(Date.now());
  const [formStatus, setFormStatus] = useState<ContactFormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");

  async function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("sending");
    setFormMessage("");

    try {
      const result = await submitContactForm(form, "contact", formStartedAtRef.current);
      form.reset();
      formStartedAtRef.current = Date.now();
      setFormMessage(result.message || "Recibimos tu consulta. Te vamos a contactar a la brevedad.");
      setFormStatus("success");
    } catch (error) {
      setFormMessage(error instanceof Error ? error.message : "No pudimos enviar tu consulta. Intentá nuevamente.");
      setFormStatus("error");
    }
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let points: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * density));
      canvas.height = Math.max(1, Math.round(height * density));
      context.setTransform(density, 0, 0, density, 0, 0);
      const count = Math.max(28, Math.min(58, Math.round(width / 25)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .12,
        vy: (Math.random() - .5) * .12,
        size: Math.random() * 1.25 + .45,
      }));
    };

    const handlePointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - .5) * 14;
      pointerY = (event.clientY / window.innerHeight - .5) * 10;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        if (!reducedMotion) {
          point.x += point.vx;
          point.y += point.vy;
          if (point.x < -20) point.x = width + 20;
          if (point.x > width + 20) point.x = -20;
          if (point.y < -20) point.y = height + 20;
          if (point.y > height + 20) point.y = -20;
        }
        const x = point.x + pointerX;
        const y = point.y + pointerY;
        context.beginPath();
        context.arc(x, y, point.size, 0, Math.PI * 2);
        context.fillStyle = "rgba(111, 130, 255, .58)";
        context.fill();

        for (let next = index + 1; next < points.length; next += 1) {
          const other = points[next];
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(other.x + pointerX, other.y + pointerY);
            context.strokeStyle = "rgba(88, 106, 255, " + ((1 - distance / 150) * .16) + ")";
            context.lineWidth = .7;
            context.stroke();
          }
        }
      }
      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    draw();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -7% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-lazy-video]"));

    const loadVideo = (video: HTMLVideoElement) => {
      if (video.dataset.loaded === "true") return;
      video.querySelectorAll<HTMLSourceElement>("source[data-src]").forEach((source) => {
        source.src = source.dataset.src ?? "";
        source.removeAttribute("data-src");
      });
      video.dataset.loaded = "true";
      video.load();
    };

    const syncVideo = (video: HTMLVideoElement) => {
      if (motionPreference.matches || video.dataset.inView !== "true") {
        video.pause();
        return;
      }
      loadVideo(video);
      video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        video.dataset.inView = String(entry.isIntersecting);
        syncVideo(video);
      });
    }, { rootMargin: "240px 0px" });

    const syncPlayback = () => videos.forEach(syncVideo);
    videos.forEach((video) => observer.observe(video));
    motionPreference.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
      motionPreference.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <main>
      <SiteHeader />

      <section className="hero" id="inicio">
        <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" /><div className="hero-aurora hero-aurora-one" aria-hidden="true" /><div className="hero-aurora hero-aurora-two" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> INTERNET DE ALTA VELOCIDAD · LINCOLN Y LA REGIÓN</div>
          <h1>Conectividad que<br /><em>llega más lejos.</em></h1>
          <p>Una red pensada para acercarte a lo que importa. Internet estable, atención cercana y soluciones a medida para hogares, empresas y zonas rurales.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contacto">Consultar cobertura <span>↗</span></a><a className="button button-secondary" href="#servicios">Explorar servicios <span>↓</span></a></div>
          <div className="hero-checks"><span><i>✓</i> Atención personalizada</span><span><i>✓</i> Monitoreo constante</span></div>
        </div>

        <div className="network-dashboard" aria-label="Panel visual de la red Byte">
          <div className="dash-top"><div className="dash-brand"><b><img src="assets/byte-symbol.png" width="181" height="209" alt="" aria-hidden="true" /></b><span>BYTE NETWORK</span></div><div className="dash-status"><i /> RED OPERATIVA</div><div className="dash-period">AHORA <span>⌄</span></div></div>
          <div className="dash-telemetry" aria-hidden="true"><span><i /> 99.9% DISPONIBILIDAD</span><span>COBERTURA · CIUDAD + CAMPO</span><span>MONITOREO 24/7</span></div>
          <div className="dash-body">
            <aside className="dash-sidebar" aria-hidden="true">
              <span className="dash-menu-active"><i>◫</i>Estado</span><span><i>⌁</i>Servicios</span><span><i>◎</i>Cobertura</span><span><i>◈</i>Soporte</span>
              <div className="dash-user"><b>BC</b><small>EQUIPO BYTE</small></div>
            </aside>
            <div className="dash-content">
              <div className="dash-heading"><div><small>ESTADO DE LA RED</small><h2>Conectividad regional</h2></div><span className="live-pill"><i /> EN LÍNEA</span></div>
              <div className="dash-grid">
                <article className="chart-card">
                  <div className="card-title"><span>ACTIVIDAD DE RED</span><b>Últimas 24 h</b></div><div className="chart-value"><strong>Activa</strong><span>flujo estable</span></div>
                  <svg className="line-chart" viewBox="0 0 640 220" role="img" aria-label="Actividad estable de la red">
                    <defs><linearGradient id="lineGlow" x1="0" x2="1"><stop stopColor="#3b72ff"/><stop offset="1" stopColor="#8455ff"/></linearGradient><linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#476cff" stopOpacity=".35"/><stop offset="1" stopColor="#476cff" stopOpacity="0"/></linearGradient></defs>
                    <path d="M0,183 C55,170 72,129 125,140 C174,151 192,96 242,110 C294,125 311,65 365,76 C420,88 442,42 496,52 C553,62 584,23 640,30 L640,220 L0,220 Z" fill="url(#areaGlow)"/><path d="M0,183 C55,170 72,129 125,140 C174,151 192,96 242,110 C294,125 311,65 365,76 C420,88 442,42 496,52 C553,62 584,23 640,30" fill="none" stroke="url(#lineGlow)" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                  <div className="chart-axis"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
                </article>
                <article className="coverage-card"><div className="card-title"><span>COBERTURA</span><b>REGIÓN</b></div><div className="coverage-ring"><span><strong>6</strong><small>LOCALIDADES</small></span></div><div className="coverage-legend"><span><i /> Urbana</span><span><i /> Rural</span></div></article>
                <article className="nodes-card"><div className="card-title"><span>NODOS PRINCIPALES</span><b>VER TODOS ↗</b></div><div className="node-list">{locations.slice(0, 4).map((location, index) => <span key={location}><i className={"node-dot node-dot-" + index} />{location}<b>Activo</b></span>)}</div></article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip reveal" aria-label="Presencia regional"><p>Desde 2003 conectando personas, proyectos y oportunidades</p><div className="location-marquee"><div>{[...locations, ...locations].map((location, index) => <span key={location + index}><i />{location}</span>)}</div></div></section>
      <section className="coverage reveal" id="cobertura">
        <div className="coverage-copy"><span className="section-tag">COBERTURA REGIONAL</span><h2>Conectamos la ciudad.<br /><em>Y también el campo.</em></h2><p>Llevamos conectividad a localidades y zonas rurales donde conectarse siempre fue un desafío. Nuestra infraestructura sigue creciendo para que la distancia deje de ser un límite.</p><div className="location-list">{locations.map((location) => <span key={location}><i />{location}</span>)}</div><a className="button button-primary" href="#contacto">Consultar mi ubicación <span>↗</span></a></div>
        <div className="coverage-map" aria-label="Visualización de la cobertura regional de Byte">
          <video className="coverage-photo" data-lazy-video muted loop playsInline preload="none" width="1599" height="900" poster="assets/byte-regional-network.webp" aria-label="Animación de localidades y zonas rurales conectadas por la red de Byte">
            <source data-src="assets/byte-regional-loop.mp4" type="video/mp4" />
          </video>
          <div className="coverage-photo-shade" aria-hidden="true" /><div className="map-grid" aria-hidden="true" /><div className="map-radar radar-one" /><div className="map-radar radar-two" /><div className="map-radar radar-three" /><div className="map-core"><b><img src="assets/byte-symbol.png" width="181" height="209" alt="" aria-hidden="true" /></b><small>LINCOLN</small></div>{locations.slice(1).map((location, index) => <span className={"map-node map-node-" + (index + 1)} key={location}><i />{location}</span>)}<div className="map-card"><span>ZONA CONECTADA</span><strong>CIUDAD + CAMPO</strong><small>Infraestructura en expansión</small></div>
        </div>
      </section>


      <section className="advantages reveal" aria-label="Ventajas Byte">{advantages.map(([number, title, copy]) => <article key={number}><span>{number}</span><div className={"advantage-icon advantage-icon-" + number + " icon-shell"} aria-hidden="true"><IconGlyph name={"advantage" + number} /></div><h2>{title}</h2><p>{copy}</p></article>)}</section>

      <section className="about reveal" id="nosotros">
        <div className="section-intro"><span className="section-tag">SOBRE BYTE</span><h2>Tecnología que conecta.<br /><em>Personas que acompañan.</em></h2><p>Nacimos en Lincoln en 2003 con una idea simple: llevar conectividad de calidad a cada rincón de la región, incluso donde parecía imposible.</p></div>
        <div className="about-layout">
          <div className="about-visual">
            <img className="about-photo" src="assets/byte-network-team.webp" width="1440" height="960" alt="Equipo técnico monitoreando la red de Byte" loading="lazy" decoding="async" />
            <div className="about-photo-shade" aria-hidden="true" />
            <span className="about-label"><i /> INFRAESTRUCTURA ACTIVA</span>
          </div>
          <div className="about-content"><span className="section-tag">UNA RED QUE CRECE CON VOS</span><h3>Más de dos décadas acercando oportunidades.</h3><p>Hoy llegamos a distintas localidades de la zona y seguimos ampliando nuestra red. La monitoreamos de forma constante para ofrecer un servicio confiable, con atención cercana y personalizada.</p><div className="metric-grid"><div><strong>2003</strong><span>El año en que empezó nuestra historia</span></div><div><strong>6</strong><span>Localidades y zonas rurales conectadas</span></div><div><strong>Local</strong><span>Equipo cercano, respuestas reales</span></div></div><a className="text-button" href="#contacto">Conocé nuestra cobertura <span>↗</span></a></div>
        </div>
      </section>

      <section className="services reveal" id="servicios">
        <div className="section-intro section-intro-centered"><span className="section-tag">NUESTROS SERVICIOS</span><h2>Una solución para cada<br /><em>necesidad de conexión.</em></h2><p>Desde tu hogar hasta una operación a gran escala, diseñamos la red que necesitás.</p></div>
        <div className="services-list">{services.map((service) => <article className="service-card" key={service.number}><div className="service-top"><span className="service-number">{service.number}</span><div className={"service-icon icon-" + service.icon + " icon-shell"} aria-hidden="true"><IconGlyph name={service.icon} /></div></div><span className="service-label">{service.label}</span><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.points.map((point) => <li key={point}><i>✓</i>{point}</li>)}</ul><a href="#contacto">Consultar servicio <span>↗</span></a></article>)}</div>
      </section>

      <section className="network-film reveal" aria-label="La red Byte en movimiento">
        <picture>
          <source media="(max-width: 540px)" srcSet="assets/byte-robot-network-mobile.webp" width="1086" height="1448" />
          <img className="network-film-image" src="assets/byte-robot-network.webp" width="1672" height="941" alt="Androide futurista de Byte integrado a una red de conectividad" loading="lazy" decoding="async" />
        </picture>

        <div className="network-film-shade" aria-hidden="true" />
        <div className="network-film-copy">
          <span className="section-tag">INFRAESTRUCTURA EN MOVIMIENTO</span>
          <h2>Datos que viajan.<br /><em>Oportunidades que llegan.</em></h2>
          <p>Cada señal recorre una red diseñada para conectar personas, empresas y proyectos en toda la región.</p>
        </div>
        <div className="film-hud" aria-hidden="true">
          <span><i /> RED ACTIVA</span><span>CIUDAD</span><b>→</b><span>CAMPO</span><b>→</b><span>REGIÓN</span>
        </div>
      </section>

      <section className="process-section reveal">
        <div className="section-intro">
          <span className="section-tag">CÓMO TRABAJAMOS</span>
          <h2>Conectarte es simple.<br /><em>Nosotros nos ocupamos.</em></h2>
          <p>Un proceso claro, con especialistas locales que te acompañan de principio a fin.</p>
        </div>
        <div className="process-flow">
          <div className="process-beam" aria-hidden="true"><i /></div>
          {processSteps.map((step) => (
            <article className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <div className={"process-icon process-icon-" + step.icon + " icon-shell"} aria-hidden="true"><IconGlyph name={step.icon} /></div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
        <div className="process-summary">
          <span><i /> RESPUESTA CERCANA</span><span><i /> DISEÑO A MEDIDA</span><span><i /> MONITOREO CONSTANTE</span>
        </div>
      </section>

      <section className="feature-section reveal"><div className="section-intro section-intro-centered"><span className="section-tag">PENSADA PARA LA REGIÓN</span><h2>La conexión que necesitás.<br /><em>Donde la necesitás.</em></h2></div><div className="feature-grid">{features.map(([icon, title, copy]) => <article key={title}><span className={"feature-icon feature-icon-" + icon + " icon-shell"} aria-hidden="true"><IconGlyph name={icon} /></span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="portal reveal">
        <div className="portal-glow" aria-hidden="true" />
        <div className="portal-matrix" aria-hidden="true"><i /><i /><i /></div>
        <div className="portal-copy">
          <span className="section-tag"><i /> ÁREA CLIENTES</span>
          <h2>Tu cuenta, más simple.<br /><em>Todo en un solo lugar.</em></h2>
          <p>Consultá tu cuenta corriente, descargá tus facturas y realizá pagos online con débito, QR o billeteras virtuales.</p>
          <div className="portal-proof" aria-label="Funciones del portal"><span><i /> Cuenta corriente</span><span><i /> Facturas para descargar</span><span><i /> Pagos online</span></div>
          <div className="portal-actions"><a className="button button-light" href="https://ap2.factulinc.com.ar/loginc/200h1k1q1p1z1k1w1a0h130w220o0v" target="_blank" rel="noreferrer">Accedé a tu cuenta <span>↗</span></a><a className="text-button portal-guide" href="como-registrarte/">¿Primera vez? Cómo registrarte <span>↗</span></a></div>
        </div>
        <div className="portal-console" aria-hidden="true">
          <div className="console-bar"><div className="console-dots"><i /><i /><i /></div><span>MI CUENTA BYTE</span><b><i /> EN LÍNEA</b></div>
          <div className="console-body">
            <div className="console-head"><span>RESUMEN DEL SERVICIO</span><small>ACTUALIZADO AHORA</small></div>
            <div className="console-status"><i /> SERVICIO ACTIVO</div>
            <strong>Tu cuenta, al día.</strong>
            <p>Facturas, pagos y comprobantes en un solo lugar.</p>
            <div className="console-signal">
              <div><span>ACTIVIDAD DEL SERVICIO</span><b>ÚLTIMAS 24 H</b></div>
              <div className="console-line"><i /></div>
              <div className="console-axis"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
            </div>
            <div className="console-info-grid"><span><small>CUENTA CORRIENTE</small><b>Disponible</b></span><span><small>FACTURAS</small><b>Descargar</b></span><span><small>PAGOS</small><b>Online</b></span></div>
          </div>
        </div>
      </section>

      <section className="faq reveal">
        <div className="faq-heading"><span className="section-tag">PREGUNTAS FRECUENTES</span><h2>Todo lo que necesitás saber.</h2><p>Si tu pregunta no está acá, escribinos. Nuestro equipo está listo para ayudarte.</p><a className="text-button" href="#contacto">Hablar con Byte <span>↗</span></a></div>
        <div className="faq-list"><details open><summary>¿En qué localidades tienen cobertura?<span>+</span></summary><p>Brindamos servicio en Lincoln, General Pinto, Arenaza, El Triunfo, Bayauca y Bermúdez, además de las zonas rurales comprendidas entre estas localidades.</p></details><details><summary>¿Qué es internet simétrico?<span>+</span></summary><p>Es una conexión con la misma velocidad de subida y de bajada. Es ideal para empresas, videollamadas, trabajo en la nube y envío de archivos pesados.</p></details><details><summary>¿Puedo consultar disponibilidad en una zona rural?<span>+</span></summary><p>Sí. Analizamos cada ubicación para confirmar la mejor alternativa de conexión disponible.</p></details><details><summary>¿Cómo ingreso al área de clientes?<span>+</span></summary><p>Entrá desde “Accedé a tu cuenta”. Si todavía no tenés usuario, seguí nuestra <a href="como-registrarte/">guía para registrarte paso a paso</a>.</p></details></div>
      </section>

      <section className="contact reveal" id="contacto">
        <div className="contact-copy"><span className="section-tag">HABLEMOS</span><h2>Tu próxima conexión<br /><em>empieza acá.</em></h2><p>Dejanos tus datos y te vamos a contactar para recomendarte la mejor opción disponible en tu zona.</p><div className="contact-details"><a href="tel:+542355448231"><span>TELÉFONOS</span><b>2355 448231 · 448232 · 448269</b></a><a href="mailto:info@byteinformatica.com.ar"><span>EMAIL GENERAL</span><b>info@byteinformatica.com.ar</b></a><a href="mailto:atencionaclientes@byteinformatica.com.ar"><span>ATENCIÓN AL CLIENTE</span><b>atencionaclientes@byteinformatica.com.ar</b></a><a href="https://maps.google.com/?q=Rivadavia+1286+Lincoln+Buenos+Aires" target="_blank" rel="noreferrer"><span>OFICINA</span><b>Rivadavia 1286 · Lincoln, Bs. As.</b></a></div></div>
        <form className="contact-form" onSubmit={sendForm}>
          <div className="form-heading"><span>CONTANOS QUÉ NECESITÁS</span><i>01</i></div>
          <div className="form-honeypot" aria-hidden="true"><label>Empresa<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="field-row"><label>Nombre completo<input name="name" type="text" autoComplete="name" placeholder="Tu nombre" required /></label><label>Teléfono<input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Tu número" required /></label></div>
          <div className="field-row"><label>Email<input name="email" type="email" autoComplete="email" inputMode="email" placeholder="nombre@email.com" required /></label><label>Localidad<input name="location" type="text" autoComplete="address-level2" placeholder="¿Dónde estás?" required /></label></div>
          <label>¿Qué servicio necesitás?<select name="service" defaultValue="" required><option value="" disabled>Elegí una opción</option><option>Internet de banda ancha</option><option>Internet simétrico</option><option>Zonas WiFi</option><option>Quiero asesoramiento</option></select></label>
          <label>Contanos un poco más<textarea name="message" placeholder="Escribí tu consulta..." rows={4} maxLength={2000} /></label>
          <button className="form-submit" type="submit" disabled={formStatus === "sending"} aria-busy={formStatus === "sending"}>{formStatus === "sending" ? "Enviando consulta..." : "Enviar consulta"} <span>↗</span></button>
          {formStatus !== "idle" && formStatus !== "sending" && <p className={"form-feedback form-feedback--" + formStatus} role="status" aria-live="polite">{formMessage}</p>}
          <small>Tus datos se envían de forma segura al equipo de Byte y no se comparten con terceros.</small>
        </form>
      </section>

      <section className="career reveal"><div><span className="section-tag">OPORTUNIDADES LABORALES</span><h2>¿Querés ser parte de Byte?</h2></div><p>Estamos construyendo la red del futuro con talento local.</p><a className="button button-secondary" href="mailto:info@byteinformatica.com.ar?subject=Quiero%20trabajar%20en%20Byte%20Conectividad">Enviar mi CV <span>↗</span></a></section>

      <ByteFooter animate />
    </main>
  );
}
