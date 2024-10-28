# Aplicación de Gestión de Contenidos Multimedia - Frontend

Este proyecto constituye el frontend para una aplicación de gestión de contenido multimedia, diseñada para proporcionar acceso a diferentes tipos de usuarios (administradores, creadores y lectores) a una biblioteca multimedia organizada.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **TypeScript**: Superconjunto de JavaScript que permite programación tipada.
- **TailWindCSS**: Diseño y estilización de la interfaz de usuario.
- **Socket.io-client**: Implementación en tiempo real para actualizaciones dinámicas.
- **Deno**: El nuevo TS runtime

## Instalación

### Prerrequisitos

Asegúrate de tener Node.js y npm instalados.

### Pasos de Instalación

1. **Clona el repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. **Instala las dependencias**

   ```bash
   deno install
   ```

3. **Inicia la aplicación**

   ```bash
   deno task dev
   ```

## Funcionalidades Principales

### Vista de Contenidos Disponibles

- Muestra los contenidos multimedia agrupados según su temática y tipo (imágenes, videos y textos).
- Lista la cantidad de contenidos en cada categoría, actualizándolos en tiempo real.

### Buscadores

- **Búsqueda por temática**: Filtra las temáticas disponibles.
- **Búsqueda por nombre de contenido**: Encuentra contenidos específicos por nombre.

### Registro de Usuarios

- Permite a los visitantes registrarse como Lector o Creador.
- Verificación para asegurar que un usuario solo pueda elegir un tipo (Lector o Creador).

### Gestión de Contenido (para Creadores)

- Los creadores pueden agregar contenido multimedia, con categorías y tipos validados (imagen, video o texto).
- Asegura que el contenido agregado esté ordenado cronológicamente y disponible inmediatamente tras guardarlo.

### Actualizaciones en Tiempo Real

Se utilizan sockets para mantener la lista de contenidos actualizada en tiempo real.

**Ejemplo de Configuración de Conexión WebSocket**

```typescript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("newContent", () => {
  console.log("Nuevo contenido creado, actualizando lista...");
  // Actualización dinámica de la lista de contenidos
});
```

## Buenas Prácticas de Código

- **Modularidad**: Componentes reutilizables y diseño limpio del código.
- **Manejo del estado**: Uso adecuado del estado de la aplicación para la gestión de contenidos y usuarios.

## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes sugerencias o mejoras, por favor abre un issue o un pull request en el repositorio.
# multimedia_front
