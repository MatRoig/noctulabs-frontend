# 🦉 Análisis del Proyecto Noctulabs Frontend

**Fecha del análisis:** 10 de junio de 2026, 00:00 UTC-3

---

## 1. Información General

| Campo | Valor |
|---|---|
| Nombre | `noctulabs-frontend` |
| Versión | `0.0.0` (privado) |
| Tipo de módulo | ESM (`"type": "module"` en package.json) |
| Framework | **Vite + React 19** (NO es Next.js) |
| Lenguaje | JavaScript puro con JSX (sin TypeScript) |
| Pruebas | Ninguna |
| Router | Ninguno (SPA con navegación por anclas HTML `#inicio`, `#servicios`, etc.) |
| Package Manager | **npm** (tiene `package-lock.json`, NO tiene `pnpm-lock.yaml`) |

> **Nota sobre el package manager:** En `docs/fase-1-migracion-pnpm.md` hay documentación sobre una migración planeada de npm a pnpm, pero nunca se ejecutó. El proyecto sigue usando npm actualmente.

---

## 2. Stack Tecnológico (explicado para principiantes)

| Tecnología | Versión | ¿Qué es? |
|---|---|---|
| **Vite** | ^8.0.12 | Herramienta que "empaqueta" tu código y crea un servidor de desarrollo ultrarrápido. Reemplaza a Webpack/CRA. |
| **React** | ^19.2.6 | Librería para construir interfaces con componentes reutilizables (como piezas de Lego). |
| **React DOM** | ^19.2.6 | Puente entre React y el navegador (se encarga de renderizar en el DOM). |
| **JavaScript (JSX)** | — | El proyecto usa JavaScript, NO TypeScript. JSX es la sintaxis que mezcla HTML con JavaScript. |
| **Tailwind CSS** | ^3.4.19 | Framework de CSS utilitario. En vez de escribir CSS aparte, pones clases directo en el HTML/JSX: `className="bg-black text-white p-4"` |
| **Framer Motion** | ^12.40.0 | Librería para hacer animaciones declarativas en React (aparecer, moverse, desvanecerse). |
| **Swiper** | ^12.2.0 | Carrusel táctil para deslizar proyectos/inágenes. |
| **Lucide React** | ^1.17.0 | Paquete de íconos SVG (flechas, menú hamburguesa, target, etc.). |
| **ESLint** | ^10.3.0 | "Corrector ortográfico" del código. Encuentra errores y malas prácticas. |
| **PostCSS** | ^8.5.15 | Procesador de CSS. Necesario para que Tailwind funcione. |
| **Autoprefixer** | ^10.5.0 | Agrega prefijos automáticos a CSS (`-webkit-`, `-moz-`, etc.) para compatibilidad entre navegadores. |

### Dependencias de producción

```json
"dependencies": {
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "framer-motion": "^12.40.0",
  "lucide-react": "^1.17.0",
  "swiper": "^12.2.0",
  "lodash": "^4.18.1"
}
```

### Dependencias de desarrollo

```json
"devDependencies": {
  "vite": "^8.0.12",
  "@vitejs/plugin-react": "^6.0.1",
  "tailwindcss": "^3.4.19",
  "postcss": "^8.5.15",
  "autoprefixer": "^10.5.0",
  "eslint": "^10.3.0",
  "@eslint/js": "^10.0.1",
  "eslint-plugin-react-hooks": "^7.1.1",
  "eslint-plugin-react-refresh": "^0.5.2",
  "globals": "^17.6.0",
  "@types/react": "^19.2.14",
  "@types/react-dom": "^19.2.3"
}
```

---

## 3. Estructura de Directorios

```
noctulabs-frontend/
├── .env                          # Variables de entorno (API URL, llaves de pago)
├── .gitignore                    # Archivos que Git ignora
├── .idea/                        # Configuración del IDE (WebStorm/IntelliJ)
├── docs/
│   ├── analisis-proyecto.md      ← Este archivo
│   ├── fase-1-migracion-pnpm.md  # Documentación de migración npm → pnpm
│   └── fase-2-refactor-componentes.md  # Documentación de refactor a componentes
├── eslint.config.js              # Configuración de ESLint (formato "flat config")
├── index.html                    # Punto de entrada HTML (carga React)
├── package.json                  # Descripción del proyecto y dependencias
├── package-lock.json             # Lockfile de npm (versiones exactas)
├── postcss.config.js             # Configuración de PostCSS
├── public/                       # Archivos estáticos (imágenes, favicon)
│   ├── buho-hero.png.jpeg
│   ├── favicon.svg
│   ├── icons.svg
│   ├── logo-noctulabs.png.jpeg
│   ├── MFR.png
│   └── team/                     # Fotos del equipo (6 miembros)
├── README.md
├── src/
│   ├── main.jsx                  # Punto de entrada de React
│   ├── App.jsx                   # Componente raíz (orquestador)
│   ├── index.css                 # Estilos globales + Tailwind + animaciones
│   ├── assets/                   # Imágenes usadas por componentes
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/               # Todos los componentes de la UI
│   │   ├── Calculator.jsx        # Simulador de presupuesto
│   │   ├── ContactForm.jsx       # Formulario de contacto
│   │   ├── Footer.jsx            # Pie de página
│   │   ├── Hero.jsx              # Sección principal de bienvenida
│   │   ├── Navbar.jsx            # Barra de navegación + selector de idioma
│   │   ├── ParticlesBackground.jsx  # Fondo de partículas animadas
│   │   ├── Projects.jsx          # Carrusel de proyectos
│   │   ├── Services.jsx          # Grid de servicios + flujo de trabajo
│   │   ├── TeamSection.jsx       # Historia, misión, visión y equipo
│   │   └── Terminal.jsx          # Terminal interactiva + juego Snake
│   └── hooks/
│       └── useTranslation.js     # Hook personalizado de i18n (ES/EN)
├── tailwind.config.js            # Configuración personalizada de Tailwind
└── vite.config.js                # Configuración de Vite
```

---

## 4. Arquitectura de la Aplicación

### 4.1 Flujo de ejecución

```
index.html
  └── src/main.jsx  (createRoot + StrictMode)
       └── src/App.jsx  (Componente raíz)
            ├── ParticlesBackground      ← Fondo animado de partículas
            ├── Loading Curtain          ← Cortina de carga (1200ms)
            ├── Navbar                   ← Barra de navegación
            └── <main>
                 ├── Hero                ← Bienvenida
                 ├── Services            ← Servicios
                 ├── Projects            ← Portafolio
                 ├── Calculator          ← Simulador presupuesto
                 ├── TeamSection         ← Equipo
                 └── ContactForm         ← Contacto
            ├── Footer                   ← Pie de página
            └── Terminal                 ← Terminal flotante (esquina)
```

### 4.2 Manejo de estado

- **No hay estado global** (ni Context API, ni Redux, ni Zustand).
- El idioma (`lang`) y traducciones (`t`) se pasan como **props** desde `App.jsx` a cada componente hijo.
- Los estados locales se manejan con `useState` y `useEffect` dentro de cada componente.

### 4.3 Sistema de i18n (idiomas)

- Implementado con un hook personalizado en `src/hooks/useTranslation.js`.
- **Idiomas:** español (`es`, predeterminado) e inglés (`en`).
- **Uso:** `const { t, lang, setLang } = useTranslation()` — `t` es un objeto con todo el texto traducido.
- Traducciones organizadas por sección: `nav`, `hero`, `services`, `projects`, `calc`, `about`, `contact`, `terminal`.

### 4.4 Navegación (sin router)

No hay React Router. La navegación usa:
- **Anclas HTML:** Cada sección tiene un `id` (ej: `id="servicios"`).
- **Links:** `<a href="#servicios">` en el Navbar.
- **CSS:** `scroll-behavior: smooth` para desplazamiento suave.
- **Compensación:** `scroll-mt-32` para que el navbar sticky no tape el título de la sección.

---

## 5. Resumen de Componentes

| Componente | Líneas | ¿Qué hace? |
|---|---|---|
| `ParticlesBackground.jsx` | 37 | Fondo con 45 partículas moradas que se conectan con líneas (Canvas API). |
| `Navbar.jsx` | 83 | Barra sticky con links, logo, selector ES/EN, menú hamburguesa en mobile. |
| `Hero.jsx` | 61 | Título principal con gradiente animado, imagen de búho flotante, CTA. |
| `Services.jsx` | 102 | Grid de 4 servicios + 4 pasos del flujo de trabajo con hover effects. |
| `Projects.jsx` | 102 | Carrusel Swiper con proyectos (1 real + 2 Coming Soon). |
| `Calculator.jsx` | 88 | Simulador de presupuesto: tipo de proyecto + módulos extras. |
| `TeamSection.jsx` | 90 | Historia del equipo, misión/visión, grid de 6 miembros. |
| `ContactForm.jsx` | 56 | Formulario de contacto (solo visual — no envía datos). |
| `Footer.jsx` | 25 | Logo, copyright con año dinámico. |
| `Terminal.jsx` | 404 | Terminal interactiva (comandos: help, team, clear, secret, snake, exit) + juego Snake completo en Canvas. |
| **App.jsx** | 66 | Orquestador: llama a todos los componentes y maneja loading inicial. |

---

## 6. Configuración de Tailwind (tema personalizado)

### Colores

| Clase CSS | Color | Hex |
|---|---|---|
| `noct-bg` | Fondo principal | `#060413` |
| `noct-card` | Fondo de tarjetas | `#0c0926` |
| `noct-border` | Bordes | `#1b1440` |
| `noct-purple` | Morado principal | `#7b2cbf` |
| `noct-neon` | Morado neón (hover) | `#9d4edd` |

### Fuentes

| Fuente | Uso |
|---|---|
| `Syne` | Títulos grandes (extra bold, uppercase) |
| `Inter` | Texto del cuerpo |
| `Space Grotesk` | Subtítulos / mono |
| `JetBrains Mono` | Código |
| `Oswald` | Display |
| `Fraunces` | Editorial |

### Animaciones personalizadas

- `gradient-x`: Degradado animado horizontal (usado en la palabra "duermes"/"sleep" del Hero).
- `fade-in-up`: Aparece desde abajo con opacidad.
- `animate-owl-drop`: Caída con rebote del logo en la cortina de carga.

---

## 7. ⚠️ Problemas y Conflictos Identificados

### 🔴 CRÍTICOS

| # | Problema | Explicación |
|---|---|---|
| 1 | **El formulario de contacto no funciona** | Tiene inputs y botón submit, pero no hay `onSubmit`. Si alguien hace clic, **no pasa nada**. Es solo maqueta visual. |
| 2 | **Variables de entorno sin usar** | `.env` tiene `VITE_API_BASE_URL` y `VITE_PASARELA_PAGO_KEY`, pero ningún componente las lee. |
| 3 | **Sin manejo de errores** | Si en el futuro conectan una API y falla, la app se rompe. No hay `try/catch` ni estados de error en ningún componente. |

### 🟡 IMPORTANTES

| # | Problema | Explicación |
|---|---|---|
| 4 | **`lodash` instalado pero no se usa** | Está en `package.json` como dependencia pero ningún componente hace `import` de lodash. Ocupa espacio innecesario. |
| 5 | **Sin TypeScript** | Todo es JavaScript. TypeScript previene errores como pasar un número donde va un texto. Para principiantes está bien JS, a futuro conviene migrar. |
| 6 | **Sin pruebas (tests)** | No hay ni un solo test. Si alguien modifica algo, no hay forma automática de saber si rompió otra cosa. |
| 7 | **Sin estado global** | El idioma se pasa como prop de componente en componente. Si la app crece, se vuelve difícil de mantener. |
| 8 | **npm en lugar de pnpm** | npm tiene más vulnerabilidades reportadas y es más lento que pnpm. Hay un documento de migración (`docs/fase-1-migracion-pnpm.md`) que nunca se ejecutó. |

### 🟢 MENORES / A MEJORAR

| # | Problema | Explicación |
|---|---|---|
| 9 | **Terminal mezcla 2 componentes** | `Terminal.jsx` (404 líneas) contiene tanto la terminal como el juego Snake en el mismo archivo. Deberían estar separados. |
| 10 | **Sin React Router** | Las anclas funcionan para una landing page, pero si el proyecto creciera necesitarían rutas de verdad. |
| 11 | **Clases CSS sin usar** | En `index.css` hay clases `reveal` y `shine` definidas pero ningún componente las utiliza. |
| 12 | **Imágenes no optimizadas** | Las imágenes en `public/` son PNG/JPEG. Para web conviene WebP o AVIF (pesan menos, cargan más rápido). |
| 13 | **Duplicación de proyectos en Swiper** | En `Projects.jsx` duplican el array `[...projects, ...projects]` para que el loop funcione. Es un workaround, no la forma ideal. |

---

## 8. 📖 Conceptos Clave Explicados

### SPA (Single Page Application)
Aplicación de **una sola página**. No recarga al navegar: todo el contenido ya está cargado y solo se muestra/oculta. Ejemplos: Gmail, Twitter, la app de Noctulabs.

### Vite
Herramienta moderna que reemplaza a "Create React App". Lee tu código, lo transforma para el navegador y lo sirve al instante. Se llama **bundler** o **empaquetador**.

### Props
Datos que un componente padre le pasa a un componente hijo.
```jsx
<Navbar t={traducciones} lang="es" setLang={cambiarIdioma} />
```
`t`, `lang` y `setLang` son props.

### Tailwind CSS
Framework que te permite escribir CSS directamente en el JSX usando clases predefinidas:
```jsx
<div className="bg-noct-bg text-white p-4 rounded-lg">
```
Sin Tailwind tendrías que crear un archivo CSS aparte con `.mi-clase { background: #060413; ... }`.

### Lockfile (`package-lock.json`)
Archivo que **congela las versiones exactas** de cada dependencia. Garantiza que todos los desarrolladores tengan las mismas versiones instaladas.

### Dependencia vs DevDependency
- **Dependencia:** Necesaria para que la app funcione en producción (React, Framer Motion).
- **DevDependency:** Solo necesaria en desarrollo (ESLint, Tailwind, Vite).

### ESLint
"Corrector ortográfico" del código. Te marca errores de sintaxis, variables sin usar, malas prácticas.

### npm vs pnpm
- **npm:** Package manager oficial de Node.js. Más lento, menos seguro.
- **pnpm:** Alternativa más rápida y segura. Usa hard links para no duplicar paquetes.
- El proyecto usa **npm** actualmente, aunque hay documentación para migrar a pnpm.

### JSX
Extensión de JavaScript que parece HTML. React la usa para describir qué debe renderizar:
```jsx
const titulo = <h1>Hola Mundo</h1>;
```
El navegador no entiende JSX directamente — Vite lo transforma a JavaScript normal.

### Canvas API
API del navegador para dibujar gráficos 2D/3D con JavaScript. Se usa en `ParticlesBackground.jsx` y `Terminal.jsx` (juego Snake) sin necesidad de librerías externas.

### i18n (Internacionalización)
Capacidad de mostrar la app en múltiples idiomas. En este proyecto se implementó con un hook personalizado (`useTranslation.js`) en lugar de usar una librería como `react-i18next`.

---

## 9. Conclusión y Recomendaciones

### Estado general
El proyecto es una **landing page bien construida para ser de un equipo principiante**. Se nota que aprendieron React sobre la marcha y documentaron el proceso. La app se ve bien visualmente gracias a Tailwind y Framer Motion.

### Prioridades para mejorar

1. **Hacer funcionar el formulario de contacto** — es lo primero que un visitante intentaría usar.
2. **Migrar a pnpm** — ya tienen la guía lista en `docs/fase-1-migracion-pnpm.md`.
3. **Conectar la API real** o limpiar las variables de entorno que no se usan.

### Ruta de aprendizaje sugerida

| Paso | ¿Qué aprenderías? |
|---|---|
| 1. Hacer funcionar el formulario | Fetch API, manejo de formularios, estados de carga/error |
| 2. Agregar TypeScript a un componente | Tipado básico, interfaces, beneficios del tipado estático |
| 3. Migrar a pnpm | Diferencia entre package managers, lockfiles, hard links |
| 4. Agregar tests | Jest, Vitest, React Testing Library |
| 5. Reemplazar lodash | Código nativo moderno, bundle size |
| 6. Separar Terminal en 2 componentes | Deuda técnica, mantenibilidad |
| 7. Agregar React Router | Enrutamiento SPA, navegación declarativa |

---

*Documento generado automáticamente con análisis del código fuente.*
