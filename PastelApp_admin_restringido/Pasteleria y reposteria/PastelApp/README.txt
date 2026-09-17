PASTELAPP — README
==================
Proyecto académico · Sesión 2
"Diseño UI/UX y maquetación de interfaces responsivas:
Vista de Tienda Pública y Dashboard de Administración"

--------------------------------------------------
1. ¿QUÉ ES ESTE PROYECTO?
--------------------------------------------------
PastelApp es una MAQUETACIÓN FRONTEND (HTML5 + CSS3 + Tailwind CSS + JavaScript)
para un negocio de pastelería / repostería.

NO incluye:
- Backend
- Base de datos
- Pagos reales
- Firebase
- Autenticación real

Los datos (precios, pedidos, clientes, reseñas, estadísticas) son DEMOSTRATIVOS.

--------------------------------------------------
2. ESTRUCTURA DE ARCHIVOS
--------------------------------------------------
PastelApp/
├── index.html          → Página de presentación
├── cliente.html        → Tienda pública (catálogo, carrito, reseñas)
├── admin.html          → Dashboard de administración
├── css/
│   └── styles.css      → CSS3 personalizado (complementa Tailwind)
├── js/
│   └── scripts.js      → Interactividad simulada
├── assets/             → Recursos estáticos (reservado)
└── README.txt          → Este archivo

--------------------------------------------------
3. TECNOLOGÍAS
--------------------------------------------------
- HTML5 (etiquetas semánticas)
- CSS3 (variables, animaciones, layout)
- Tailwind CSS (vía CDN: https://cdn.tailwindcss.com)
- JavaScript vanilla
- Google Fonts (Poppins)

--------------------------------------------------
4. CÓMO EJECUTAR
--------------------------------------------------
Opción A — Abrir directamente:
1. Abre la carpeta PastelApp
2. Haz doble clic en index.html
3. Navega con el navegador (Chrome, Edge, Firefox…)

Opción B — Servidor local (recomendado):
1. Abre una terminal en la carpeta PastelApp
2. Ejecuta, por ejemplo:
   - Python:  python -m http.server 5500
   - VS Code / Cursor: extensión Live Server
3. Visita http://localhost:5500

Necesitas conexión a internet la primera vez para cargar
Tailwind CDN y Google Fonts.

--------------------------------------------------
5. PÁGINAS Y NAVEGACIÓN
--------------------------------------------------
- index.html   → Inicio / Hero / Categorías / Destacados
- cliente.html → Tienda (se abre al iniciar sesión como cliente)
- admin.html   → Panel (se abre al iniciar sesión como admin)

NO hay pestaña pública "Admin". El panel solo aparece
después de iniciar sesión con la cuenta de administrador.

Cuenta de administrador configurada:
  Correo: dennys.cruzsanchez@gmail.com
  Rol: admin

Si alguien abre admin.html sin una sesión de administrador válida,
se redirige a inicio.

IMPORTANTE:
Esta versión usa autenticación simulada en JavaScript (frontend), por lo
que no debe considerarse una protección de seguridad para producción.
Para proteger realmente el panel, se recomienda usar Firebase Authentication
u otro backend con control de acceso.

--------------------------------------------------
6. FUNCIONALIDADES DEMOSTRADAS
--------------------------------------------------
Tienda (cliente):
[x] Navbar responsive (menú hamburguesa)
[x] Catálogo de productos (8+)
[x] Filtros por categoría
[x] Búsqueda de productos
[x] Carrito lateral (agregar, +/- cantidad, eliminar, total demo)
[x] Formulario / modal de pedido (simulación)
[x] Confirmación visual de pedido
[x] Muro de reseñas + formulario “Dejar reseña”
[x] Toasts de feedback

Admin:
[x] Layout sidebar + contenido
[x] Sidebar colapsable en móvil
[x] Tarjetas estadísticas (datos demo)
[x] Control de pedidos (tabla + badges de estado)
[x] Modal detalle de pedido + actualizar estado
[x] Gestión visual de productos
[x] Tabla de clientes
[x] Gestión de reseñas (aprobar / ocultar)

--------------------------------------------------
7. CÓMO DEMOSTRAR AL PROFESOR (SESIÓN 2)
--------------------------------------------------
1. Abrir index.html y explicar la identidad visual (PastelApp).
2. Mostrar el Hero, categorías y productos destacados.
3. Ir a cliente.html → filtrar, buscar y agregar al carrito.
4. Abrir el carrito, cambiar cantidades y “Realizar pedido”.
5. Completar el formulario y mostrar el mensaje de éxito
   (aclarar que es simulación frontend).
6. Mostrar el muro de reseñas y el formulario de reseña.
7. Abrir admin.html → dashboard con estadísticas demo.
8. Ir a “Pedidos” → Ver detalle → cambiar estado (badge).
9. Mostrar Productos, Clientes y Reseñas del admin.
10. Reducir el navegador a ~375px y mostrar menú hamburguesa,
    columnas a 1, sidebar del admin y tablas con scroll.

Criterio de evaluación cubierto:
- Maquetar con HTML5/CSS3/Tailwind la interfaz del cliente
  (catálogo, carrito, muro de reseñas) y la vista privada
  del administrador (panel de control de pedidos).

--------------------------------------------------
8. NOTA IMPORTANTE
--------------------------------------------------
Este es un proyecto académico de maquetación UI/UX.
No representa un sistema de pedidos en producción.
