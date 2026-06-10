# Fase 2: Refactorización del Monolito a Componentes

## ¿Qué hicimos?

Transformamos un solo archivo `App.jsx` de **368 líneas** en una estructura modular de **10 componentes** + **1 hook personalizado**, logrando un `App.jsx` final de solo **92 líneas**.

## El problema inicial (Monolito)

```jsx
// Antes: App.jsx con 368 líneas TODO junto
function App() {
  // Estados
  // Funciones
  // useEffect de partículas
  // useEffect de cortina
  // Lógica de terminal
  // JSX de Navbar
  // JSX de Hero
  // JSX de Servicios
  // JSX de Proyectos
  // JSX de Calculadora
  // JSX de Equipo
  // JSX de Contacto
  // JSX de Footer
  // JSX de Terminal
  return (...);
}
```

**Problemas:**
- Difícil de leer y mantener
- Varias personas no pueden trabajar al mismo tiempo
- Mezcla lógica (JavaScript) con presentación (JSX)
- Si algo se rompe, cuesta encontrar dónde

## La solución (Componentes)

```jsx
// Después: App.jsx organizado
function App() {
  const { t, lang, setLang } = useTranslation();
  const [loading, setLoading] = useState(true);
  ...
  return (
    <ParticlesBackground />
    <Navbar t={t} lang={lang} setLang={setLang} />
    <Hero t={t} />
    <Services t={t} />
    <Projects t={t} lang={lang} />
    <Calculator t={t} />
    <TeamSection t={t} />
    <ContactForm t={t} />
    <Footer lang={lang} />
    <Terminal t={t} lang={lang} />
  );
}
```

## Conceptos clave

### 1. Componente

Un **componente** es una función que devuelve JSX (HTML con JavaScript). Cada componente es una pieza independiente y reutilizable.

```jsx
// Footer.jsx — un componente simple
export default function Footer({ lang }) {
  return (
    <footer>
      <p>© 2026 Noctulabs. {lang === 'es' ? 'Texto' : 'Text'}</p>
    </footer>
  );
}
```

### 2. Props

Las **props** son los parámetros que recibe un componente. Se pasan como atributos de HTML pero pueden ser cualquier valor de JavaScript.

```jsx
// Pasar props (en App.jsx)
<Navbar t={t} lang={lang} setLang={setLang} />

// Recibir props (en Navbar.jsx)
export default function Navbar({ t, lang, setLang }) {
  //                          ^ props desestructuradas
}
```

### 3. Hook

Un **hook** es una función especial de React que permite usar estado y otras características de React dentro de componentes funcionales.

**Hooks nativos:** `useState`, `useEffect`
**Hook personalizado:** `useTranslation`

```jsx
// hooks/useTranslation.js — hook personalizado
export default function useTranslation() {
  const [lang, setLang] = useState('es');  // useState: hook nativo
  const t = translations[lang];
  return { t, lang, setLang };
}
```

### 4. Import / Export

- `export default` → hace que un archivo pueda ser importado por otros
- `import X from './ruta'` → trae el componente/hook a otro archivo

```jsx
// Exportar (Footer.jsx)
export default function Footer({ lang }) { ... }

// Importar (App.jsx)
import Footer from './components/Footer';
```

### 5. JSX

JSX es una extensión de JavaScript que permite escribir HTML dentro del código JavaScript. No es HTML real — se transforma a funciones de React antes de ejecutarse.

```jsx
return (
  <div className="contenedor">   {/* className en vez de class */}
    <h1>{titulo}</h1>             {/* {} para expresiones JS */}
  </div>
);
```

## Estructura final del proyecto

```
src/
├── main.jsx                       # Punto de entrada (no se tocó)
├── index.css                      # Estilos globales + animaciones
├── App.jsx                        # Componente principal (92 líneas)
├── components/
│   ├── ParticlesBackground.jsx    # Fondos con partículas animadas
│   ├── Navbar.jsx                 # Barra de navegación + selector idioma
│   ├── Hero.jsx                   # Sección principal con título y CTAs
│   ├── Services.jsx               # Grid de servicios
│   ├── Projects.jsx               # Grid de proyectos destacados
│   ├── Calculator.jsx             # Simulador interactivo de semanas
│   ├── TeamSection.jsx            # Historia del equipo + tarjetas
│   ├── ContactForm.jsx            # Formulario de contacto
│   ├── Footer.jsx                 # Pie de página
│   └── Terminal.jsx               # Terminal flotante interactiva
└── hooks/
    └── useTranslation.js          # Hook de idioma ES/EN
```

## Orden de creación (de más simple a más complejo)

| # | Componente | Props que recibe | Dificultad |
|---|---|---|---|
| 1 | `ParticlesBackground.jsx` | Ninguna | ⭐ |
| 2 | `Footer.jsx` | `lang` | ⭐ |
| 3 | `Terminal.jsx` | `t, lang` | ⭐⭐⭐ |
| 4 | `Navbar.jsx` | `t, lang, setLang` | ⭐⭐ |
| 5 | `Hero.jsx` | `t` | ⭐ |
| 6 | `Services.jsx` | `t` | ⭐ |
| 7 | `Projects.jsx` | `t, lang` | ⭐⭐ |
| 8 | `TeamSection.jsx` | `t` | ⭐⭐ |
| 9 | `ContactForm.jsx` | `t` | ⭐ |
| 10 | `Calculator.jsx` | `t` | ⭐⭐⭐⭐ |
| 11 | `useTranslation.js` | — | ⭐⭐⭐ |

## Errores comunes encontrados (y solución)

### Error 1: JSX fuera del return
```jsx
function App() {
  <Terminal />        // ❌ JSX fuera del return()
  return ( ... );
}
```
✅ Todo JSX debe estar dentro del `return ()`.

### Error 2: String partido en varias líneas
```jsx
const str = '----------------        // ❌ String nunca se cierra
--------------------------------';
```
✅ Cada string en una sola línea, o usar concatenación.

### Error 3: Import faltante
```jsx
<Footer lang={lang} />              // ❌ Footer no importado
import Footer from './components/Footer';  // ✅ Agregar import
```

### Error 4: Tipeo al copiar
```jsx
<div classNam=? "grid...">          // ❌ Signo ? de más
<div className="grid...">           // ✅ className correcto
```

### Error 5: useState sin importar
```jsx
const [loading, setLoading] = useState(true);  // ❌ useState no importado
import { useEffect, useState } from 'react';    // ✅ Importar ambos
```

---

## Glosario Fase 2

| Término | Definición |
|---|---|
| **Componente** | Función que devuelve JSX. Pieza independiente y reutilizable de la UI. |
| **Props** | Parámetros que recibe un componente. Se pasan como atributos. |
| **Hook** | Función especial de React para usar estado, efectos, etc. |
| **useState** | Hook nativo que permite tener estado en un componente funcional. |
| **useEffect** | Hook nativo que ejecuta código cuando el componente se monta o actualiza. |
| **Hook personalizado** | Función que encapsula lógica reutilizable usando hooks nativos. |
| **JSX** | Sintaxis que mezcla JavaScript con HTML. No es HTML real, se transforma a `React.createElement`. |
| **Monolito** | Código concentrado en un solo archivo sin separación de responsabilidades. |
| **Refactorización** | Reestructurar código sin cambiar su comportamiento externo. |
| **Import** | Palabra clave para traer código de otro archivo. |
| **Export default** | Palabra clave para hacer que un archivo pueda ser importado desde otros. |
| **Desestructuración** | Extraer propiedades de un objeto en variables: `const { lang, setLang } = props;` |
| **Arrow function** | `const fn = () => {}`. Forma moderna de escribir funciones en JS. |
| **Template literal** | `` `Hola ${nombre}` ``. String que permite incrustar variables con `${}`. |
| **Ternary operator** | `condicion ? 'valor true' : 'valor false'`. If-else en una línea. |
| **Array.map()** | Método que transforma cada elemento de un array y devuelve un nuevo array. Usado para renderizar listas en React. |
| **Key prop** | Prop especial de React (`key={i}`) necesaria al renderizar listas con `.map()`. |
| **Curtain animation** | Efecto de cortina cinematográfica que se abre al cargar la página. |
| **Canvas** | Elemento HTML para dibujar gráficos con JavaScript (usado en ParticlesBackground). |
| **requestAnimationFrame** | Función del navegador para crear animaciones fluidas (60fps). |
| **className** | En JSX reemplaza al `class` de HTML (porque `class` es palabra reservada en JS). |
| **onClick, onChange, onSubmit** | Eventos en JSX. Van en camelCase y reciben una función. |
| **preventDefault()** | Método que evita el comportamiento por defecto de un evento (ej: recargar página al enviar formulario). |
| **event handler** | Función que se ejecuta cuando ocurre un evento (click, submit, etc.). |
| **CSS-in-JS** | Escribir estilos directamente en el JSX (ej: `style={{ width: '50%' }}`). Tailwind usa este enfoque. |
| **Tailwind CSS** | Framework de CSS que usa clases utilitarias en lugar de escribir CSS manual. |
| **Build** | Proceso que transforma el código de desarrollo en archivos optimizados para producción. |
| **Vite** | Build tool que empaqueta el proyecto. Mucho más rápido que Webpack. |
| **Hot Module Replacement (HMR)** | Recarga solo el componente que cambió sin recargar toda la página. |
| **StrictMode** | Componente de React que detecta problemas potenciales en desarrollo. |
| **Error boundary** | Límite de error en React. Un error en un componente no debería romper toda la app. |
| **Runtime error** | Error que ocurre mientras la aplicación se ejecuta (a diferencia de compile-time). |
| **Compile-time error** | Error detectado al compilar/buildear, antes de ejecutar. |
| **Parse error** | Error de sintaxis: el código no se puede interpretar (ej: string sin cerrar). |
| **Shebang** | `#!/usr/bin/env bash`. Primera línea de un script que indica el intérprete. |
| **Source** | Comando de bash (`source ~/.bashrc`) que ejecuta el archivo en la shell actual. |
| **Hash / Shebang** | `#!` al inicio de scripts. También llamado "hashbang". |
| **Touch** | Comando Linux `touch archivo.jsx` — crea un archivo vacío. |
| **Nano** | Editor de texto en terminal. `nano archivo.jsx` para editar. |
| **Ctrl+Shift+V** | Pegar en terminal Linux (en Windows es Ctrl+V). |
| **Ctrl+X, Y, Enter** | Guardar y salir en Nano. |
