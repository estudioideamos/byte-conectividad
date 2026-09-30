# Byte Conectividad

Sitio institucional estático con React/Vinext y un endpoint PHP propio para consultas.
Producción: https://byteconectividad.com.ar/

## Desarrollo y publicación

Node.js >=22.13 y PHP >=8.2 para pruebas del formulario.

- Instalar: npm ci --ignore-scripts
- Desarrollo: npm run dev
- Verificaciones: npm run lint, npm run typecheck, npm run audit:security
- Formularios: php tests/contact-security.test.php (copia temporal sin configuración SMTP)
- Compilar: npm run build:pages
- Validar HTML: npm test

La rama main publica GitHub Pages con comprobaciones previas. El hosting de producción
se actualiza por FTPS: primero recursos, luego páginas, y por último .htaccess.
El paso security-headers genera hashes de los scripts de la versión exportada.
No subir una .htaccess generada con otra compilación: los hashes deben coincidir con el HTML.
Conservar una copia privada de los archivos anteriores para poder revertir.

## Formularios

Ambos formularios envían a /api/contact.php en el dominio de producción mediante
PHPMailer 7.1.1 y SMTP autenticado con STARTTLS. El destinatario se define exclusivamente
en la configuración del servidor. No se utiliza un servicio intermediario de formularios.

El archivo /www/.private/mail-config.php existe solo en el hosting y debe estar
bloqueado por Apache. No copiar credenciales al repositorio ni al directorio de exportación.
El acceso público a .private y al código auxiliar de la API se deniega por .htaccess.

Protecciones: origen permitido, tamaño máximo 32 KiB, entradas escalares UTF-8,
servicios admitidos, validación de email, escape del contenido, honeypot y tiempo mínimo.
El origen y el tiempo del cliente no autentican a una persona ni detienen por sí solos a un bot.
El límite del servidor admite 5 solicitudes válidas por IP y 50 totales en 10 minutos.
Usa un archivo acotado y bloqueo; si falla el almacenamiento, no intenta enviar.
Los errores internos no se muestran al visitante ni incluyen datos personales en el registro.

## Seguridad y rendimiento

- HTTPS, HSTS, protección contra enmarcado, MIME sniffing y permisos innecesarios.
- CSP por hashes para scripts inline; sin unsafe-eval. Los estilos inline siguen permitidos
  porque la interfaz los utiliza. La protección frame-ancestors requiere cabecera HTTP.
- Dependencias fijadas y auditadas en cada publicación; Dependabot propone actualizaciones.
- fflate 0.7.5 está fijado mediante override para corregir el aviso de la cadena de satori.
- Fuentes locales, imágenes con dimensiones y carga diferida, caché y compresión en Apache.
- Canvas detenido fuera de pantalla o con la pestaña oculta; video pausado en segundo plano,
  con movimiento reducido o ahorro de datos. Scroll táctil nativo y preferencias de accesibilidad.

Una auditoría limpia refleja las vulnerabilidades conocidas en ese momento, no garantiza
ausencia de fallos. Repetir verificaciones tras actualizar y revisar avisos de dependencias.
Mesi administra PHP, Apache, sistema operativo, disponibilidad y copias del hosting.
El portal Factulinc está fuera de este repositorio y de esta auditoría.
No ejecutar pruebas reales de correo sin autorización.