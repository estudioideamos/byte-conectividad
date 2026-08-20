"use client";

import { FormEvent, useState } from "react";

const services = [
  {
    number: "01",
    kicker: "PARA TU HOGAR",
    title: "Internet\nde banda ancha",
    copy: "Conexión de alta velocidad a través de nuestra red inalámbrica. Estable, confiable y con soporte local de verdad.",
    symbol: "waves",
  },
  {
    number: "02",
    kicker: "PARA EMPRESAS",
    title: "Internet\nsimétrico",
    copy: "La misma velocidad de subida y de bajada para trabajar, compartir archivos, hacer videollamadas y crecer sin límites.",
    symbol: "arrows",
  },
  {
    number: "03",
    kicker: "SOLUCIONES A MEDIDA",
    title: "Zonas\nWiFi",
    copy: "Diseñamos redes WiFi para oficinas, estancias, hoteles y grandes empresas, con cobertura pensada para cada espacio.",
    symbol: "rings",
  },
];

const locations = ["Lincoln", "General Pinto", "Arenaza", "El Triunfo", "Bayauca", "Bermúdez"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  function sendForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Consulta web · ${data.get("service") || "Información general"}`);
    const body = encodeURIComponent(
      `Nombre: ${data.get("name")}\nTeléfono: ${data.get("phone")}\nEmail: ${data.get("email")}\nLocalidad: ${data.get("location")}\nServicio: ${data.get("service")}\n\nMensaje:\n${data.get("message")}`
    );
    window.location.href = `mailto:atencionaclientes@byteinformatica.com.ar?subject=${subject}&body=${body}`;
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Byte Conectividad, inicio" onClick={closeMenu}>
          <img src="assets/byte-logo.png" alt="Byte Conectividad" />
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#servicios">Servicios</a>
          <a href="#cobertura">Cobertura</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="header-actions">
          <a className="header-client" href="https://ap2.factulinc.com.ar" target="_blank" rel="noreferrer">
            Área clientes <span aria-hidden="true">↗</span>
          </a>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i /><i />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <span className="mobile-menu-label">NAVEGACIÓN</span>
          <a href="#servicios" onClick={closeMenu}>Servicios <b>01</b></a>
          <a href="#cobertura" onClick={closeMenu}>Cobertura <b>02</b></a>
          <a href="#nosotros" onClick={closeMenu}>Nosotros <b>03</b></a>
          <a href="#contacto" onClick={closeMenu}>Contacto <b>04</b></a>
          <div className="mobile-menu-meta">
            <span>Lincoln, Buenos Aires</span>
            <span>2355 448231</span>
          </div>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />

        <div className="hero-copy">
          <div className="eyebrow"><span /> Internet de alta velocidad · Lincoln y la región</div>
          <h1>Conectividad que<br /><em>llega más lejos.</em></h1>
          <p>
            Una red pensada para acercarte a lo que importa. Internet estable,
            atención cercana y soluciones a medida para hogares, empresas y zonas rurales.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contacto">
              Consultar cobertura <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="#servicios">
              Explorar servicios <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <div><strong>+20</strong><span>años conectando la región</span></div>
            <div><strong>24/7</strong><span>monitoreo constante</span></div>
          </div>
        </div>

        <div className="network-visual" aria-label="Red de conectividad Byte activa">
          <div className="visual-label"><span /> RED BYTE <b>ONLINE</b></div>
          <div className="orbital orbital-a" />
          <div className="orbital orbital-b" />
          <div className="orbital orbital-c" />
          <div className="signal-core">
            <span className="signal-logo">B</span>
            <small>NODO CENTRAL</small>
            <b>LINCOLN</b>
          </div>
          {[
            ["LINCOLN", "node-1"],
            ["G. PINTO", "node-2"],
            ["ARENAZA", "node-3"],
            ["BAYAUCA", "node-4"],
            ["EL TRIUNFO", "node-5"],
          ].map(([label, className]) => (
            <span className={`network-node ${className}`} key={label}>
              <i /> {label}
            </span>
          ))}
          <div className="data-card data-card-top"><span>SEÑAL</span><strong>99.8%</strong><i /></div>
          <div className="data-card data-card-bottom"><span>ESTADO DE RED</span><strong>ÓPTIMO</strong><i /></div>
        </div>

        <div className="scroll-cue"><span>SCROLL</span><i /></div>
      </section>

      <section className="services section-light" id="servicios">
        <div className="section-heading">
          <div>
            <span className="section-index">01 / SERVICIOS</span>
            <h2>Una solución para<br />cada forma de <em>conectarte.</em></h2>
          </div>
          <p>
            Desde el hogar hasta una operación de gran escala, diseñamos la red
            que necesitás con tecnología confiable y acompañamiento personalizado.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className={`service-symbol symbol-${service.symbol}`} aria-hidden="true">
                <i /><i /><i />
              </div>
              <div className="service-number">{service.number}</div>
              <div className="service-content">
                <span>{service.kicker}</span>
                <h3>{service.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                <p>{service.copy}</p>
                <a href="#contacto" aria-label={`Consultar por ${service.title.replace("\n", " ")}`}>
                  Consultar servicio <b aria-hidden="true">↗</b>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="coverage" id="cobertura">
        <div className="coverage-map" aria-hidden="true">
          <div className="map-noise" />
          <span className="map-line line-a" /><span className="map-line line-b" />
          <span className="map-line line-c" /><span className="map-line line-d" />
          {locations.map((location, index) => (
            <div className={`map-point point-${index + 1}`} key={location}>
              <i /><span>{location}</span>
            </div>
          ))}
          <div className="map-scan" />
        </div>
        <div className="coverage-copy">
          <span className="section-index">02 / COBERTURA</span>
          <h2>Conectamos<br />la ciudad.<br /><em>Y el campo.</em></h2>
          <p>
            Llegamos a localidades y zonas rurales donde conectarse siempre fue
            un desafío. Nuestra infraestructura crece para que la distancia deje de ser un límite.
          </p>
          <div className="location-list">
            {locations.map((location) => <span key={location}><i />{location}</span>)}
            <span className="location-rural"><i />Toda la zona rural comprendida entre estas localidades</span>
          </div>
          <a className="text-link" href="#contacto">Consultar mi ubicación <span>↗</span></a>
        </div>
      </section>

      <section className="manifesto" aria-label="Nuestra promesa">
        <div className="manifesto-orbit" aria-hidden="true"><i /><i /><i /></div>
        <span className="section-index">CONEXIÓN SIN FRONTERAS</span>
        <h2>Menos distancia.<br /><em>Más posibilidades.</em></h2>
        <p>Para estudiar. Para trabajar. Para crear. Para estar cerca.</p>
        <div className="manifesto-marquee" aria-hidden="true">
          <div>
            <span>SIEMPRE CONECTADOS</span><i>✦</i><span>RED EN MOVIMIENTO</span><i>✦</i>
            <span>SIEMPRE CONECTADOS</span><i>✦</i><span>RED EN MOVIMIENTO</span><i>✦</i>
          </div>
        </div>
      </section>

      <section className="about section-light" id="nosotros">
        <div className="about-main">
          <div className="about-copy">
            <span className="section-index">03 / SOBRE BYTE</span>
            <h2>Tecnología de punta.<br /><em>Trato de siempre.</em></h2>
            <p className="about-lead">
              Nacimos en Lincoln en 2003 con una idea simple: llevar conectividad de calidad
              a cada persona, incluso donde parecía imposible.
            </p>
            <p>
              Hoy brindamos servicio en distintas localidades de la zona y seguimos ampliando
              nuestra red. La monitoreamos de forma constante para asegurar calidad y fiabilidad,
              y acompañamos a cada cliente con atención totalmente personalizada.
            </p>
          </div>
          <div className="about-metrics">
            <div><span>DESDE</span><strong>2003</strong><p>Más de dos décadas creciendo junto a la región.</p></div>
            <div><span>ORIGEN</span><strong>Lincoln</strong><p>Equipo local, respuestas cercanas y conocimiento real de la zona.</p></div>
            <div><span>COMPROMISO</span><strong>Siempre</strong><p>Monitoreo continuo para una conexión estable y confiable.</p></div>
          </div>
        </div>
        <div className="career-banner">
          <div><span>OPORTUNIDADES LABORALES</span><h3>¿Querés ser parte de Byte?</h3></div>
          <p>Estamos construyendo la red del futuro con talento local.</p>
          <a href="mailto:info@byteinformatica.com.ar?subject=Quiero%20trabajar%20en%20Byte%20Conectividad">
            Enviar mi CV <span>↗</span>
          </a>
        </div>
      </section>

      <section className="client-portal">
        <div className="portal-visual" aria-hidden="true">
          <div className="portal-ring portal-ring-one" /><div className="portal-ring portal-ring-two" />
          <div className="portal-core">B</div>
        </div>
        <div className="portal-copy">
          <span className="section-index">ÁREA CLIENTES</span>
          <h2>Tu cuenta,<br />siempre a mano.</h2>
          <p>Consultá tu estado de cuenta y administrá tu servicio desde el portal de clientes.</p>
          <a className="button button-primary" href="https://ap2.factulinc.com.ar" target="_blank" rel="noreferrer">
            Ingresar a mi cuenta <span>↗</span>
          </a>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="contact-copy">
          <span className="section-index">04 / CONTACTO</span>
          <h2>Hablemos de tu<br />próxima <em>conexión.</em></h2>
          <p>
            Dejanos tus datos y te contactamos para recomendarte la mejor solución
            disponible en tu zona.
          </p>
          <div className="contact-details">
            <a href="tel:+542355448231"><span>TELÉFONOS</span><b>2355 448231 · 448232 · 448269</b></a>
            <a href="mailto:info@byteinformatica.com.ar"><span>EMAIL GENERAL</span><b>info@byteinformatica.com.ar</b></a>
            <a href="mailto:atencionaclientes@byteinformatica.com.ar"><span>ATENCIÓN AL CLIENTE</span><b>atencionaclientes@byteinformatica.com.ar</b></a>
            <a href="https://maps.google.com/?q=Rivadavia+1286+Lincoln+Buenos+Aires" target="_blank" rel="noreferrer"><span>OFICINA</span><b>Rivadavia 1286 · Lincoln, Bs. As.</b></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={sendForm}>
          <div className="field-row">
            <label>Nombre completo<input name="name" type="text" placeholder="Tu nombre" required /></label>
            <label>Teléfono<input name="phone" type="tel" placeholder="Tu número" required /></label>
          </div>
          <div className="field-row">
            <label>Email<input name="email" type="email" placeholder="nombre@email.com" required /></label>
            <label>Localidad<input name="location" type="text" placeholder="¿Dónde estás?" required /></label>
          </div>
          <label>¿Qué servicio necesitás?
            <select name="service" defaultValue="">
              <option value="" disabled>Elegí una opción</option>
              <option>Internet de banda ancha</option>
              <option>Internet simétrico</option>
              <option>Zonas WiFi</option>
              <option>Quiero asesoramiento</option>
            </select>
          </label>
          <label>Contanos un poco más
            <textarea name="message" placeholder="Escribí tu consulta..." rows={4} />
          </label>
          <button className="form-submit" type="submit">Enviar consulta <span aria-hidden="true">↗</span></button>
          <small>Al enviar, se abrirá tu aplicación de correo con la consulta preparada.</small>
        </form>
      </section>

      <footer>
        <div className="footer-top">
          <img src="assets/byte-logo.png" alt="Byte Conectividad" />
          <p>Internet de alta velocidad<br />para Lincoln y la región.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/byteconectividad.20/" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="https://www.facebook.com/Byte-Conectividad-416914858648229" target="_blank" rel="noreferrer">Facebook ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BYTE CONECTIVIDAD</span>
          <span>INTERNET · INFRAESTRUCTURA · SOPORTE</span>
          <a href="#inicio">VOLVER ARRIBA ↑</a>
        </div>
      </footer>

      <a
        className="whatsapp"
        href="https://wa.me/5492355448231?text=Hola%20Byte%2C%20quiero%20consultar%20por%20el%20servicio%20de%20internet."
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir a Byte por WhatsApp"
      >
        <span>WhatsApp</span><i>↗</i>
      </a>
    </main>
  );
}
