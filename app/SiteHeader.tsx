"use client";

import { useEffect, useState } from "react";

const accountUrl = "https://ap2.factulinc.com.ar/loginc/200h1k1q1p1z1k1w1a0h130w220o0v";

type SiteHeaderProps = {
  homePrefix?: string;
  assetPrefix?: string;
  requestHref?: string;
  requestActive?: boolean;
};

export default function SiteHeader({
  homePrefix = "",
  assetPrefix = "",
  requestHref = "solicitar-servicio/",
  requestActive = false,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionHref = (id: string) => homePrefix + "#" + id;
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.classList.toggle("menu-open", menuOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a className="brand" href={sectionHref("inicio")} aria-label="Byte Conectividad, inicio" onClick={closeMenu}>
        <img src={assetPrefix + "assets/byte-logo.png"} alt="Byte Conectividad" />
      </a>

      <nav className="desktop-nav" aria-label="Navegación principal">
        <a className={!requestActive ? "is-active" : undefined} href={sectionHref("inicio")}>Inicio</a>
        <a href={sectionHref("servicios")}>Servicios</a>
        <a href={sectionHref("cobertura")}>Cobertura</a>
        <a href={sectionHref("nosotros")}>Nosotros</a>
        <a href={sectionHref("contacto")}>Contacto</a>
        <a className={requestActive ? "is-active" : undefined} href={requestHref}>Solicitar servicio</a>
      </nav>

      <div className="header-actions">
        <a className="header-client" href={accountUrl} target="_blank" rel="noreferrer">
          Accedé a tu cuenta <span aria-hidden="true">↗</span>
        </a>
        <button
          className={"menu-toggle " + (menuOpen ? "is-open" : "")}
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i /><i />
        </button>
      </div>

      <div id="mobile-navigation" className={"mobile-menu " + (menuOpen ? "is-open" : "")} aria-hidden={!menuOpen}>
        <span className="mobile-menu-label">NAVEGACIÓN</span>
        <a href={sectionHref("inicio")} onClick={closeMenu}>Inicio <b>01</b></a>
        <a href={sectionHref("servicios")} onClick={closeMenu}>Servicios <b>02</b></a>
        <a href={sectionHref("cobertura")} onClick={closeMenu}>Cobertura <b>03</b></a>
        <a href={sectionHref("nosotros")} onClick={closeMenu}>Nosotros <b>04</b></a>
        <a href={sectionHref("contacto")} onClick={closeMenu}>Contacto <b>05</b></a>
        <a className="mobile-menu-request" href={requestHref} onClick={closeMenu}>Solicitar servicio <b>06</b></a>
        <a className="mobile-menu-client" href={accountUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
          Accedé a tu cuenta <b>↗</b>
        </a>
        <div className="mobile-menu-meta"><span>Lincoln, Buenos Aires</span><span>2355 448231</span></div>
      </div>
    </header>
  );
}