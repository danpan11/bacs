# BACS · Baila Ahora o Calla para Siempre

Web estática en español, adaptable a móvil, tablet y ordenador. Incluye las cinco fotografías originales proporcionadas (copias optimizadas), tres formatos, setlist de ejemplo y solicitud de contratación por WhatsApp/email configurable. No necesita instalación, compilación, servicios de pago ni claves.

## Ver la web

Abre `index.html` con tu navegador. Para una vista previa mediante servidor local, abre una terminal en esta carpeta y ejecuta:

```sh
python3 -m http.server 8080
```

Visita `http://localhost:8080`. Para detener el servidor, pulsa Ctrl+C.

## Publicar gratis desde tu cuenta personal en GitHub Pages

1. Inicia sesión en tu cuenta personal en https://github.com.
2. Pulsa **+ → New repository**. Elige un nombre, por ejemplo `bacs`, selecciona **Public** y crea el repositorio. GitHub Free permite Pages en repositorios públicos.
3. Descomprime el ZIP. En el repositorio, elige **Add file → Upload files** (o **uploading an existing file** en un repositorio vacío).
4. Arrastra **el contenido de la carpeta `bacs`**, incluida la carpeta `assets`, al repositorio. `index.html` debe quedar en la raíz, junto a `styles.css`, `script.js`, `config.js` y `README.md`. No subas el ZIP ni una carpeta `bacs` que englobe todo. Finaliza con **Commit changes**.
5. Incluye también `.nojekyll`. Si el selector oculta este archivo, créalo desde **Add file → Create new file**, con nombre `.nojekyll` y contenido vacío o una línea en blanco.
6. Abre **Settings → Pages**. En **Build and deployment → Source**, selecciona **Deploy from a branch**.
7. Selecciona la rama **main** y la carpeta **/(root)**. Pulsa **Save**.
8. Espera a que termine la publicación. Pages mostrará el enlace; con el nombre de ejemplo será `https://TU_USUARIO.github.io/bacs/`. Sustituye `TU_USUARIO` por tu usuario real. El progreso se puede consultar en **Actions**.

Si quieres usar la dirección raíz `https://TU_USUARIO.github.io/`, el repositorio debe llamarse exactamente `TU_USUARIO.github.io`. Todas las rutas de esta web son relativas y sirven para ambas opciones.

Guía oficial consultada: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Editar sin herramientas adicionales

En GitHub abre un archivo, pulsa el lápiz, realiza el cambio y elige **Commit changes** sobre `main`. GitHub Pages publicará la nueva versión. Si aún ves la anterior, espera a que termine Actions y recarga la página.

| Quiero cambiar… | Archivo |
| --- | --- |
| WhatsApp, email o Spotify | `config.js` |
| Precios, nombres e inclusiones de los planes | `config.js` → `plans` |
| Integrantes, roles, descripciones, fotos o encuadre | `config.js` → `members` |
| Canciones del ejemplo | `config.js` → `exampleSetlist` |
| Presentación, preguntas y respuestas, títulos y textos generales | `index.html` |
| Colores, tipografías, espacios y adaptación a pantallas | `styles.css` |
| Comportamiento de menú y formulario | `script.js` |

Conserva comillas, comas y corchetes al modificar `config.js`. Los textos se insertan de forma segura como texto plano, no como HTML. En `index.html`, actualiza también el resumen de `<noscript>` si cambias los precios o integrantes.

### Contacto y Spotify

WhatsApp, email y Spotify ya están configurados con los datos proporcionados. El número de WhatsApp es también el teléfono de contratación, pero no se imprime en pantalla. Los dos contactos están ofuscados en Base64 dentro de `contactEncoded` y solo se decodifican para preparar el destino de los botones. La web no escribe el teléfono ni la dirección en el contenido visible ni crea enlaces de contacto hasta que se pulsan los botones.

**Esta ofuscación no es cifrado ni privacidad real.** Cualquier persona que inspeccione los archivos públicos puede recuperar los contactos. WhatsApp mostrará el número al abrir el chat y la aplicación de correo mostrará la dirección de destino. Para mantener el email fuera del navegador y del repositorio hace falta un formulario con un servicio externo o un servidor que guarde el destinatario. Esa integración no se ha activado: requiere elegir y configurar un servicio. GitHub Pages por sí solo no procesa correos ni guarda secretos.

Si prefieres editar los contactos directamente, completa estos campos; tienen prioridad sobre `contactEncoded`:

```js
whatsapp: "",
email: "",
```

- `whatsapp`: número real en formato internacional, con prefijo del país y sin espacios ni guiones. Admite un `+` inicial. No escribas una URL; la web genera el enlace.
- `email`: dirección real de contratación.
- `spotify`: URL HTTPS de la playlist oficial en `open.spotify.com`.

Para conservar la ofuscación, deja `whatsapp` y `email` vacíos y sustituye los valores en `contactEncoded` por sus equivalentes Base64. Para desactivar un canal, vacía tanto el campo directo como el codificado. Cada botón se activa únicamente cuando su dato tiene un formato válido. El enlace de Spotify ya apunta a la playlist compartida por el propietario.

El formulario prepara el tipo de evento, la fecha, el lugar, el formato y un mensaje. WhatsApp abre una conversación con el texto preparado; email abre la aplicación de correo con asunto y cuerpo. **El visitante debe enviar el mensaje desde esa aplicación.** La web no envía, almacena ni registra datos y no tiene servidor de formularios. No hay cookies, analítica ni recursos de terceros cargados automáticamente.

### Fotografías

Las fotos están en `assets/`. Para sustituir una foto, conserva el nombre o cambia su ruta en `config.js`. `position` ajusta el encuadre, por ejemplo `"50% 30%"`. La portada usa `assets/escenario-siluetas.png`, la ilustración proporcionada por el propietario; su ruta está en `index.html` y su encuadre en `.hero-art .hero-photo` dentro de `styles.css`. Es una imagen conceptual, no una fotografía de una actuación real de BACS. Wiche mantiene su fotografía en la sección de integrantes. Las copias de Daniel, Tony y Wiche se redujeron a un máximo de 1500 píxeles, manteniendo los archivos de Downloads intactos.

### Cambiar los ejemplos por repertorio real

Las seis canciones se seleccionaron de la playlist **BACS - Propuestas** compartida por el propietario: https://open.spotify.com/playlist/630CMlSmrXhLCmiQPYJFit . Se verificaron sus títulos y artistas en Spotify el 15 de octubre de 2026. El bloque sigue siendo un posible setlist, no una promesa de que esas canciones se interpretarán en todos los eventos. La selección se guarda en `exampleSetlist`; su aviso se establece en `script.js`. No se incluye audio ni se carga el reproductor de Spotify automáticamente.

## Datos que faltan confirmar antes de anunciar contrataciones

- Formación exacta e instrumentos de SOLO, TRIO y BAND. Los tamaños de uno, tres y cinco integrantes están presentados como propuestas, no como compromisos.
- Alcance técnico del sonido y la iluminación por formato, necesidades eléctricas y de espacio, montaje, pases y pausas.
- Condiciones de los precios indicados: impuestos, desplazamientos, área geográfica, horas extra, reserva y cancelación. La web muestra 200 €, 500 € y 900 €; no ha supuesto condiciones comerciales adicionales.
- Repertorio real, canciones solicitables y descripciones de los integrantes si se quieren personalizar.

Estos puntos están señalados junto a los planes y en las preguntas frecuentes para evitar expectativas no confirmadas. Una vez acordados, actualiza las propuestas y las condiciones en la web.

## Accesibilidad y estructura

HTML semántico, idioma español, enlace para saltar al contenido, foco visible, navegación con teclado, menú móvil con estado accesible y cierre con Escape, etiquetas de formulario, fotografías con texto alternativo y respeto de la preferencia de movimiento reducido. Las imágenes de las fichas se cargan de forma diferida. Las tipografías son del sistema y todos los recursos visuales se sirven desde el proyecto.

El archivo `.nojekyll` permite servir los archivos estáticos directamente. No hay dependencias ni pasos de construcción. El proyecto se puede mover o editar sin depender de esta conversación.
