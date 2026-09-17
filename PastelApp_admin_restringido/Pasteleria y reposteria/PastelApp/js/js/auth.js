import { auth, db } from "./config.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ==========================================
// INICIAR SESIÓN
// ==========================================

async function iniciarSesion(email, password) {

  try {

    const resultado = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const usuarioFirebase = resultado.user;

    // Buscar los datos del usuario en Firestore
    const usuarioRef = doc(
      db,
      "usuarios",
      usuarioFirebase.uid
    );

    const usuarioSnap = await getDoc(usuarioRef);

    if (!usuarioSnap.exists()) {

      throw new Error(
        "El usuario no tiene un registro en Firestore."
      );

    }

    const datosUsuario = usuarioSnap.data();

    const rol = datosUsuario.rol;


    // ==========================================
    // REDIRECCIÓN SEGÚN EL ROL
    // ==========================================

    if (rol === "administrador") {

      window.location.href = "../admin.html";

    } else if (rol === "cliente") {

      window.location.href = "../usuario.html";

    } else {

      throw new Error(
        "El usuario no tiene un rol válido."
      );

    }

  } catch (error) {

    console.error("Error al iniciar sesión:", error);

    let mensaje = "No se pudo iniciar sesión.";

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {

      mensaje = "Correo o contraseña incorrectos.";

    } else if (
      error.code === "auth/too-many-requests"
    ) {

      mensaje = "Demasiados intentos. Intenta nuevamente más tarde.";

    } else if (
      error.message.includes("Firestore")
    ) {

      mensaje = error.message;

    }

    mostrarErrorLogin(mensaje);

  }

}


// ==========================================
// MOSTRAR ERROR EN EL MODAL
// ==========================================

function mostrarErrorLogin(mensaje) {

  const errorElement = document.getElementById("login-error");

  if (!errorElement) {
    alert(mensaje);
    return;
  }

  errorElement.textContent = mensaje;
  errorElement.classList.remove("hidden");

}


// ==========================================
// FORMULARIO DE LOGIN
// ==========================================

const loginForm = document.getElementById("login-form");

if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document
      .getElementById("login-email")
      .value
      .trim();

    const password = document
      .getElementById("login-pass")
      .value;

    const errorElement = document.getElementById("login-error");

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }

    const boton = loginForm.querySelector(
      'button[type="submit"]'
    );

    if (boton) {
      boton.disabled = true;
      boton.textContent = "Iniciando sesión...";
    }

    await iniciarSesion(email, password);

    if (boton) {
      boton.disabled = false;
      boton.textContent = "Entrar";
    }

  });

}


// ==========================================
// PROTEGER ADMIN
// ==========================================

if (
  window.location.pathname.endsWith("/admin.html") ||
  window.location.pathname.endsWith("admin.html")
) {

  onAuthStateChanged(auth, async (usuario) => {

    if (!usuario) {

      window.location.href = "index.html";
      return;

    }

    try {

      const usuarioRef = doc(
        db,
        "usuarios",
        usuario.uid
      );

      const usuarioSnap = await getDoc(usuarioRef);

      if (
        !usuarioSnap.exists() ||
        usuarioSnap.data().rol !== "administrador"
      ) {

        alert("No tienes permisos de administrador.");

        await signOut(auth);

        window.location.href = "index.html";

      }

    } catch (error) {

      console.error(
        "Error verificando administrador:",
        error
      );

      await signOut(auth);

      window.location.href = "index.html";

    }

  });

}


// ==========================================
// PROTEGER USUARIO / CLIENTE
// ==========================================

if (
  window.location.pathname.endsWith("/usuario.html") ||
  window.location.pathname.endsWith("usuario.html")
) {

  onAuthStateChanged(auth, async (usuario) => {

    if (!usuario) {

      window.location.href = "index.html";
      return;

    }

    try {

      const usuarioRef = doc(
        db,
        "usuarios",
        usuario.uid
      );

      const usuarioSnap = await getDoc(usuarioRef);

      if (
        !usuarioSnap.exists() ||
        usuarioSnap.data().rol !== "cliente"
      ) {

        alert("Esta sección es exclusiva para clientes.");

        await signOut(auth);

        window.location.href = "index.html";

      }

    } catch (error) {

      console.error(
        "Error verificando cliente:",
        error
      );

      await signOut(auth);

      window.location.href = "index.html";

    }

  });

}


console.log("Firebase Authentication conectado correctamente.");
