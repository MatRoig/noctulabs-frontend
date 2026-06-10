# Fase 2b: Integración de EmailJS en el Formulario de Contacto

## ¿Qué hicimos?

Conectamos el formulario de contacto del frontend con **EmailJS**, un servicio que permite enviar correos electrónicos **directamente desde React**, sin necesidad de un backend.

## ¿Por qué EmailJS y no un backend?

| Opción | Ventajas | Desventajas |
|---|---|---|
| **EmailJS** | 0 backend, 0 servidores, 30 minutos | Dependes de terceros, límite 200 emails/mes (gratis) |
| **Spring Boot API** | Control total, escalable, datos propios | Desarrollo + deploy + mantenimiento |

**Decisión:** Usamos EmailJS ahora para tener el formulario funcional hoy. El backend Spring Boot se desarrollará después como proyecto de aprendizaje aparte.

---

## El código de ContactForm.jsx explicado línea por línea

### 1. Importaciones

```jsx
import { useState } from 'react';
import emailjs from '@emailjs/browser';
```

- **`useState`**: Hook de React que permite tener estado (datos que cambian) en un componente funcional.
- **`emailjs`**: Librería que expone el método `.send()` para enviar emails desde el frontend.

### 2. Estados del componente

```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  company: '',
  message: ''
});
const [sending, setSending] = useState(false);
const [sent, setSent] = useState(false);
```

**Tres estados independientes:**

| Estado | Tipo | ¿Qué guarda? |
|---|---|---|
| `formData` | Objeto | Los valores de los 4 campos del formulario |
| `sending` | Booleano | `true` mientras se envía el email (para deshabilitar botón) |
| `sent` | Booleano | `true` cuando el email se envió con éxito |

**Estado vs Variable normal:**

```jsx
let nombre = 'Juan';       // Variable normal — si cambia, React NO se entera
const [nombre, setNombre] = useState('Juan');  // Estado — si cambia, React RE-RENDERIZA
```

### 3. handleChange — actualizar el estado al escribir

```jsx
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

**¿Qué hace?**

1. `e` es el evento del input (cada vez que escribes una letra).
2. `e.target.name` → el atributo `name` del input (`"name"`, `"email"`, etc.).
3. `e.target.value` → lo que el usuario escribió.
4. `...formData` → copia todo lo que ya había en `formData` (spread operator).
5. `[e.target.name]: e.target.value` → actualiza SOLO el campo que cambió.

**Ejemplo:** Si escribes "a" en el input `name="email"`:
```jsx
// formData antes:
{ name: 'Juan', email: '', company: '', message: '' }

// setFormData hace:
{ name: 'Juan', email: 'a', company: '', message: '' }
//                      ^ solo cambia email, el resto se mantiene
```

**Spread operator (`...`)**: Copia todas las propiedades existentes del objeto. Sin él, se perderían los otros campos.

**Propiedad computada (`[e.target.name]`)**: Los corchetes permiten usar el **valor** de una variable como nombre de propiedad. Sin corchetes sería literal `"e.target.name"` como string.

### 4. handleSubmit — enviar el email

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  setSending(true);

  emailjs.send(
    'service_0k7xjbt',    // Service ID (tu servicio de correo en EmailJS)
    'template_wqr70fq',   // Template ID (la plantilla del correo)
    {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message
    },
    'ATFlcTAe7uju91qPd'   // Public Key (tu clave de API)
  )
  .then(() => {
    setSent(true);
    setFormData({ name: '', email: '', company: '', message: '' });
  })
  .catch((err) => {
    alert('Error al enviar: ' + err.text);
  })
  .finally(() => {
    setSending(false);
  });
};
```

**Flujo de ejecución:**

```
Usuario hace click en "Enviar Mensaje"
  → e.preventDefault()               (evita recargar la página)
  → setSending(true)                  (cambia el botón a "Enviando...")
  → emailjs.send(service, template, data, key)
      → .then()                       (si funciona: muestra éxito, limpia form)
      → .catch()                      (si falla: muestra alerta con error)
      → .finally()                    (siempre: reactiva el botón)
```

**promesas (.then / .catch / .finally):**

```jsx
emailjs.send(...)       // Esto devuelve una Promesa
  .then(() => { ... })  // Se ejecuta SI la promesa se resuelve (éxito)
  .catch(() => { ... }) // Se ejecuta SI la promesa se rechaza (error)
  .finally(() => { ... }) // Se ejecuta SIEMPRE, haya éxito o error
```

Una promesa representa una operación **asíncrona** (que toma tiempo). El código no se detiene a esperar — sigue ejecutándose y cuando la operación termina, se dispara `.then()` o `.catch()`.

### 5. Renderizado condicional

```jsx
if (sent) {
  return (
    <section>...</section>   // Pantalla de "¡Mensaje enviado!"
  );
}

return (
  <section>...</section>     // El formulario normal
);
```

**Renderizado condicional:** React puede devolver distintos JSX según el estado. Si `sent` es `true`, muestra un mensaje de agradecimiento. Si es `false`, muestra el formulario.

### 6. Inputs controlados

```jsx
<input
  name="email"
  value={formData.email}      // ← El valor LO controla React
  onChange={handleChange}     // ← Cada tecla actualiza el estado
  placeholder={t.contact.email}
  required
/>
```

**Input controlado vs no controlado:**

| Tipo | ¿Quién controla el valor? | Código |
|---|---|---|
| **No controlado** | El DOM del navegador | `<input placeholder="Nombre" />` |
| **Controlado** | React (el estado) | `<input value={formData.name} onChange={handleChange} />` |

En un input controlado, React es la **única fuente de verdad**. Lo que se muestra en el input es siempre lo que dice `formData.name`. Cuando escribes, `handleChange` actualiza el estado, y React re-renderiza el input con el nuevo valor.

### 7. Botón con estado disabled

```jsx
<button
  type="submit"
  disabled={sending}
  className="... disabled:opacity-50"
>
  <span>{sending ? 'Enviando...' : t.contact.btn}</span>
  <span>↗</span>
</button>
```

- `disabled={sending}`: mientras `sending` es `true`, el botón no se puede clickear.
- `disabled:opacity-50`: clase de Tailwind que lo vuelve semitransparente cuando está deshabilitado.
- `sending ? 'Enviando...' : t.contact.btn`: operador ternario que cambia el texto del botón.

---

## Resumen de conceptos nuevos

| Concepto | Explicación | Línea en el código |
|---|---|---|
| **useState** | Hook que guarda datos que cambian en el tiempo | `const [x, setX] = useState(valor)` |
| **Spread operator (`...`)** | Copia todas las propiedades de un objeto | `setFormData({ ...formData, ... })` |
| **Propiedad computada (`[ ]`)** | Usa el valor de una variable como nombre de propiedad | `[e.target.name]: e.target.value` |
| **Input controlado** | Input cuyo valor maneja React (no el DOM) | `value={...} onChange={...}` |
| **Promesa** | Operación asíncrona con `.then()` y `.catch()` | `emailjs.send(...).then(...).catch(...)` |
| **Renderizado condicional** | Devolver distinto JSX según el estado | `if (sent) return ...` |
| **Ternario** | If-else en una línea | `sending ? 'Enviando' : 'Enviar'` |
| **Método `.finally()`** | Se ejecuta siempre, haya éxito o error | `.finally(() => setSending(false))` |

---

## Seguridad: ¿La Public Key es sensible?

No. La **Public Key** de EmailJS está diseñada para estar en el frontend. Es como una API key pública. Lo único sensible sería la **Private Key**, que solo está en el dashboard de EmailJS y nunca se expone en el código.

Sin embargo, como buena práctica, las credenciales deberían ir en un archivo `.env`:

```bash
# .env
VITE_EMAILJS_SERVICE_ID=service_0k7xjbt
VITE_EMAILJS_TEMPLATE_ID=template_wqr70fq
VITE_EMAILJS_PUBLIC_KEY=ATFlcTAe7uju91qPd
```

Y en el código:

```jsx
emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  formData,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

Esto se puede hacer más adelante como mejora.

---

## Glosario

| Término | Definición |
|---|---|
| **EmailJS** | Servicio que permite enviar emails desde JavaScript frontend sin backend. |
| **Service ID** | Identificador del servicio de correo conectado (Gmail, Outlook, etc.). |
| **Template ID** | Identificador de la plantilla que define el diseño del correo. |
| **Public Key** | Clave pública de API para autenticar las peticiones desde el frontend. |
| **Estado (state)** | Dato que React observa para re-renderizar cuando cambia. |
| **Input controlado** | Input cuyo valor es manejado por React (usa `value` + `onChange`). |
| **Promesa** | Objeto que representa una operación asíncrona (pendiente, resuelta, rechazada). |
| **Asincronía** | Ejecución que no bloquea el programa mientras espera (ej: llamada a una API). |
| **Callback** | Función que se pasa como argumento para ejecutarse después (.then, .catch). |
| **Spread operator** | `...` — copia propiedades de un objeto o elementos de un array. |
| **Propiedad computada** | `[variable]` — usa el valor de una variable como nombre de propiedad. |
| **Renderizado condicional** | Mostrar diferentes elementos según el estado o las props. |
| **Operador ternario** | `cond ? valor_si_true : valor_si_false` — if/else en expresión. |
| **Re-render** | Cuando React vuelve a ejecutar el componente porque algo cambió (estado, props). |
| **Evento (event)** | Objeto que contiene información sobre lo que ocurrió (click, tecla, submit). |
| **`preventDefault()`** | Método que evita el comportamiento por defecto de un evento. |
| **`disabled`** | Atributo HTML que deshabilita un botón o input. |
| **`required`** | Atributo HTML que obliga a llenar un campo antes de enviar. |
| **Destructuring** | Extraer valores de objetos o arrays en variables: `const { name } = obj`. |
| **`.env`** | Archivo para almacenar variables de entorno (credenciales, configuraciones). |
| **`import.meta.env`** | Objeto de Vite para acceder a variables de entorno en el código. |
