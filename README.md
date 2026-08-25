# Byte Conectividad

Sitio institucional de Byte Conectividad, proveedor de internet de alta velocidad para Lincoln, localidades cercanas y zonas rurales de la región.

## Experiencia

- Presentación premium y adaptable a celulares, tablets y escritorio.
- Servicios de banda ancha, internet simétrico y zonas WiFi.
- Visualización de la zona de cobertura.
- Portal de clientes, contacto por correo y acceso directo a WhatsApp.
- Metadatos completos para buscadores y una imagen social propia.
- Animaciones sutiles con alternativa para usuarios que prefieren menos movimiento.

## Desarrollo

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev
```

Para ejecutar todos los controles de calidad antes de publicar:

```bash
npm run check
```

El control incluye estilo de código, tipos, compilación estática y pruebas sobre el HTML generado.

## Rendimiento y seguridad

- Recursos visuales optimizados y videos cargados únicamente cuando están cerca de la pantalla.
- Imágenes con dimensiones definidas para evitar saltos de diseño.
- Política de seguridad de contenido y política de referencia incorporadas.
- Auditoría de dependencias sin vulnerabilidades conocidas.
- Dependabot revisa semanalmente dependencias y acciones de GitHub.
- El formulario de solicitud permanece en modo demostración y no transmite ni almacena datos.

## Publicación

Cada cambio enviado a la rama `main` ejecuta nuevamente todos los controles y, si son correctos, activa la publicación automática en GitHub Pages.