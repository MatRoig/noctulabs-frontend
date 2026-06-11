# Conexión del formulario de contacto con EmailJS

**Fecha:** 10 de junio de 2026

---

## ¿Qué es EmailJS?

Es un servicio que permite enviar emails directamente desde JavaScript del frontend, sin necesidad de tener un backend propio. Tiene un plan gratuito de 200 emails/mes.

Alternativas similares: Formspree, Web3Forms, Getform.

---

## ¿Por qué EmailJS y no un backend propio?

- El proyecto aún no tiene backend operativo (la API en `VITE_API_BASE_URL` no está implementada).
- EmailJS elimina la necesidad de montar un servidor solo para el formulario de contacto.
- La configuración es mínima: 3 claves y una librería.

---

## Configuración previa (en EmailJS)

1. Crear cuenta en [emailjs.com](https://www.emailjs.com).
2. Conectar un servicio de correo (Gmail, Outlook, SMTP propio, etc.).
3. Crear una plantilla (template) con las variables que recibirá el formulario:
   - `{{name}}`
   - `{{email}}`
   - `{{company}}`
   - `{{social}}`
   - `{{message}}`

---

## Archivos modificados

### `.env` — 3 variables nuevas

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxx
```

> **Importante:** `.env` fue agregado a `.gitignore` para no exponer las claves en el repositorio.

### `package.json` — 1 dependencia nueva

```json
"dependencies": {
  "@emailjs/browser": "^4.x.x"
}
```

### `src/hooks/useTranslation.js` — +4 campos en cada idioma

**Español:**
```js
sending: 'Enviando mensaje...',
sent: '¡Mensaje enviado con éxito! Te responderemos pronto.',
error: 'Error al enviar. Intenta de nuevo.',
social: 'Link a tu RRSS (opcional)'
```

**Inglés:**
```js
sending: 'Sending message...',
sent: 'Message sent successfully! We will get back to you soon.',
error: 'Error sending. Please try again.',
social: 'Social media link (optional)'
```

### `src/components/ContactForm.jsx` — Refactor completo

#### Cambios principales:

1. **Imports nuevos:**
   ```js
   import { useState } from "react";
   import emailjs from "@emailjs/browser";
   ```

2. **Estados del formulario:**
   - `formData` — objeto con los 5 campos (`name`, `email`, `company`, `social`, `message`).
   - `sending` — bool para deshabilitar el botón y mostrar "Enviando...".
   - `sent` — bool para mostrar mensaje de éxito.
   - `error` — bool para mostrar mensaje de error.

3. **`handleChange`** — función genérica que actualiza `formData` según el `name` del input.

4. **`handleSubmit`** — función asíncrona que:
   - Previene el comportamiento por defecto del formulario.
   - Llama a `emailjs.send()` con las 3 claves de entorno y los datos del formulario.
   - En éxito: muestra mensaje verde y limpia el formulario.
   - En error: muestra mensaje rojo.
   - Finalmente: quita el estado `sending`.

5. **Campo nuevo "RRSS":**
   ```jsx
   <input
     type="text"
     name="social"
     value={formData.social}
     onChange={handleChange}
     placeholder={t.contact.social}
   />
   ```
   Se coloca entre `company` y `message`. Es opcional. Su propósito es que el equipo de Noctulabs pueda ver el producto/servicio del cliente directamente desde su red social principal.

6. **Feedback visual** (entre el textarea y el botón):
   ```jsx
   {sent && <p className="text-green-400 ...">{t.contact.sent}</p>}
   {error && <p className="text-red-400 ...">{t.contact.error}</p>}
   ```

7. **Botón con estado:**
   - Muestra `t.contact.sending` mientras envía.
   - Se deshabilita (`disabled`) para evitar doble envío.
   - Opacidad reducida y cursor not-allowed cuando está deshabilitado.

---

## Flujo de datos

```
Usuario llena el formulario
       ↓
handleSubmit(e) → e.preventDefault()
       ↓
Sending = true
       ↓
emailjs.send(serviceId, templateId, datos, publicKey)
       ↓
   ┌─── éxito ──→ sent = true → limpia formData
   └─── error ──→ error = true
       ↓
Sending = false
       ↓
Feedback visible para el usuario
```

---

## Buenas prácticas aplicadas

| Práctica | Cómo se aplicó |
|---|---|
| No exponer claves en el repo | `.env` en `.gitignore`, uso de `import.meta.env` |
| Prevenir doble envío | Botón `disabled={sending}` |
| Feedback al usuario | Estados `sent` (verde) y `error` (rojo) |
| Limpiar formulario tras éxito | `setFormData` con valores vacíos |
| Mantener i18n | Nuevos textos en ES y EN |
| Sin dependencias innecesarias | Solo se agregó `@emailjs/browser` |

---

## Cómo verificar que funciona

1. Iniciar el servidor: `npm run dev`
2. Ir a la sección de contacto en el navegador.
3. Llenar los campos y enviar.
4. Revisar la bandeja de entrada configurada en EmailJS.

---

## Posibles errores y soluciones

| Error | Causa | Solución |
|---|---|---|
| `403` o `Unauthorized` | Public Key incorrecta | Verificar `VITE_EMAILJS_PUBLIC_KEY` |
| `Template not found` | Template ID incorrecto | Verificar `VITE_EMAILJS_TEMPLATE_ID` |
| No llega el email | Service ID incorrecto o servicio no conectado | Verificar `VITE_EMAILJS_SERVICE_ID` y el servicio en EmailJS |
| No se envía pero no hay error | Las variables en el template no coinciden con las del código | Revisar que el template espere `{{name}}`, `{{email}}`, `{{company}}`, `{{social}}`, `{{message}}` |
