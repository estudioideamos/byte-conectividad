"use client";

import { useState } from "react";
import { ArrowUpRight, Facebook, Instagram } from "lucide-react";

type ByteFooterProps = {
  homePrefix?: string;
  assetPrefix?: string;
  requestHref?: string;
  registerHref?: string;
  animate?: boolean;
};

export default function ByteFooter({ homePrefix = "", assetPrefix = "", requestHref = "solicitar-servicio/", registerHref = "como-registrarte/", animate = false }: ByteFooterProps) {
  const [footerOpen, setFooterOpen] = useState<"explore" | "solutions" | null>(null);
  const sectionHref = (id: string) => homePrefix + "#" + id;
  const closeFooter = () => setFooterOpen(null);

  return (
    <>
      <footer className="byte-footer">
        <div className="byte-footer__aurora" aria-hidden="true" />
        <section className={"byte-footer__cta " + (animate ? "reveal" : "")}>
          <div className="byte-footer__cta-copy">
            <span className="section-tag"><i /> LA RED QUE TE ACOMPAÑA</span>
            <h2><span className="byte-footer__cta-title-line">Estés donde estés, tus ideas</span><em>pueden llegar más lejos.</em></h2>
            <p>Conectividad estable, soporte local y una solución pensada para tu zona.</p>
          </div>
          <a className="byte-footer__orbit" href={sectionHref("contacto")} aria-label="Consultar cobertura con Byte">
            <span className="byte-footer__orbit-ring" aria-hidden="true" />
            <svg className="byte-footer__orbit-copy" viewBox="0 0 174 174" aria-hidden="true">
              <defs>
                <path id="byte-footer-orbit-path" d="M 87,87 m -66,0 a 66,66 0 1,1 132,0 a 66,66 0 1,1 -132,0" />
              </defs>
              <text textLength="405" lengthAdjust="spacing">
                <textPath href="#byte-footer-orbit-path" startOffset="0">HABLEMOS · CONECTEMOS · BYTE ·</textPath>
              </text>
            </svg>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>

        <div className="byte-footer__main">
          <div className="byte-footer__brand">
            <span className="brand-color-logo brand-color-logo--footer">
              <img src={assetPrefix + "assets/byte-logo.png"} width="1107" height="209" alt="Byte Conectividad" />
              <img className="brand-color-logo__byte" src={assetPrefix + "assets/byte-logo.png"} width="1107" height="209" alt="" aria-hidden="true" />
            </span>
            <p>Internet de alta velocidad para Lincoln y la región. Tecnología que conecta, personas que acompañan.</p>
            <span className="byte-footer__status"><i /> RED OPERATIVA · SOPORTE LOCAL</span>
            <div className="byte-footer__social" aria-label="Redes sociales">
              <a href="https://www.instagram.com/byteconectividad.20/" target="_blank" rel="noreferrer" aria-label="Instagram de Byte"><Instagram aria-hidden="true" /></a>
              <a href="https://www.facebook.com/Byte-Conectividad-416914858648229" target="_blank" rel="noreferrer" aria-label="Facebook de Byte"><Facebook aria-hidden="true" /></a>
            </div>
          </div>

          <div className={"byte-footer__nav " + (footerOpen === "explore" ? "is-open" : "")}>
            <span className="byte-footer__nav-heading">EXPLORÁ</span>
            <button className="byte-footer__nav-button" type="button" aria-expanded={footerOpen === "explore"} aria-controls="footer-explore" onClick={() => setFooterOpen(footerOpen === "explore" ? null : "explore")}>
              <span>EXPLORÁ</span><i aria-hidden="true" />
            </button>
            <nav id="footer-explore" className="byte-footer__nav-list" aria-label="Explorar Byte">
              <a href={sectionHref("servicios")} onClick={closeFooter}>Servicios <b>↗</b></a>
              <a href={sectionHref("cobertura")} onClick={closeFooter}>Cobertura <b>↗</b></a>
              <a href={sectionHref("nosotros")} onClick={closeFooter}>Nosotros <b>↗</b></a>
              <a href={sectionHref("contacto")} onClick={closeFooter}>Contacto <b>↗</b></a>
              <a href={requestHref} onClick={closeFooter}>Solicitar servicio <b>↗</b></a>
              <a href={registerHref} onClick={closeFooter}>Cómo registrarte <b>↗</b></a>
            </nav>
          </div>

          <div className={"byte-footer__nav " + (footerOpen === "solutions" ? "is-open" : "")}>
            <span className="byte-footer__nav-heading">SOLUCIONES</span>
            <button className="byte-footer__nav-button" type="button" aria-expanded={footerOpen === "solutions"} aria-controls="footer-solutions" onClick={() => setFooterOpen(footerOpen === "solutions" ? null : "solutions")}>
              <span>SOLUCIONES</span><i aria-hidden="true" />
            </button>
            <nav id="footer-solutions" className="byte-footer__nav-list" aria-label="Soluciones Byte">
              <a href={sectionHref("servicios")} onClick={closeFooter}>Internet para hogares</a>
              <a href={sectionHref("servicios")} onClick={closeFooter}>Internet para empresas</a>
              <a href={sectionHref("cobertura")} onClick={closeFooter}>Conectividad rural</a>
              <a href={sectionHref("servicios")} onClick={closeFooter}>Zonas WiFi</a>
            </nav>
          </div>

          <div className="byte-footer__contact">
            <span>EQUIPO LOCAL</span>
            <h3>Tu mejor conexión empieza con una charla.</h3>
            <a className="byte-footer__whatsapp" href="https://wa.me/5492355448231?text=Hola%20Byte%2C%20quiero%20consultar%20por%20el%20servicio%20de%20internet." target="_blank" rel="noreferrer">
              <img className="whatsapp-mark whatsapp-mark--footer" src={assetPrefix + "assets/whatsapp.svg"} alt="" aria-hidden="true" /><b>Hablar por WhatsApp</b><ArrowUpRight aria-hidden="true" />
            </a>
            <a href="tel:+542355448231">2355 448231</a>
            <a href="mailto:info@byteinformatica.com.ar">info@byteinformatica.com.ar</a>
            <p>Rivadavia 1286 · Lincoln, Bs. As.</p>
          </div>
        </div>

        <div className="byte-footer__bottom">
          <span>© {new Date().getFullYear()} Byte Conectividad.</span>

          <span className="byte-footer__ideamos">Diseño y desarrollo para ir más lejos — <a href="https://ideamos.com.ar" target="_blank" rel="noreferrer">Estudio Ideamos <b>↗</b></a></span>
        </div>
      </footer>

      <a className="whatsapp" href="https://wa.me/5492355448231?text=Hola%20Byte%2C%20quiero%20consultar%20por%20el%20servicio%20de%20internet." target="_blank" rel="noreferrer" aria-label="Escribir a Byte por WhatsApp"><span>WhatsApp</span><i><img className="whatsapp-mark whatsapp-mark--floating" src={assetPrefix + "assets/whatsapp.svg"} alt="" aria-hidden="true" /></i></a>
    </>
  );
}
