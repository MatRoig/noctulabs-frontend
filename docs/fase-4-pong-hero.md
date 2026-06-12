# Fase 4: Pong Game y Ajustes Visuales del Hero

## Resumen

Se agregó el juego Pong a la terminal interactiva y se realizaron ajustes de responsividad en el Hero para una experiencia visual consistente en todos los dispositivos.

---

## PongGame

### Nuevo componente
- **Archivo:** `src/components/PongGame.jsx`
- **Comando en terminal:** `pong`
- **Estética:** Misma que SnakeGame (fondo `#020110`, paletas violeta/rojo, pelota blanca)

### Mecánicas
- **Controles:** W/S o ↑↓ para mover la paleta, ESC para salir, Espacio/Enter para iniciar
- **IA:** La CPU sigue la pelota con velocidad reducida (`AI_SPEED = 0.7`) y se re-centra cuando la pelota va hacia el jugador
- **Puntuación:** Primer jugador en llegar a 5 puntos gana
- **Pausa entre puntos:** 800ms de espera tras cada punto, las paletas vuelven al centro
- **Curva de aceleración:** Cada golpe acelera la pelota con factor decreciente (multiplier × `remaining`), tope en 1.2× la velocidad base
- **Ángulo de rebote:** Limitado a ±0.5 de hitPos, con jitter aleatorio de ±0.04 en el centro para evitar rebotes perfectamente horizontales

### Paletas proporcionales
- Las paletas escalan según el tamaño del canvas (`getPaddleH` = 20% de la altura)
- Canvas único en tamaño grande (360×360)

### Archivos modificados
- `src/components/Terminal.jsx` — comando `pong` + import de PongGame
- `src/components/PongGame.jsx` — creación del juego

---

## Hero

### Altura fija
- `min-h-[70vh]` → `h-[70vh]` fijo para que la imagen (absoluta) ocupe siempre el mismo espacio
- `overflow-hidden` movido del header al contenedor de la imagen para no recortar texto

### Opacidad uniforme
- `opacity-40 lg:opacity-100` → `opacity-100` (misma opacidad en todos los dispositivos)

### Zoom gradual con `object-cover`
- `object-contain` → `object-cover` para que al reducir resolución la imagen haga zoom hacia el búho en vez de encogerse
- Anclaje `object-right-top` para que el zoom se enfoque en el búho desde la esquina superior derecha

### Gradiente progresivo
- `w-full lg:w-2/3` → `w-1/3 sm:w-1/2 md:w-2/3`
- A menor resolución, menos gradiente cubre la imagen, dejando ver más del búho

### Tamaño de texto reducido
- `text-[2.5rem] max-sm:text-4xl sm:text-7xl` → `text-2xl sm:text-4xl lg:text-6xl`

### Cambios de idioma consistentes
- Con altura fija (`h-[70vh]`), la imagen no cambia de tamaño al cambiar entre español e inglés

### Archivos modificados
- `src/components/Hero.jsx` — todos los cambios anteriores

---

## Terminal

- Agregado `pong` al menú de ayuda
- Agregado manejador del comando `pong` que activa el modo juego
- Eliminado comando `exit` del menú y del manejador (inconsistente con `gameMode` como string)
- Cambiado texto de comando `secret` a "¡¡¡BUEEEEEEEEEEENOS DÍAS EQUIPOOOOO!!!"

### Archivos modificados
- `src/components/Terminal.jsx`
- `src/i18n/es.json`
- `src/i18n/en.json`

---

## Projects (Carrusel)

- Reemplazados `slideNext()`/`slidePrev()` por `slideToLoop()` con `realIndex` para evitar bugs de Swiper v12 con loop
- Agregado `watchOverflow={false}` para evitar que Swiper bloquee el carrusel
- Agregado `speed={500}` para animación fluida de 500ms
- Eliminado creative effect, se mantiene slide estándar

### Archivos modificados
- `src/components/Projects.jsx`

---

## Services (Flujo de Trabajo)

- Grid cambiado a `sm:grid-cols-2 lg:grid-cols-4` para mejor responsividad
- Títulos responsivos (`text-xs sm:text-sm lg:text-base`) para evitar overflow

### Archivos modificados
- `src/components/Services.jsx`

---

## Archivos modificados/creados

### Creados (1)
- `src/components/PongGame.jsx`

### Modificados (8)
- `src/components/Hero.jsx`
- `src/components/Terminal.jsx`
- `src/components/Projects.jsx`
- `src/components/Services.jsx`
- `src/i18n/es.json`
- `src/i18n/en.json`
- `src/main.jsx`
- `README.md`
