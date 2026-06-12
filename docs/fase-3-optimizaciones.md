# Fase 3: Optimizaciones y Refactor

## Resumen

Se implementaron **14 mejoras** en 4 fases para optimizar rendimiento, accesibilidad, y calidad de código del frontend de Noctulabs.

---

## Fase 1 - Código Crítico

### 1.1 Bug de timers en App.jsx
- **Archivo:** `src/App.jsx`
- **Problema:** Los `setTimeout` anidados no se limpiaban correctamente si el componente se desmontaba.
- **Solución:** Se movió el segundo timer a una variable en el scope externo y se limpian ambos en el `return` del `useEffect`.

### 1.2 Etiquetas `<label>` en formulario
- **Archivo:** `src/components/ContactForm.jsx`
- **Problema:** Los campos del formulario no tenían etiquetas asociadas, solo placeholders.
- **Solución:** Se agregaron `<label htmlFor="...">` con clase `sr-only` para cada campo (name, email, company, social, message), visibles solo para lectores de pantalla.

### 1.3 Validación de variables de entorno
- **Archivo:** `src/components/ContactForm.jsx`
- **Problema:** Si faltaban las variables de entorno de EmailJS, la app fallaba sin mensaje claro.
- **Solución:** Se valida que `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y `VITE_EMAILJS_PUBLIC_KEY` existan antes de enviar.

### 1.4 Atributo `lang` dinámico
- **Archivo:** `src/App.jsx`
- **Problema:** El `<html lang="es">` permanecía fijo aunque el usuario cambiara a inglés.
- **Solución:** Se agregó un `useEffect` que actualiza `document.documentElement.lang` al cambiar de idioma.

---

## Fase 2 - Rendimiento

### 2.1 React.lazy() + Suspense
- **Archivo:** `src/App.jsx`
- **Problema:** Todos los componentes se cargaban en el bundle inicial (453 KB).
- **Solución:** Se movieron 6 componentes a carga diferida: `Projects`, `Calculator`, `TeamSection`, `ContactForm`, `Footer`, `Terminal`.
- **Resultado:** Bundle inicial reducido de **453 KB a 337 KB** (-25%). El resto se carga bajo demanda.

### 2.2 Eliminar dependencias TypeScript
- **Archivos:** `package.json`, `package-lock.json`
- **Problema:** `@types/react` y `@types/react-dom` estaban instalados pero el proyecto es JavaScript puro.
- **Solución:** `npm uninstall @types/react @types/react-dom`

### 2.3 Eliminar assets huérfanos
- **Archivos eliminados:** `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`
- **Problema:** Archivos sin referencia en ningún componente.

---

## Fase 3 - Fuentes

### 3.1 Consolidar carga de Google Fonts
- **Archivos:** `src/index.css`, `index.html`, `tailwind.config.js`
- **Problema:** Las fuentes se cargaban por duplicado (vía `@import` en CSS y vía `<link>` en HTML). Había 6 familias tipográficas, varias sin uso.
- **Solución:**
  - Eliminados `@import` de Google Fonts en CSS (ahora solo vía `<link>`)
  - Reducido de 6 fuentes a 3: **Inter** (400,500,600), **Syne** (700,800), **Space Grotesk** (400,600)
  - Eliminadas: Fraunces (no usada), JetBrains Mono (solo ErrorBoundary), Oswald (solo ErrorBoundary), Inter weight 300
  - Limpiado `tailwind.config.js` (solo 3 familias en `fontFamily`)
  - ErrorBoundary actualizado a `font-syne` y `font-space`

### 3.2 Favicon SVG
- **Archivo:** `index.html`
- **Cambio:** `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
- **Motivo:** `favicon.svg` ya existía en `public/` y pesa mucho menos que el logo JPEG (2.1 MB).

---

## Fase 4 - Calidad de Código

### 4.1 Reemplazar `key={i}`
- **Archivos:** `Services.jsx`, `TeamSection.jsx`, `Terminal.jsx`
- **Problema:** Uso del índice de array como `key` en React (anti-patrón).
- **Solución:** Se agregaron IDs únicos a cada elemento de lista.

### 4.2 Componente LangToggle
- **Archivo nuevo:** `src/components/LangToggle.jsx`
- **Archivo modificado:** `Navbar.jsx`
- **Problema:** El selector ES/EN estaba duplicado (desktop y mobile).
- **Solución:** Se extrajo a un componente reutilizable y se usó en ambos lugares.

### 4.3 Eliminar CSS muerto
- **Archivos:** `src/index.css`, `tailwind.config.js`
- **Eliminado:** `.glow-purple`, `.reveal`, `.reveal.active`, `.curtain-panel`, `gradient-x`, `fade-in-up`
- **Motivo:** Clases CSS y animaciones de Tailwind no referenciadas en ningún componente.

### 4.4 Separar traducciones a JSON
- **Archivos:** `src/i18n/es.json`, `src/i18n/en.json`, `src/hooks/useTranslation.js`
- **Problema:** Todo el sistema de traducciones (ES + EN) estaba en un solo objeto JavaScript de 94 líneas en `useTranslation.js`.
- **Solución:** Se movieron las traducciones a archivos JSON separados. El hook se redujo de 108 a 15 líneas.

### 4.5 loading="lazy"
- **Archivos:** `TeamSection.jsx`, `Projects.jsx`
- **Solución:** Se agregó `loading="lazy"` a las imágenes del equipo y proyectos.

---

## Archivos modificados/creados

### Modificados (18)
- `index.html`, `package.json`, `package-lock.json`
- `src/App.jsx`, `src/main.jsx`
- `src/components/ContactForm.jsx`, `src/components/Navbar.jsx`
- `src/components/Projects.jsx`, `src/components/Services.jsx`
- `src/components/TeamSection.jsx`, `src/components/Terminal.jsx`
- `src/components/ErrorBoundary.jsx`
- `src/hooks/useTranslation.js`, `src/index.css`
- `tailwind.config.js`

### Creados (4)
- `src/i18n/es.json`
- `src/i18n/en.json`
- `src/components/LangToggle.jsx`

### Eliminados (4)
- `src/assets/hero.png`
- `src/assets/react.svg`
- `src/assets/vite.svg`
- `public/icons.svg`
