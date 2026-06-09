# Fase 1: Migración de npm a pnpm

## ¿Por qué migrar?

npm (Node Package Manager) tuvo vulnerabilidades de seguridad reportadas. pnpm es un reemplazo directo que ofrece:

- **Más rápido**: instala dependencias en paralelo.
- **Más seguro**: usa un lockfile único (`pnpm-lock.yaml`) y un sistema de dependencias enlazadas que evita conflictos.
- **Más eficiente**: usa hard links para no duplicar paquetes entre proyectos (ahorra espacio en disco).

## Paso a paso

### 1. Verificar el entorno

```bash
node --version   # v24.15.0
npm --version    # 11.12.1
```

### 2. Instalar pnpm

```bash
npm install -g pnpm
pnpm --version
```

Alternativa con corepack (viene con Node 24+):

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### 3. Migrar el proyecto

```bash
# Detener servidor si está corriendo (Ctrl+C)

# Eliminar node_modules y lockfile de npm
rm -rf node_modules package-lock.json

# En Windows CMD (si no funciona rm -rf):
rmdir /s /q node_modules
del package-lock.json

# Si hay archivos bloqueados por Windows:
taskkill /f /im node.exe
# Luego rmdir /s /q node_modules

# Instalar dependencias con pnpm
pnpm install

# Verificar que funciona
pnpm run dev     # Inicia servidor de desarrollo
pnpm run build   # Compila para producción
pnpm run lint    # Verifica código
```

### 4. Configurar Git para saltos de línea

Los archivos presentaban cambios falsos por diferencia de saltos de línea (LF en Linux vs CRLF en Windows).

```bash
git config core.autocrlf input
git checkout .
```

Esto le dice a Git que convierta automáticamente CRLF a LF, manteniendo el working tree limpio.

### 5. Commit y push a GitHub

```bash
# Crear rama
git checkout -b feature/pnpm-migracion

# Agregar archivos
git add pnpm-lock.yaml
git add package-lock.json -u

# Commit
git commit -m "Migrar de npm a pnpm por seguridad"

# Agregar fork como remote
git remote add fork https://github.com/TU_USUARIO/noctulabs-frontend

# Subir
git push fork feature/pnpm-migracion
```

### 6. Crear Pull Request

Desde GitHub:
- Ir a `https://github.com/TU_USUARIO/noctulabs-frontend`
- Click en **Compare & pull request**
- Base: `alonso-v98/noctulabs-frontend:main`
- Compare: `TU_USUARIO/noctulabs-frontend:feature/pnpm-migracion`
- Escribir título y descripción
- Click **Create Pull Request**

O desde terminal con GitHub CLI:

```bash
gh pr create \
  --repo alonso-v98/noctulabs-frontend \
  --base main \
  --head TU_USUARIO/noctulabs-frontend:feature/pnpm-migracion \
  --title "Migrar de npm a pnpm por seguridad" \
  --body "Elimina package-lock.json y agrega pnpm-lock.yaml"
```

---

## Archivos resultantes

| Archivo | Estado | Descripción |
|---|---|---|
| `pnpm-lock.yaml` | ✅ Nuevo | Lockfile de pnpm (reemplaza package-lock.json) |
| `package-lock.json` | ❌ Eliminado | Lockfile de npm (obsoleto) |
| `package.json` | 🔁 Sin cambios | Compatible tanto con npm como pnpm |
| `.gitconfig` | 🔁 Modificado | `autocrlf = input` para normalizar saltos de línea |

---

## Glosario

| Término | Definición |
|---|---|
| **npm** | Node Package Manager. Manejador de paquetes oficial de Node.js. |
| **pnpm** | Performance Node Package Manager. Alternativa más rápida y segura a npm. |
| **Vite** | Bundler/build tool moderna para proyectos frontend (reemplaza Webpack). |
| **Node.js** | Entorno de ejecución de JavaScript del lado del servidor. |
| **WSL** | Windows Subsystem for Linux. Permite ejecutar Linux dentro de Windows. |
| **Dependencia** | Paquete/lib de terceros del que tu proyecto necesita para funcionar. |
| **DevDependency** | Dependencia solo necesaria en desarrollo (no en producción). |
| **package.json** | Archivo que describe el proyecto, sus dependencias, scripts, etc. |
| **Lockfile** | Archivo que "congela" las versiones exactas de cada dependencia (package-lock.json, pnpm-lock.yaml). |
| **node_modules/** | Carpeta donde se instalan físicamente las dependencias. |
| **CRLF** | Carriage Return + Line Feed (`\r\n`). Salto de línea de Windows. |
| **LF** | Line Feed (`\n`). Salto de línea de Linux/Mac. |
| **autocrlf** | Configuración de Git para normalizar automáticamente los saltos de línea. |
| **Commit** | Instantánea de los cambios en el repositorio Git. |
| **Branch (Rama)** | Línea de desarrollo independiente dentro de un repositorio Git. |
| **Remote** | URL de un repositorio remoto (origin, fork, etc.). |
| **origin** | Nombre por defecto del remote principal (el repo original). |
| **Fork** | Copia de un repositorio en tu cuenta de GitHub. |
| **Pull Request (PR)** | Solicitud para fusionar tus cambios en el repositorio original. |
| **GitHub CLI (gh)** | Herramienta de terminal para interactuar con GitHub (PRs, issues, etc.). |
| **Personal Access Token** | Token de seguridad que reemplaza la contraseña para Git por HTTPS. |
| **`rm -rf`** | Comando Linux: remove (borrar) recursive (recursivo) force (forzar). |
| **`rmdir /s /q`** | Comando Windows CMD equivalente a `rm -rf`. |
| **`taskkill /f /im`** | Comando Windows para forzar cierre de un proceso por nombre. |
| **corepack** | Herramienta incluida en Node.js que permite gestionar manejadores de paquetes (npm, pnpm, yarn). |
| **Ctrl+C** | Atajo de teclado para detener un proceso en ejecución en la terminal. |
| **package-lock.json** | Lockfile generado por npm. Contiene las versiones exactas de cada dependencia. |
| **pnpm-lock.yaml** | Lockfile generado por pnpm. Cumple la misma función que package-lock.json. |
| **Hard link** | Mecanismo de sistema de archivos que pnpm usa para no duplicar paquetes. Un mismo archivo físico puede estar "enlazado" en múltiples proyectos. |
| **Staging area** | Área intermedia de Git donde se preparan los archivos antes del commit. `git add` mueve archivos a esta área. |
| **Working tree** | Los archivos actuales en tu disco, antes de ser commiteados. |
| **`git checkout .`** | Restaura todos los archivos del working tree al estado del último commit. |
| **`git stash`** | Guarda temporalmente los cambios sin commitear para limpiar el working tree. |
| **CLI** | Command Line Interface. Programa que se usa escribiendo comandos en terminal. |
| **Bundler** | Herramienta que empaqueta el código del proyecto para producción (Vite, Webpack, etc.). |
| **HMR** | Hot Module Replacement. Recarga solo los módulos que cambian sin recargar toda la página. |
