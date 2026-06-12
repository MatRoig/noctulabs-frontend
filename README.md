# 🦉 Noctulabs — Digital Solutions

Landing page oficial de **Noctulabs**, estudio de desarrollo web especializado en pymes. Construida con React + Vite.

## Stack

| Tecnología | Versión |
|---|---|
| Vite | ^8.0.12 |
| React | ^19.2.6 |
| Tailwind CSS | ^3.4.19 |
| Framer Motion | ^12.40.0 |
| Swiper | ^12.2.0 |
| Lucide React | ^1.17.0 |
| EmailJS | ^4.4.1 |

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Vista previa del build
npm run lint     # ESLint
```

## Variables de entorno

Crea un archivo `.env` en la raíz con:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxx
```

## Estructura

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Componente raíz
├── index.css                 # Estilos globales + Tailwind
├── hooks/
│   └── useTranslation.js     # i18n español / inglés
└── components/
    ├── Navbar.jsx            # Barra de navegación sticky
    ├── Hero.jsx              # Portada con búho animado
    ├── Services.jsx          # Servicios + flujo de trabajo
    ├── Projects.jsx          # Carrusel de proyectos
    ├── Calculator.jsx        # Simulador de presupuesto
    ├── TeamSection.jsx       # Equipo, misión y visión
    ├── ContactForm.jsx       # Formulario con EmailJS
    ├── Footer.jsx            # Pie de página
    ├── Terminal.jsx          # Terminal interactiva
    ├── SnakeGame.jsx         # Juego Snake en Canvas
    ├── PongGame.jsx          # Juego Pong en Canvas
    └── ParticlesBackground.jsx # Fondo de partículas
```
