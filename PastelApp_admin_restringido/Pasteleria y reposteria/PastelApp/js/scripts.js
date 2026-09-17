/**
 * PastelApp — JavaScript de demostración (frontend)
 * Proyecto académico — Sesión 2
 * Sin backend, API ni base de datos.
 */

/* ---------- Datos demostrativos ---------- */
const PRODUCTS = [
  {
    id: "p1",
    name: "Pastel de chocolate",
    description: "Bizcocho suave de cacao. Producto de demostración.",
    category: "pasteles",
    priceLabel: "S/ --",
    emoji: "🍫",
  },
  {
    id: "p2",
    name: "Pastel de vainilla",
    description: "Clásico de vainilla con crema. Dato de ejemplo.",
    category: "pasteles",
    priceLabel: "S/ --",
    emoji: "🎂",
  },
  {
    id: "p3",
    name: "Cupcakes surtidos",
    description: "Pack demostrativo de cupcakes decorados.",
    category: "cupcakes",
    priceLabel: "S/ --",
    emoji: "🧁",
  },
  {
    id: "p4",
    name: "Bocaditos dulces",
    description: "Selección de bocaditos para compartir (demo).",
    category: "bocaditos",
    priceLabel: "S/ --",
    emoji: "🍪",
  },
  {
    id: "p5",
    name: "Torta de cumpleaños",
    description: "Diseño especial para celebraciones. Solo maqueta.",
    category: "especiales",
    priceLabel: "S/ --",
    emoji: "🎉",
  },
  {
    id: "p6",
    name: "Mini postres",
    description: "Variedad de mini postres. Datos ficticios.",
    category: "bocaditos",
    priceLabel: "S/ --",
    emoji: "🍮",
  },
  {
    id: "p7",
    name: "Cupcakes de red velvet",
    description: "Cupcakes demo con frosting suave.",
    category: "cupcakes",
    priceLabel: "S/ --",
    emoji: "❤️",
  },
  {
    id: "p8",
    name: "Pastel tres leches",
    description: "Clásico húmedo. Precio solo ilustrativo.",
    category: "pasteles",
    priceLabel: "S/ --",
    emoji: "🥛",
  },
  {
    id: "p9",
    name: "Caja gourmet especial",
    description: "Pack para ocasiones especiales (demo).",
    category: "especiales",
    priceLabel: "S/ --",
    emoji: "🎁",
  },
];

const DEMO_PRICE = 0; // Precios no reales; total siempre demostrativo

const ORDERS = [
  {
    id: "#001",
    client: "Cliente Demo",
    product: "Pastel de chocolate",
    products: [{ name: "Pastel de chocolate", qty: 1 }],
    date: "--/--/----",
    total: "S/ --",
    status: "Pendiente",
    address: "Dirección de demostración",
    delivery: "Delivery",
    notes: "Sin observaciones reales — dato demo.",
  },
  {
    id: "#002",
    client: "Cliente Demo",
    product: "Cupcakes",
    products: [{ name: "Cupcakes surtidos", qty: 12 }],
    date: "--/--/----",
    total: "S/ --",
    status: "Confirmado",
    address: "Dirección de demostración",
    delivery: "Recojo en tienda",
    notes: "Pedido de ejemplo.",
  },
  {
    id: "#003",
    client: "Cliente Demo",
    product: "Bocaditos",
    products: [{ name: "Bocaditos dulces", qty: 2 }],
    date: "--/--/----",
    total: "S/ --",
    status: "En preparación",
    address: "Dirección de demostración",
    delivery: "Delivery",
    notes: "Simulación frontend.",
  },
  {
    id: "#004",
    client: "Cliente Demo",
    product: "Pastel de vainilla",
    products: [{ name: "Pastel de vainilla", qty: 1 }],
    date: "--/--/----",
    total: "S/ --",
    status: "Listo",
    address: "Dirección de demostración",
    delivery: "Delivery",
    notes: "—",
  },
  {
    id: "#005",
    client: "Cliente Demo",
    product: "Mini postres",
    products: [{ name: "Mini postres", qty: 1 }],
    date: "--/--/----",
    total: "S/ --",
    status: "Entregado",
    address: "Dirección de demostración",
    delivery: "Recojo en tienda",
    notes: "Pedido cerrado (demo).",
  },
];

const STATUS_CLASS = {
  Pendiente: "badge--pendiente",
  Confirmado: "badge--confirmado",
  "En preparación": "badge--preparacion",
  Listo: "badge--listo",
  Entregado: "badge--entregado",
};

const STATUS_ICON = {
  Pendiente: "🟡",
  Confirmado: "🔵",
  "En preparación": "🟠",
  Listo: "🟢",
  Entregado: "⚫",
};

/* ---------- Estado del carrito (sessionStorage) ---------- */
function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem("pastelapp_cart") || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem("pastelapp_cart", JSON.stringify(cart));
  updateCartBadges();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });
}

/* ---------- Toast ---------- */
function showToast(message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Disponible para botones con onclick en la maqueta
window.showToast = showToast;

/* ---------- Menú móvil ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  menu.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Carrito ---------- */
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((i) => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      emoji: product.emoji,
      priceLabel: product.priceLabel,
      qty: 1,
    });
  }
  saveCart(cart);
  showToast(`"${product.name}" agregado al carrito (demo)`, "success");
  renderCart();
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    const next = cart.filter((i) => i.id !== productId);
    saveCart(next);
  } else {
    saveCart(cart);
  }
  renderCart();
}

function removeFromCart(productId) {
  saveCart(getCart().filter((i) => i.id !== productId));
  showToast("Producto eliminado del carrito", "info");
  renderCart();
}

function openCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer || !overlay) return;
  renderCart();
  drawer.classList.add("open");
  overlay.classList.add("active");
  document.body.classList.add("drawer-open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer || !overlay) return;
  drawer.classList.remove("open");
  overlay.classList.remove("active");
  document.body.classList.remove("drawer-open");
  drawer.setAttribute("aria-hidden", "true");
}

function renderCart() {
  const list = document.getElementById("cart-items");
  const empty = document.getElementById("cart-empty");
  const footer = document.getElementById("cart-footer");
  const totalEl = document.getElementById("cart-total");
  if (!list) return;

  const cart = getCart();
  list.innerHTML = "";

  if (cart.length === 0) {
    if (empty) {
      empty.hidden = false;
      const onStore = Boolean(document.getElementById("catalog-grid"));
      empty.innerHTML = onStore
        ? 'Tu carrito está vacío.<br /><span class="text-xs">Agrega productos del catálogo.</span>'
        : 'Tu carrito está vacío.<br /><a href="cliente.html#catalogo" class="text-[var(--color-rose-dark)] font-semibold text-sm underline">Ir al catálogo</a>';
    }
    if (footer) footer.hidden = true;
    return;
  }

  if (empty) empty.hidden = true;
  if (footer) footer.hidden = false;

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item__thumb" aria-hidden="true">${item.emoji}</div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-sm text-[var(--color-chocolate)] truncate">${escapeHtml(item.name)}</p>
        <p class="text-xs text-[var(--color-muted)]">Precio demo: ${escapeHtml(item.priceLabel)}</p>
        <div class="flex items-center gap-2 mt-2">
          <button type="button" class="qty-btn" data-qty-minus="${item.id}" aria-label="Disminuir cantidad">−</button>
          <span class="text-sm font-semibold w-6 text-center" aria-label="Cantidad">${item.qty}</span>
          <button type="button" class="qty-btn" data-qty-plus="${item.id}" aria-label="Aumentar cantidad">+</button>
          <button type="button" class="btn-danger btn-sm ml-auto" data-remove="${item.id}">Eliminar</button>
        </div>
        <p class="text-xs mt-1 text-[var(--color-muted)]">Subtotal demo: S/ --</p>
      </div>
    `;
    list.appendChild(row);
  });

  if (totalEl) {
    totalEl.textContent = "S/ --";
  }

  list.querySelectorAll("[data-qty-minus]").forEach((btn) => {
    btn.addEventListener("click", () => changeQty(btn.getAttribute("data-qty-minus"), -1));
  });
  list.querySelectorAll("[data-qty-plus]").forEach((btn) => {
    btn.addEventListener("click", () => changeQty(btn.getAttribute("data-qty-plus"), 1));
  });
  list.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.getAttribute("data-remove")));
  });
}

function initCartUI() {
  document.querySelectorAll("[data-open-cart]").forEach((btn) => {
    btn.addEventListener("click", openCart);
  });
  document.querySelectorAll("[data-close-cart]").forEach((btn) => {
    btn.addEventListener("click", closeCart);
  });

  const overlay = document.getElementById("cart-overlay");
  if (overlay) overlay.addEventListener("click", closeCart);

  document.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.getAttribute("data-add-cart")));
  });

  const continueBtn = document.getElementById("btn-continue-shopping");
  if (continueBtn) continueBtn.addEventListener("click", closeCart);

  const checkoutBtn = document.getElementById("btn-checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (getCart().length === 0) {
        showToast("El carrito está vacío. Agrega productos del catálogo.", "info");
        return;
      }
      closeCart();
      openModal("order-modal");
    });
  }
}

/* ---------- Modales genéricos ---------- */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("active");
  document.body.classList.add("modal-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
  modal.setAttribute("aria-hidden", "true");
}

function initModals() {
  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-close-modal");
      closeModal(id);
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal.id);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach((m) => closeModal(m.id));
      closeCart();
    }
  });
}

/* ---------- Pedido (simulación) ---------- */
function initOrderForm() {
  const form = document.getElementById("order-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal("order-modal");
    openModal("order-success-modal");
    saveCart([]);
    renderCart();
    updateCartBadges();
    form.reset();
    showToast("Pedido registrado correctamente (simulación)", "success");
  });
}

/* ---------- Catálogo: filtros y búsqueda ---------- */
function categoryLabel(cat) {
  const map = {
    pasteles: "Pasteles",
    cupcakes: "Cupcakes",
    bocaditos: "Bocaditos",
    especiales: "Especiales",
  };
  return map[cat] || cat;
}

function createProductCard(product) {
  return `
    <article class="card-product" data-category="${product.category}" data-name="${escapeHtml(product.name.toLowerCase())}">
      <div class="card-product__media" aria-hidden="true">${product.emoji}</div>
      <div class="p-4 flex flex-col flex-1">
        <div class="flex items-start justify-between gap-2 mb-1">
          <h3 class="font-semibold text-[var(--color-chocolate)] leading-snug">${escapeHtml(product.name)}</h3>
          <span class="demo-badge shrink-0">Demo</span>
        </div>
        <p class="text-xs text-[var(--color-rose-dark)] font-medium mb-1">${categoryLabel(product.category)}</p>
        <p class="text-sm text-[var(--color-muted)] mb-3 flex-1">${escapeHtml(product.description)}</p>
        <div class="flex items-center justify-between gap-2 mt-auto">
          <span class="price-demo">${escapeHtml(product.priceLabel)}</span>
          <button type="button" class="btn-primary btn-sm" data-add-cart="${product.id}">Agregar al carrito</button>
        </div>
      </div>
    </article>
  `;
}

function renderCatalog(containerId, products = PRODUCTS) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map(createProductCard).join("");
  container.querySelectorAll("[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.getAttribute("data-add-cart")));
  });
}

function initCatalogFilters() {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  let activeCategory = "todos";
  let searchTerm = "";

  function applyFilters() {
    const cards = grid.querySelectorAll(".card-product");
    let visible = 0;
    cards.forEach((card) => {
      const cat = card.getAttribute("data-category");
      const name = card.getAttribute("data-name") || "";
      const matchCat = activeCategory === "todos" || cat === activeCategory;
      const matchSearch = !searchTerm || name.includes(searchTerm);
      const show = matchCat && matchSearch;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });

    const empty = document.getElementById("catalog-empty");
    if (empty) empty.hidden = visible > 0;
  }

  document.querySelectorAll("[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeCategory = chip.getAttribute("data-filter");
      applyFilters();
    });
  });

  const search = document.getElementById("product-search");
  if (search) {
    search.addEventListener("input", () => {
      searchTerm = search.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* ---------- Reseñas ---------- */
function initReviewForm() {
  const openBtn = document.getElementById("btn-leave-review");
  if (openBtn) {
    openBtn.addEventListener("click", () => openModal("review-modal"));
  }

  const form = document.getElementById("review-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal("review-modal");
    form.reset();
    showToast("Reseña enviada (simulación visual — no se guarda)", "success");
  });
}

/* ---------- Sesión simulada (sin backend) ---------- */
const SESSION_KEY = "pastelapp_session";

const DEMO_USERS = [
  {
    email: "dennys.cruzsanchez@gmail.com",
    password: "yahir12345678",
    role: "admin",
    name: "Dennys Cruz Sánchez",
    redirect: "admin.html",
  },
];

function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

function saveSession(user) {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: user.email, role: user.role, name: user.name })
  );
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function isAdminPage() {
  return Boolean(document.getElementById("admin-sidebar"));
}

function logout() {
  clearSession();
  showToast("Sesión cerrada", "info");
  window.location.href = "index.html";
}

function bindAuthButtons() {
  document.querySelectorAll("[data-open-login]").forEach((btn) => {
    btn.addEventListener("click", () => openModal("login-modal"));
  });
  document.querySelectorAll("[data-logout]").forEach((btn) => {
    btn.addEventListener("click", logout);
  });
}

function renderAuthNav() {
  const session = getSession();
  const desktop = document.getElementById("auth-nav-desktop");
  const mobile = document.getElementById("auth-nav-mobile");
  if (!desktop && !mobile) return;

  let html;
  if (!session) {
    html = {
      desktop: `<button type="button" class="nav-link" data-open-login>Iniciar sesión</button>`,
      mobile: `<button type="button" class="px-2 py-2.5 rounded-lg text-left text-[var(--color-muted)] hover:bg-cream-dark w-full" data-open-login>Iniciar sesión</button>`,
    };
  } else if (session.role === "admin") {
    html = {
      desktop: `
        <span class="text-sm font-medium text-chocolate truncate max-w-[140px]" title="${escapeHtml(session.name)}">${escapeHtml(session.name)}</span>
        <a href="admin.html" class="nav-link">Panel</a>
        <button type="button" class="nav-link" data-logout>Cerrar sesión</button>
      `,
      mobile: `
        <p class="px-2 py-1 text-xs text-[var(--color-muted)]">${escapeHtml(session.name)} · Admin</p>
        <a href="admin.html" class="px-2 py-2.5 rounded-lg text-[var(--color-muted)] hover:bg-cream-dark block">Panel de control</a>
        <button type="button" class="px-2 py-2.5 rounded-lg text-left text-[var(--color-muted)] hover:bg-cream-dark w-full" data-logout>Cerrar sesión</button>
      `,
    };
  } else {
    html = {
      desktop: `
        <span class="text-sm font-medium text-chocolate truncate max-w-[140px]" title="${escapeHtml(session.name)}">${escapeHtml(session.name)}</span>
        <button type="button" class="nav-link" data-logout>Cerrar sesión</button>
      `,
      mobile: `
        <p class="px-2 py-1 text-xs text-[var(--color-muted)]">${escapeHtml(session.name)} · Cliente</p>
        <button type="button" class="px-2 py-2.5 rounded-lg text-left text-[var(--color-muted)] hover:bg-cream-dark w-full" data-logout>Cerrar sesión</button>
      `,
    };
  }

  if (desktop) desktop.innerHTML = html.desktop;
  if (mobile) mobile.innerHTML = html.mobile;
}

function protectAdminPage() {
  if (!isAdminPage()) return;
  const session = getSession();
  if (!session || session.role !== "admin") {
    window.location.replace("index.html");
    return;
  }

  const label = document.getElementById("admin-user-label");
  if (label) label.textContent = session.name;
}

function greetClientPage() {
  const welcome = document.getElementById("cliente-welcome");
  const session = getSession();
  if (!welcome || !session || session.role !== "cliente") return;
  welcome.textContent = `Hola, ${session.name}`;
}

function initLoginForm() {
  protectAdminPage();
  renderAuthNav();
  bindAuthButtons();
  greetClientPage();

  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = (document.getElementById("login-email")?.value || "").trim().toLowerCase();
    const password = document.getElementById("login-pass")?.value || "";
    const errorEl = document.getElementById("login-error");

    const user = DEMO_USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
      if (errorEl) {
        errorEl.textContent = "Correo o contraseña incorrectos. Usa una cuenta de demostración.";
        errorEl.classList.remove("hidden");
      }
      showToast("Datos incorrectos. Revisa las cuentas de demostración.", "info");
      return;
    }

    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }

    saveSession(user);
    closeModal("login-modal");
    form.reset();
    showToast(`Bienvenido, ${user.name}`, "success");
    window.location.href = user.redirect;
  });
}

/* ---------- Admin: navegación de secciones ---------- */
function switchAdminSection(target) {
  document.querySelectorAll(".admin-sidebar__link[data-admin-section]").forEach((l) => {
    l.classList.toggle("active", l.getAttribute("data-admin-section") === target);
  });

  document.querySelectorAll(".admin-section").forEach((sec) => {
    sec.classList.toggle("active", sec.id === `section-${target}`);
  });

  const title = document.getElementById("admin-page-title");
  if (title) {
    const labels = {
      dashboard: "Dashboard",
      pedidos: "Control de pedidos",
      productos: "Productos",
      clientes: "Clientes",
      reseñas: "Gestión de reseñas",
      configuracion: "Configuración",
    };
    title.textContent = labels[target] || "Dashboard";
  }

  closeAdminSidebar();
}

function initAdminNav() {
  const links = document.querySelectorAll("[data-admin-section]");
  if (!links.length) return;

  links.forEach((link) => {
    link.addEventListener("click", () => {
      switchAdminSection(link.getAttribute("data-admin-section"));
    });
  });
}

function openAdminSidebar() {
  document.getElementById("admin-sidebar")?.classList.add("open");
  document.getElementById("admin-overlay")?.classList.add("active");
}

function closeAdminSidebar() {
  document.getElementById("admin-sidebar")?.classList.remove("open");
  document.getElementById("admin-overlay")?.classList.remove("active");
}

function initAdminSidebarToggle() {
  document.getElementById("admin-menu-toggle")?.addEventListener("click", openAdminSidebar);
  document.getElementById("admin-overlay")?.addEventListener("click", closeAdminSidebar);
  document.querySelectorAll("[data-close-admin-sidebar]").forEach((btn) => {
    btn.addEventListener("click", closeAdminSidebar);
  });
}

/* ---------- Admin: pedidos ---------- */
function statusBadgeHTML(status) {
  const cls = STATUS_CLASS[status] || "badge--pendiente";
  const icon = STATUS_ICON[status] || "🟡";
  return `<span class="badge ${cls}">${icon} ${escapeHtml(status)}</span>`;
}

function renderOrdersTable() {
  const tbody = document.getElementById("orders-tbody");
  if (!tbody) return;

  tbody.innerHTML = ORDERS.map(
    (o) => `
    <tr data-order-id="${escapeHtml(o.id)}">
      <td class="font-semibold" data-label="ID">${escapeHtml(o.id)}</td>
      <td data-label="Cliente">${escapeHtml(o.client)}</td>
      <td data-label="Producto">${escapeHtml(o.product)}</td>
      <td data-label="Fecha">${escapeHtml(o.date)}</td>
      <td data-label="Total">${escapeHtml(o.total)}</td>
      <td data-label="Estado" data-status-cell>${statusBadgeHTML(o.status)}</td>
      <td data-label="Acción">
        <button type="button" class="btn-ghost btn-sm" data-view-order="${escapeHtml(o.id)}">Ver</button>
      </td>
    </tr>
  `
  ).join("");

  tbody.querySelectorAll("[data-view-order]").forEach((btn) => {
    btn.addEventListener("click", () => openOrderDetail(btn.getAttribute("data-view-order")));
  });
}

function openOrderDetail(orderId) {
  const order = ORDERS.find((o) => o.id === orderId);
  if (!order) return;

  const body = document.getElementById("order-detail-body");
  const select = document.getElementById("order-status-select");
  if (!body || !select) return;

  body.innerHTML = `
    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      <div><dt class="text-[var(--color-muted)]">ID</dt><dd class="font-semibold">${escapeHtml(order.id)}</dd></div>
      <div><dt class="text-[var(--color-muted)]">Cliente</dt><dd class="font-semibold">${escapeHtml(order.client)}</dd></div>
      <div class="sm:col-span-2">
        <dt class="text-[var(--color-muted)]">Productos</dt>
        <dd class="font-semibold">${order.products.map((p) => `${escapeHtml(p.name)} × ${p.qty}`).join(", ")}</dd>
      </div>
      <div><dt class="text-[var(--color-muted)]">Total</dt><dd class="font-semibold">${escapeHtml(order.total)}</dd></div>
      <div><dt class="text-[var(--color-muted)]">Estado actual</dt><dd>${statusBadgeHTML(order.status)}</dd></div>
      <div class="sm:col-span-2"><dt class="text-[var(--color-muted)]">Dirección</dt><dd>${escapeHtml(order.address)}</dd></div>
      <div><dt class="text-[var(--color-muted)]">Método de entrega</dt><dd>${escapeHtml(order.delivery)}</dd></div>
      <div><dt class="text-[var(--color-muted)]">Observaciones</dt><dd>${escapeHtml(order.notes)}</dd></div>
    </dl>
    <p class="text-xs text-[var(--color-muted)] mt-3">Datos de demostración — sin conexión a base de datos.</p>
  `;

  select.value = order.status;
  select.setAttribute("data-current-order", order.id);
  openModal("order-detail-modal");
}

function initOrderDetail() {
  const btn = document.getElementById("btn-update-status");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const select = document.getElementById("order-status-select");
    const orderId = select?.getAttribute("data-current-order");
    const newStatus = select?.value;
    if (!orderId || !newStatus) return;

    const order = ORDERS.find((o) => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    renderOrdersTable();
    openOrderDetail(orderId);
    showToast(`Estado actualizado a "${newStatus}" (solo visual)`, "success");
  });
}

/* ---------- Admin: productos ---------- */
function initAdminProducts() {
  document.getElementById("btn-new-product")?.addEventListener("click", () => {
    openModal("product-modal");
  });

  const form = document.getElementById("product-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      closeModal("product-modal");
      form.reset();
      showToast("Producto guardado (simulación visual)", "success");
    });
  }

  document.querySelectorAll("[data-edit-product]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal("product-modal");
      showToast("Edición simulada — formulario de demostración", "info");
    });
  });

  document.querySelectorAll("[data-delete-product]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      if (row) {
        row.style.opacity = "0.4";
        showToast("Producto ocultado visualmente (demo)", "info");
      }
    });
  });
}

/* ---------- Admin: reseñas ---------- */
function initAdminReviews() {
  document.querySelectorAll("[data-approve-review]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      const cell = row?.querySelector("[data-review-status]");
      if (cell) {
        cell.innerHTML = '<span class="badge badge--aprobada">Aprobada</span>';
      }
      showToast("Reseña aprobada (simulación)", "success");
    });
  });

  document.querySelectorAll("[data-hide-review]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      const cell = row?.querySelector("[data-review-status]");
      if (cell) {
        cell.innerHTML = '<span class="badge badge--oculta">Oculta</span>';
      }
      showToast("Reseña ocultada (simulación)", "info");
    });
  });
}

/* ---------- Utilidad ---------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCartUI();
  initModals();
  initOrderForm();
  initReviewForm();
  initLoginForm();
  updateCartBadges();

  // Catálogo completo (cliente)
  if (document.getElementById("catalog-grid")) {
    renderCatalog("catalog-grid");
    initCatalogFilters();
  }

  // Destacados (index)
  if (document.getElementById("featured-grid")) {
    renderCatalog("featured-grid", PRODUCTS.slice(0, 6));
  }

  // Admin
  initAdminNav();
  initAdminSidebarToggle();
  renderOrdersTable();
  initOrderDetail();
  initAdminProducts();
  initAdminReviews();

  // Enlace de categorías en index → cliente con hash
  document.querySelectorAll("[data-goto-category]").forEach((el) => {
    el.addEventListener("click", () => {
      const cat = el.getAttribute("data-goto-category");
      window.location.href = `cliente.html?categoria=${encodeURIComponent(cat)}#catalogo`;
    });
  });

  // Aplicar categoría desde query string
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("categoria");
  if (catParam && document.getElementById("catalog-grid")) {
    const chip = document.querySelector(`[data-filter="${catParam}"]`);
    if (chip) chip.click();
  }
});
