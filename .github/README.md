# GitHub Actions Setup for GP Inventory

## Configuración de Secrets

Para que los workflows de GitHub Actions funcionen correctamente, necesitas configurar los siguientes secrets en tu repositorio:

### 1. Ir a Settings del repositorio

- Ve a tu repositorio en GitHub
- Click en **Settings** (pestaña)
- En el menú lateral, click en **Secrets and variables** > **Actions**

### 2. Agregar los siguientes secrets:

#### `DOCKER_USERNAME`

- **Nombre**: `DOCKER_USERNAME`
- **Valor**: Tu nombre de usuario de Docker Hub
- **Ejemplo**: `granpaso` o `tu-usuario-dockerhub`

#### `DOCKER_TOKEN`

- **Nombre**: `DOCKER_TOKEN`
- **Valor**: Token de acceso de Docker Hub (NO uses tu contraseña)

### Cómo crear un Docker Hub Access Token:

1. Ve a [Docker Hub](https://hub.docker.com/)
2. Inicia sesión en tu cuenta
3. Click en tu avatar > **Account Settings**
4. Ve a **Security** > **Personal Access Tokens**
5. Click en **Generate New Token**
6. Dale un nombre descriptivo: `github-actions-gp-inventory`
7. Selecciona permisos: **Read, Write, Delete**
8. Click **Generate**
9. **¡IMPORTANTE!** Copia el token inmediatamente (no lo podrás ver después)
10. Pega este token como valor del secret `DOCKER_TOKEN`

## Workflows Creados

### 1. `docker.yml` - Build y Push Simple

- Se ejecuta en push a `main`
- Construye y publica la imagen Docker
- Tags: `latest`, `main-<sha>`

### 2. `ci-cd.yml` - Pipeline Completo

- Se ejecuta en push a `main` y `develop`
- Se ejecuta en pull requests a `main`
- Incluye:
  - Tests de linting
  - Verificación de TypeScript
  - Build de la aplicación
  - Build y push de Docker (solo en main)

## Uso

Una vez configurados los secrets:

1. Haz commit de estos archivos a tu repositorio
2. Haz push a la rama `main`
3. Ve a la pestaña **Actions** en GitHub para ver el progreso
4. La imagen se publicará automáticamente en Docker Hub como:
   - `tu-usuario/gp-inventory:latest`
   - `tu-usuario/gp-inventory:main-<sha>`

## Comandos para usar la imagen

```bash
# Descargar y ejecutar la imagen desde Docker Hub
docker run -d --name gp-inventory -p 8080:80 tu-usuario/gp-inventory:latest

# Acceder a la aplicación
# http://localhost:8080
```

## Notas importantes

- Los workflows están configurados para construir imágenes multi-arquitectura (AMD64 y ARM64)
- Se usa cache de GitHub Actions para acelerar los builds
- Solo se publica a Docker Hub desde la rama `main`
- Los pull requests ejecutan tests pero no publican imágenes
