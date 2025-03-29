const firebaseConfig = {
  apiKey: "AIzaSyDM_jTN5zydnU2z3jmTVULmjnoGB_gT_Uw",
  authDomain: "validacion-formulario-projecto.firebaseapp.com",
  projectId: "validacion-formulario-projecto",
  storageBucket: "validacion-formulario-projecto.firebasestorage.app",
  messagingSenderId: "663375515826",
  appId: "1:663375515826:web:2648beda6877a4149239ab",
  measurementId: "G-XE7DD2FLD2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();

  //   Validar nombre de usuario
  let nombreUsuario = document.getElementById("name");
  let errorUsuario = document.getElementById("nameError");
  if (nombreUsuario.value.trim() === "") {
    errorUsuario.textContent = "Por favor, introduce un nombre de usuario";
    errorUsuario.classList.add("error-message");
  } else {
    errorUsuario.textContent = "";
    errorUsuario.classList.remove("error-message");
  }

  //Validar correo
  let correo = document.getElementById("email");
  let errorCorreo = document.getElementById("emailError");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

  if (!emailPattern.test(correo.value)) {
    errorCorreo.textContent = "Por favor, introduce un mail válido";
    errorCorreo.classList.add("error-message");
  } else {
    errorCorreo.textContent = "";
    errorCorreo.classList.remove("error-message");
  }

  // Validar Contraseña
  let contraseña = document.getElementById("password");
  let errorContraseña = document.getElementById("passwordError");
  let contrasenaPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

  if (!contrasenaPattern.test(contraseña.value)) {
    errorContraseña.textContent =
      "La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales";
    errorContraseña.classList.add("error-message");
  } else {
    errorContraseña.textContent = "";
    errorContraseña.classList.remove("error-message");
  }

  // Enviar formulario
  if (
    !errorUsuario.textContent &&
    !errorCorreo.textContent &&
    !errorContraseña.textContent
  ) {
    db.collection("users")
      .add({
        nombre: nombreUsuario.value,
        correo: correo.value,
        contraseña: contraseña.value,
      })
      .then((docRef) => {
        alert("Tus datos se han enviado correctamente", docRef.id);
        document.getElementById("formulario").reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
});
