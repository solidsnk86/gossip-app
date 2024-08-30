# ChismeApp

Bienvenido a **ChismeApp**, una aplicación web desarrollada con **Next.js** y **Supabase** que permite a los usuarios iniciar sesión con GitHub. ChismeApp es una plataforma social en su versión beta, donde puedes compartir y descubrir novedades con tus amigos.

## Descripción

ChismeApp es una red social minimalista en la que los usuarios pueden registrarse usando sus cuentas de GitHub. Esta aplicación está diseñada para ser rápida, segura y fácil de usar, aunque en esta versión beta es posible que encuentres algunos bugs que iremos solucionando con el tiempo.

### Características

- **Inicio de sesión con GitHub**: Conéctate de forma segura usando tu cuenta de GitHub.
- **Perfil de usuario**: Personaliza tu perfil con una imagen de portada, avatar y detalles personales.
- **Publicaciones**: Comparte lo que estás pensando o trabajando.
- **Interfaz intuitiva**: Diseño simple y limpio, optimizado para la mejor experiencia de usuario.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **Supabase**: Backend como servicio que proporciona autenticación, bases de datos y almacenamiento en tiempo real.
- **Tailwind CSS**: Utilizado para diseñar y estilizar la interfaz de usuario de manera eficiente.
- **Lucide-react**: Librería de íconos utilizada en la aplicación.

## Instalación

Sigue estos pasos para configurar ChismeApp localmente:

1. Clona este repositorio:

```bash
   git clone https://github.com/tu-usuario/chismeapp.git
```

2. Navega al directorio del proyecto:

```bash
cd chismeapp
```

3. Instala las dependencias:

```bash
npm install

o

pnpm install
```

4. Configura las variables de entorno:

Crea un archivo .env.local en la raíz del proyecto.
Añade tus claves de Supabase y GitHub:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-de-supabase
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=tu-client-id-de-github
GITHUB_CLIENT_SECRET=tu-client-secret-de-github
```

5. Inicia el servidor de desarrollo:

```bash
npm run dev

o

pnpm run dev
```

6. Abre http://localhost:3000 en tu navegador para ver la aplicación en acción.

### Versión

Esta es la versión 0.1.0-beta de ChismeApp. Todavía estamos trabajando en mejorar la aplicación y corregir cualquier bug que puedas encontrar. ¡Tu feedback es bienvenido!

### Despliegue

ChismeApp se puede desplegar fácilmente en plataformas como Vercel o Netlify. Sigue las instrucciones de estas plataformas para realizar el despliegue de tu aplicación Next.js.

### Contribución

Si deseas contribuir a ChismeApp, por favor abre un issue o envía un pull request. Toda ayuda es bienvenida.

### Licencia

Este proyecto está licenciado bajo la MIT License.
